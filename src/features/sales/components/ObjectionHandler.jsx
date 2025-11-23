import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Shield, MessageSquare, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ObjectionHandler({ submission, concepts }) {
  const [objection, setObjection] = useState("");
  const [response, setResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commonObjections] = useState([
    "The price is too high",
    "I need to think about it",
    "I want to get other quotes",
    "Can we cut costs somewhere?",
    "The timeline is too long",
    "I'm worried about quality",
    "What if I don't like it?",
    "How do I know you won't go over budget?"
  ]);

  const handleObjection = async (objectionText) => {
    setObjection(objectionText);
    setIsProcessing(true);
    toast.loading("Analyzing objection and crafting response...");

    try {
      const prompt = `You are a master sales consultant for Timeless Pools. A customer just raised an objection. Provide a powerful, empathetic response that addresses their concern and moves toward the close.

OBJECTION: "${objectionText}"

CUSTOMER CONTEXT:
- Property Value: ${submission.property_data?.estimated_value || "Unknown"}
- Budget Range: ${submission.budget_range}
- Timeline: ${submission.timeline}
- Lead Score: ${submission.lead_score}/100
- Lead Temperature: ${submission.lead_temperature}
- Must-Have Features: ${submission.must_haves?.join(", ")}

DESIGN CONCEPTS PRICING:
${concepts?.map((c, i) => `${c.name}: ${c.estimated_cost}`).join("\n")}

TIMELESS POOLS UNIQUE VALUE:
- GENESIS Certified Master
- World's Greatest Pools Award Winner
- Elite Pebble Tec Builder
- Exclusive Jandy/Fluidra equipment
- AI-powered design dossiers worth $10k+
- 3 locations (Orange County, Utah, Cabo)

YOUR RESPONSE SHOULD:
1. VALIDATE their concern (never dismiss it)
2. REFRAME the objection (shift perspective)
3. PROVIDE DATA or PROOF (back up your claims)
4. OFFER A SOLUTION (if applicable)
5. TRIAL CLOSE (ask a question that moves forward)

Use techniques like:
- Feel-Felt-Found ("I understand how you feel... Others have felt... Here's what they found...")
- Cost vs. Investment reframing
- Risk reversal
- Social proof
- Scarcity/urgency (when appropriate)
- Break down into smaller decisions

Be consultative, not pushy. Build trust. Win-win mindset.

Provide 3 possible response approaches (aggressive, balanced, consultative).`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            objection_type: { type: "string" },
            urgency_level: { type: "string", enum: ["high", "medium", "low"] },
            recommended_approach: { type: "string", enum: ["aggressive", "balanced", "consultative"] },
            responses: {
              type: "object",
              properties: {
                aggressive: {
                  type: "object",
                  properties: {
                    script: { type: "string" },
                    tone: { type: "string" },
                    close_probability: { type: "string" }
                  }
                },
                balanced: {
                  type: "object",
                  properties: {
                    script: { type: "string" },
                    tone: { type: "string" },
                    close_probability: { type: "string" }
                  }
                },
                consultative: {
                  type: "object",
                  properties: {
                    script: { type: "string" },
                    tone: { type: "string" },
                    close_probability: { type: "string" }
                  }
                }
              }
            },
            supporting_data: {
              type: "array",
              items: { type: "string" }
            },
            next_steps: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setResponse(result);
      toast.dismiss();
      toast.success("Response strategies ready!");
    } catch (error) {
      console.error("Error handling objection:", error);
      toast.dismiss();
      toast.error("Failed to process objection");
    }

    setIsProcessing(false);
  };

  const urgencyColors = {
    high: "bg-red-600",
    medium: "bg-amber-600",
    low: "bg-green-600"
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Shield className="w-6 h-6" />
          AI Objection Handler
        </CardTitle>
        <p className="text-rose-100 text-sm mt-2">
          Never be caught off-guard again - instant rebuttals
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Input */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900">
            What objection did the customer raise?
          </label>
          <div className="flex gap-2">
            <Input
              value={objection}
              onChange={(e) => setObjection(e.target.value)}
              placeholder='e.g., "The price is too high"'
              className="flex-1 text-base"
              onKeyDown={(e) => e.key === "Enter" && handleObjection(objection)}
            />
            <Button
              onClick={() => handleObjection(objection)}
              disabled={!objection || isProcessing}
              className="bg-gradient-to-r from-rose-600 to-pink-600"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Handle It</>
              )}
            </Button>
          </div>
        </div>

        {/* Common Objections Quick Select */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">Or select a common objection:</p>
          <div className="grid md:grid-cols-2 gap-2">
            {commonObjections.map((obj, idx) => (
              <button
                key={idx}
                onClick={() => handleObjection(obj)}
                disabled={isProcessing}
                className="p-3 text-left text-sm bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-rose-300 rounded-lg transition-all"
              >
                💬 {obj}
              </button>
            ))}
          </div>
        </div>

        {/* Response */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Objection Analysis */}
              <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border-2 border-slate-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900">Objection Analysis</h3>
                  <div className="flex gap-2">
                    <Badge className={urgencyColors[response.urgency_level]}>
                      {response.urgency_level.toUpperCase()} urgency
                    </Badge>
                    <Badge variant="outline">
                      {response.objection_type}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  <strong>Recommended Approach:</strong> {response.recommended_approach}
                </p>
              </div>

              {/* Response Scripts */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Response Strategies</h3>
                
                {/* Consultative (Recommended) */}
                <div className={`p-6 rounded-xl border-2 ${
                  response.recommended_approach === "consultative" ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50" : "border-slate-200 bg-white"
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-slate-900">🤝 Consultative Approach</h4>
                    <div className="flex items-center gap-2">
                      {response.recommended_approach === "consultative" && (
                        <Badge className="bg-green-600">RECOMMENDED</Badge>
                      )}
                      <Badge variant="outline">
                        {response.responses.consultative.close_probability}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 italic">
                    Tone: {response.responses.consultative.tone}
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {response.responses.consultative.script}
                    </p>
                  </div>
                </div>

                {/* Balanced */}
                <div className={`p-6 rounded-xl border-2 ${
                  response.recommended_approach === "balanced" ? "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50" : "border-slate-200 bg-white"
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-slate-900">⚖️ Balanced Approach</h4>
                    <div className="flex items-center gap-2">
                      {response.recommended_approach === "balanced" && (
                        <Badge className="bg-blue-600">RECOMMENDED</Badge>
                      )}
                      <Badge variant="outline">
                        {response.responses.balanced.close_probability}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 italic">
                    Tone: {response.responses.balanced.tone}
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {response.responses.balanced.script}
                    </p>
                  </div>
                </div>

                {/* Aggressive */}
                <div className={`p-6 rounded-xl border-2 ${
                  response.recommended_approach === "aggressive" ? "border-red-400 bg-gradient-to-br from-red-50 to-rose-50" : "border-slate-200 bg-white"
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-slate-900">💪 Aggressive Approach</h4>
                    <div className="flex items-center gap-2">
                      {response.recommended_approach === "aggressive" && (
                        <Badge className="bg-red-600">RECOMMENDED</Badge>
                      )}
                      <Badge variant="outline">
                        {response.responses.aggressive.close_probability}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 italic">
                    Tone: {response.responses.aggressive.tone}
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {response.responses.aggressive.script}
                    </p>
                  </div>
                </div>
              </div>

              {/* Supporting Data */}
              {response.supporting_data && response.supporting_data.length > 0 && (
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <h3 className="text-lg font-bold text-purple-900 mb-4">📊 Supporting Data & Proof</h3>
                  <ul className="space-y-2">
                    {response.supporting_data.map((data, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <TrendingUp className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{data}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Steps */}
              {response.next_steps && response.next_steps.length > 0 && (
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">🎯 Next Steps to Close</h3>
                  <ol className="space-y-3">
                    {response.next_steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-sm text-slate-800 pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}