import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Badge } from "@/shared/components/ui/badge";
import { Switch } from "@/shared/components/ui/switch";
import { Label } from "@/shared/components/ui/label";
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  Play,
  Pause,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

export default function FollowUpAutomation({ submission }) {
  const [sequences, setSequences] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    if (submission?.follow_up_sequence) {
      setSequences(submission.follow_up_sequence);
      setIsActive(submission.follow_up_active || false);
    } else {
      generateSequence();
    }
  }, [submission]);

  const generateSequence = async () => {
    const leadTemp = submission?.lead_temperature || "WARM";
    const prompt = `Create a personalized follow-up sequence for this pool project lead.

LEAD INFO:
- Name: ${submission?.contact_name}
- Temperature: ${leadTemp}
- Budget: ${submission?.budget_range}
- Timeline: ${submission?.timeline}
- Vision: ${submission?.pool_vision}

Create a 7-touchpoint sequence with:
- Mix of emails and texts
- Appropriate timing based on lead temperature
- Personalized content
- Value-driven messaging (not pushy)

For each touchpoint:
- Day number (when to send)
- Channel (email or sms)
- Subject/Preview
- Message body (personalized, conversational)
- Goal of the message

Use customer's actual information to personalize.`;

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            sequence: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "number" },
                  channel: { type: "string", enum: ["email", "sms"] },
                  subject: { type: "string" },
                  message: { type: "string" },
                  goal: { type: "string" },
                  status: { type: "string", enum: ["pending", "sent", "failed"] }
                }
              }
            }
          }
        }
      });

      const sequenceWithStatus = result.sequence.map(item => ({
        ...item,
        status: "pending",
        scheduled_date: new Date(Date.now() + item.day * 24 * 60 * 60 * 1000).toISOString()
      }));

      setSequences(sequenceWithStatus);
      
      await base44.entities.OnboardingSubmission.update(submission.id, {
        follow_up_sequence: sequenceWithStatus,
        follow_up_active: false
      });
    } catch (error) {
      console.error("Error generating sequence:", error);
    }
  };

  const activateSequence = async () => {
    setIsActive(true);
    await base44.entities.OnboardingSubmission.update(submission.id, {
      follow_up_active: true,
      follow_up_started_date: new Date().toISOString()
    });
    toast.success("Follow-up sequence activated!");
  };

  const pauseSequence = async () => {
    setIsActive(false);
    await base44.entities.OnboardingSubmission.update(submission.id, {
      follow_up_active: false
    });
    toast.info("Follow-up sequence paused");
  };

  const sendNow = async (touchpoint) => {
    const channel = touchpoint.channel === "email" ? "email" : "SMS";
    
    try {
      if (touchpoint.channel === "email") {
        await base44.integrations.Core.SendEmail({
          from_name: "Timeless Pools",
          to: submission.contact_email,
          subject: touchpoint.subject,
          body: touchpoint.message
        });
      } else {
        // SMS would require Twilio integration
        toast.info("SMS sending requires Twilio integration");
      }

      // Update status
      const updatedSequence = sequences.map(s => 
        s.day === touchpoint.day ? { ...s, status: "sent" } : s
      );
      setSequences(updatedSequence);

      await base44.entities.OnboardingSubmission.update(submission.id, {
        follow_up_sequence: updatedSequence
      });

      toast.success(`${channel} sent successfully!`);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(`Failed to send ${channel}`);
    }
  };

  const channelConfig = {
    email: {
      icon: <Mail className="w-5 h-5" />,
      color: "blue",
      label: "Email"
    },
    sms: {
      icon: <MessageSquare className="w-5 h-5" />,
      color: "green",
      label: "Text"
    }
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-600" />
              Automated Follow-Up Sequence
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              AI-generated personalized outreach cadence
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="sequence-active" className="text-sm font-medium">
              {isActive ? "Active" : "Paused"}
            </Label>
            <Switch
              id="sequence-active"
              checked={isActive}
              onCheckedChange={(checked) => checked ? activateSequence() : pauseSequence()}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sequences.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No follow-up sequence generated yet</p>
            <Button onClick={generateSequence}>
              Generate AI Sequence
            </Button>
          </div>
        ) : (
          <>
            {/* Sequence Status */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sequence Status</p>
                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <>
                        <Play className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800">Active & Running</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-800">Paused</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Progress</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {sequences.filter(s => s.status === "sent").length}/{sequences.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {sequences.map((touchpoint, idx) => {
                const config = channelConfig[touchpoint.channel];
                const isPast = new Date(touchpoint.scheduled_date) < new Date();
                const isSent = touchpoint.status === "sent";

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSent
                        ? "bg-green-50 border-green-300"
                        : isPast && isActive
                        ? "bg-amber-50 border-amber-300"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-${config.color}-100 text-${config.color}-600`}>
                          {config.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              Day {touchpoint.day} - {config.label}
                            </span>
                            {isSent && (
                              <Badge className="bg-green-600">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Sent
                              </Badge>
                            )}
                            {isPast && !isSent && isActive && (
                              <Badge className="bg-amber-600">Overdue</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(touchpoint.scheduled_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {!isSent && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendNow(touchpoint)}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Now
                        </Button>
                      )}
                    </div>

                    {touchpoint.channel === "email" && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 mb-1">Subject:</p>
                        <p className="font-medium text-gray-900">{touchpoint.subject}</p>
                      </div>
                    )}

                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">Message:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap bg-white p-3 rounded border">
                        {touchpoint.message}
                      </p>
                    </div>

                    <div className="text-xs text-gray-500 italic">
                      Goal: {touchpoint.goal}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Send Custom Message */}
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Send Custom Message</h4>
              <Textarea
                placeholder="Write a custom follow-up message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="mb-3"
              />
              <div className="flex gap-2">
                <Button
                  onClick={async () => {
                    await base44.integrations.Core.SendEmail({
                      from_name: "Timeless Pools",
                      to: submission.contact_email,
                      subject: "Following up on your pool project",
                      body: customMessage
                    });
                    toast.success("Custom email sent!");
                    setCustomMessage("");
                  }}
                  disabled={!customMessage}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" disabled>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send SMS (Requires Twilio)
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}