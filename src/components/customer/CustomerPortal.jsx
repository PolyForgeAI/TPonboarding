import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { 
  Home, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function CustomerPortal({ submission }) {
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (submission) {
      setProgressPhotos(submission.progress_photos || []);
      setMessages(submission.customer_messages || []);
      setMilestones(submission.project_milestones || generateDefaultMilestones());
    }
  }, [submission]);

  const generateDefaultMilestones = () => [
    { name: "Contract Signed", status: "completed", date: "2025-01-15" },
    { name: "Permits Obtained", status: "completed", date: "2025-02-01" },
    { name: "Excavation Complete", status: "in_progress", date: null },
    { name: "Steel & Plumbing", status: "pending", date: null },
    { name: "Gunite Shell", status: "pending", date: null },
    { name: "Tile & Coping", status: "pending", date: null },
    { name: "Equipment Installation", status: "pending", date: null },
    { name: "Pebble Tec Finish", status: "pending", date: null },
    { name: "Final Inspection", status: "pending", date: null },
    { name: "Project Complete", status: "pending", date: null }
  ];

  const uploadProgressPhoto = async (file) => {
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      const newPhoto = {
        url: file_url,
        uploaded_date: new Date().toISOString(),
        uploaded_by: "Timeless Pools Team",
        milestone: milestones.find(m => m.status === "in_progress")?.name || "Progress Update"
      };

      const updated = [...progressPhotos, newPhoto];
      setProgressPhotos(updated);
      
      await base44.entities.OnboardingSubmission.update(submission.id, {
        progress_photos: updated
      });

      toast.success("Progress photo uploaded!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo");
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      sender: "Customer",
      timestamp: new Date().toISOString(),
      read: false
    };

    const updated = [...messages, message];
    setMessages(updated);
    setNewMessage("");

    await base44.entities.OnboardingSubmission.update(submission.id, {
      customer_messages: updated
    });

    // Send email notification to Timeless Pools
    await base44.integrations.Core.SendEmail({
      from_name: "Customer Portal",
      to: "info@timelesspools.us",
      subject: `New message from ${submission.contact_name}`,
      body: `Customer ${submission.contact_name} sent a message:\n\n${newMessage}\n\nProject: ${submission.id}`
    });

    toast.success("Message sent!");
  };

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (status === "in_progress") return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
    return <AlertCircle className="w-5 h-5 text-slate-400" />;
  };

  const getStatusColor = (status) => {
    if (status === "completed") return "from-green-50 to-emerald-50 border-green-300";
    if (status === "in_progress") return "from-blue-50 to-cyan-50 border-blue-300";
    return "from-slate-50 to-slate-100 border-slate-300";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-none shadow-2xl glass">
        <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Home className="w-6 h-6" />
            Welcome Back, {submission.contact_name}!
          </CardTitle>
          <p className="text-cyan-100 text-sm mt-2">
            Track your pool project progress in real-time
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden md:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span className="hidden md:inline">Photos</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden md:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Documents</span>
          </TabsTrigger>
        </TabsList>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-xl border-2 bg-gradient-to-br ${getStatusColor(milestone.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(milestone.status)}
                      <div>
                        <h4 className="font-bold text-slate-900">{milestone.name}</h4>
                        {milestone.date && (
                          <p className="text-sm text-slate-600">
                            {new Date(milestone.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge className={
                      milestone.status === "completed" ? "bg-green-600" :
                      milestone.status === "in_progress" ? "bg-blue-600" :
                      "bg-slate-400"
                    }>
                      {milestone.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Construction Progress Photos</CardTitle>
            </CardHeader>
            <CardContent>
              {progressPhotos.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
                  <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No progress photos yet</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Photos will appear here as construction progresses
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  {progressPhotos.map((photo, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group"
                    >
                      <img
                        src={photo.url}
                        alt={`Progress ${idx + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center text-white p-4">
                        <p className="font-semibold mb-1">{photo.milestone}</p>
                        <p className="text-xs">
                          {new Date(photo.uploaded_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-300 mt-2">
                          by {photo.uploaded_by}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Communication with Timeless Pools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-96 overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-lg">
                {messages.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">No messages yet</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg ${
                        msg.sender === "Customer"
                          ? "bg-cyan-600 text-white ml-auto max-w-[80%]"
                          : "bg-white text-slate-900 mr-auto max-w-[80%]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">{msg.sender}</span>
                        <span className="text-xs opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  rows={3}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-white rounded-lg border-2 border-slate-200 flex items-center justify-between hover:border-cyan-300 transition-all">
                <div>
                  <p className="font-semibold text-slate-900">Genesis Project Dossier</p>
                  <p className="text-sm text-slate-600">Your complete design research</p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-slate-200 flex items-center justify-between hover:border-cyan-300 transition-all">
                <div>
                  <p className="font-semibold text-slate-900">Construction Contract</p>
                  <p className="text-sm text-slate-600">Signed agreement</p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-slate-200 flex items-center justify-between hover:border-cyan-300 transition-all">
                <div>
                  <p className="font-semibold text-slate-900">Building Permits</p>
                  <p className="text-sm text-slate-600">City approvals</p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}