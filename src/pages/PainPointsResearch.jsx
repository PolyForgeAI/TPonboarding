import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { AlertTriangle, Target, Zap, CheckCircle, Loader2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function PainPointsResearch() {
  const [research, setResearch] = useState(null);
  const [isResearching, setIsResearching] = useState(false);

  const conductResearch = async () => {
    setIsResearching(true);
    toast.loading("Analyzing Reddit, forums, and reviews...");

    try {
      const prompt = `Analyze Reddit discussions, forums, and online reviews about hiring pool builders and pool construction experiences.

Search these sources:
- Reddit: r/pools, r/homeimprovement, r/swimmingpools discussions
- TroubleFreePool.com forums
- Houzz pool builder discussions
- Yelp, Google, BBB reviews for pool builders
- Pool industry reports and surveys

KEY FINDINGS TO EXTRACT:

Based on preliminary research, these patterns emerged:
1. Communication failures (ghosting, not returning calls)
2. Surprise costs and change orders ($15k+ unexpected charges)
3. Timeline delays (weeks to months behind schedule)
4. Quality issues discovered after completion
5. Feeling "trapped" after excavation starts
6. Decision overload without guidance
7. Can't visualize final result
8. Abandoned after final payment
9. Crew scheduling problems
10. Zero progress transparency

For EACH pain point, provide:
- Specific customer quotes from forums/reviews
- Frequency (what % of customers mention this)
- Severity (deal-breaker, major, moderate, minor)
- Why it hurts customers emotionally and financially
- What customers WISH existed instead
- Opportunity Score (1-10) for differentiation
- Specific solution that would solve it

ALSO IDENTIFY:
- Biggest customer regrets ("I wish I had...")
- Red flags customers warn others about
- What builds trust vs destroys it
- Quick wins vs long-term solutions

Return actionable intelligence ranked by opportunity.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            top_pain_points: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  rank: { type: "number" },
                  pain_point_title: { type: "string" },
                  customer_quote: { type: "string" },
                  how_common: { type: "string" },
                  severity: { type: "string" },
                  why_it_hurts: { type: "string" },
                  what_customers_wish: { type: "string" },
                  opportunity_score: { type: "number" },
                  timeless_pools_solution: { type: "string" },
                  competitive_advantage: { type: "string" }
                }
              }
            },
            biggest_regrets: {
              type: "array",
              items: { type: "string" }
            },
            red_flags_customers_warn_about: {
              type: "array",
              items: { type: "string" }
            },
            trust_builders: {
              type: "array",
              items: { type: "string" }
            },
            trust_destroyers: {
              type: "array",
              items: { type: "string" }
            },
            quick_wins: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  solution: { type: "string" },
                  impact: { type: "string" },
                  difficulty: { type: "string" },
                  implementation: { type: "string" }
                }
              }
            },
            strategic_insights: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setResearch(result);
      toast.dismiss();
      toast.success("Research complete! Found " + result.top_pain_points.length + " pain points");
    } catch (error) {
      console.error("Error conducting research:", error);
      toast.dismiss();
      toast.error("Research failed");
    }

    setIsResearching(false);
  };

  const getSeverityColor = (severity) => {
    if (severity === "deal_breaker") return "bg-red-600";
    if (severity === "major") return "bg-orange-600";
    if (severity === "moderate") return "bg-amber-600";
    return "bg-blue-600";
  };

  const getOpportunityColor = (score) => {
    if (score >= 9) return "from-emerald-600 to-teal-600";
    if (score >= 7) return "from-blue-600 to-cyan-600";
    if (score >= 5) return "from-amber-600 to-orange-600";
    return "from-slate-600 to-slate-700";
  };

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass p-8 rounded-3xl border-2 border-white/30 shadow-floating">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl shadow-lg">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                    Customer Pain Points Research
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Real complaints from Reddit, forums, and reviews
                  </p>
                </div>
              </div>
              <Button
                onClick={conductResearch}
                disabled={isResearching}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              >
                {isResearching ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-2" />
                    Research Pain Points
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {!research ? (
          <Card className="shadow-elevated border-none">
            <CardContent className="py-20 text-center">
              <AlertTriangle className="w-20 h-20 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No Research Data Yet</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Click "Research Pain Points" to analyze thousands of Reddit posts, forum discussions, 
                and reviews to identify what customers HATE about pool builders.
              </p>
              <div className="glass p-6 rounded-2xl max-w-3xl mx-auto text-left">
                <h4 className="font-bold text-slate-900 mb-4">What We'll Research:</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Reddit r/pools, r/homeimprovement, r/swimmingpools horror stories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>TroubleFreePool.com forum complaints and regrets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Yelp, Google, BBB 1-star reviews for pool builders nationwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Industry surveys on customer satisfaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>What customers WISH pool builders did differently</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Strategic Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-floating"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Key Strategic Insights
              </h2>
              <ul className="space-y-3">
                {research.strategic_insights?.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-white/90 text-lg">{insight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Top Pain Points */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                Top {research.top_pain_points.length} Pain Points (Ranked by Opportunity)
              </h2>
              
              {research.top_pain_points
                .sort((a, b) => b.opportunity_score - a.opportunity_score)
                .map((pain, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="border-none shadow-elevated card-lift overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-red-600 to-rose-600" />
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={`text-2xl font-bold px-4 py-2 bg-gradient-to-r ${getOpportunityColor(pain.opportunity_score)}`}>
                                #{pain.rank}
                              </Badge>
                              <CardTitle className="text-2xl">
                                {pain.pain_point_title}
                              </CardTitle>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <Badge className={getSeverityColor(pain.severity)}>
                                {pain.severity.replace("_", " ").toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{pain.how_common}</Badge>
                              <Badge className="bg-purple-600">
                                Opportunity: {pain.opportunity_score}/10
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Customer Quote */}
                        <div className="p-4 glass rounded-xl border-2 border-red-200/50">
                          <p className="text-sm text-slate-600 mb-2 font-semibold">Real Customer Quote:</p>
                          <p className="text-slate-800 italic leading-relaxed">
                            "{pain.customer_quote}"
                          </p>
                        </div>

                        {/* Why It Hurts */}
                        <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
                          <p className="text-sm font-semibold text-amber-900 mb-2">Why This Hurts:</p>
                          <p className="text-sm text-slate-700">{pain.why_it_hurts}</p>
                        </div>

                        {/* What Customers Wish */}
                        <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                          <p className="text-sm font-semibold text-blue-900 mb-2">What Customers Wish Existed:</p>
                          <p className="text-sm text-slate-700">{pain.what_customers_wish}</p>
                        </div>

                        {/* Timeless Pools Solution */}
                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <p className="font-bold text-green-900">Timeless Pools Solution:</p>
                          </div>
                          <p className="text-slate-800 mb-3 leading-relaxed">{pain.timeless_pools_solution}</p>
                          <div className="p-3 bg-white rounded-lg">
                            <p className="text-xs text-green-800 font-semibold mb-1">Competitive Advantage:</p>
                            <p className="text-sm text-slate-700">{pain.competitive_advantage}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>

            {/* Quick Wins */}
            <Card className="border-none shadow-elevated">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Zap className="w-6 h-6" />
                  Quick Wins (Implement First)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {research.quick_wins?.map((win, idx) => (
                    <div key={idx} className="p-5 glass rounded-xl border-2 border-emerald-300/50">
                      <h4 className="font-bold text-slate-900 mb-2">{win.what}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Impact:</span>
                          <Badge className="bg-green-600">{win.impact}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Difficulty:</span>
                          <Badge variant="outline">{win.difficulty}</Badge>
                        </div>
                        <p className="text-slate-700 mt-3">{win.implementation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Biggest Regrets */}
            <Card className="border-none shadow-elevated">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <AlertTriangle className="w-6 h-6" />
                  Biggest Customer Regrets
                </CardTitle>
                <p className="text-amber-100 text-sm mt-2">
                  "I wish I had..." - Learn from thousands of homeowners
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {research.biggest_regrets?.map((regret, idx) => (
                    <div key={idx} className="p-4 glass rounded-xl border-2 border-amber-300/50 flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-slate-800 flex-1">{regret}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Red Flags vs Trust Builders */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-elevated">
                <CardHeader className="bg-gradient-to-r from-red-600 to-rose-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    🚩 Red Flags Customers Warn About
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2">
                    {research.red_flags_customers_warn_about?.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-red-600 font-bold flex-shrink-0">🚩</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-elevated">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    ✅ Trust Builders
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2">
                    {research.trust_builders?.map((builder, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                        <span>{builder}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Trust Destroyers */}
            <Card className="border-none shadow-elevated">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  ❌ Trust Destroyers (NEVER DO THESE)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {research.trust_destroyers?.map((destroyer, idx) => (
                    <div key={idx} className="p-4 bg-red-50 rounded-xl border-2 border-red-200 flex items-start gap-2">
                      <span className="text-red-600 text-xl flex-shrink-0">❌</span>
                      <p className="text-sm text-slate-800">{destroyer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <div className="p-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl shadow-floating">
              <h2 className="text-3xl font-bold mb-4">💡 Bottom Line</h2>
              <p className="text-xl text-cyan-100 leading-relaxed mb-6">
                These pain points represent MASSIVE opportunities. Most pool builders ignore them. 
                If Timeless Pools solves even 3-5 of these, you'll have a significant competitive advantage.
              </p>
              <div className="p-6 bg-white/10 rounded-xl">
                <p className="text-white font-semibold mb-2">Your Platform Already Solves:</p>
                <ul className="space-y-2 text-cyan-100">
                  <li>✓ Visualization (3D viewer, virtual walkthrough, AI overlays)</li>
                  <li>✓ Transparency (comprehensive dossiers, detailed breakdowns)</li>
                  <li>✓ Decision guidance (AI recommendations, material selector)</li>
                  <li>✓ Progress tracking (customer portal, milestone updates)</li>
                  <li>✓ Communication (automated follow-ups, message center)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}