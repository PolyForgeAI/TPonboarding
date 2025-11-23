import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import { Brain, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomerIntentAnalyzer({ submission }) {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (submission) {
      analyzeIntent();
    }
  }, [submission]);

  const analyzeIntent = async () => {
    try {
      const prompt = `Analyze this customer's form responses to detect buying intent signals.

FORM DATA:
- Vision Statement: "${submission.pool_vision}"
- Budget: ${submission.budget_range}
- Timeline: ${submission.timeline}
- Must-Haves: ${submission.must_haves?.join(", ")}
- Nice-to-Haves: ${submission.nice_to_haves?.join(", ")}
- Additional Notes: "${submission.additional_notes}"
- Household: ${submission.household_size}, Children: ${submission.has_children}
- Entertainment: ${submission.entertainment_frequency}

ANALYZE FOR:

1. URGENCY SIGNALS (0-100):
   - Language indicating time pressure
   - Timeline specificity
   - Phrases like "as soon as possible", "this year", "before summer"
   - Score urgency level

2. BUDGET CONFIDENCE (0-100):
   - Did they specify exact range or "not sure yet"?
   - Property value vs stated budget (realistic?)
   - Feature requests vs budget (aligned?)
   - Financial readiness indicators

3. DECISION AUTHORITY (0-100):
   - Language: "I want" vs "we are considering"
   - Completeness of responses
   - Professional email domain
   - Confidence in answers

4. RESEARCH DEPTH (0-100):
   - Specific feature requests (indicates research)
   - Industry terminology used
   - Inspiration photos uploaded
   - Detailed vision statement

5. EMOTIONAL CONNECTION (0-100):
   - Excitement level in language
   - Personal stories/context provided
   - Lifestyle integration described
   - Long-term thinking

6. RED FLAGS:
   - Price shopping signals
   - Vague/generic responses
   - Unrealistic expectations
   - Time wasters

7. GREEN FLAGS:
   - Detailed, thoughtful responses
   - Realistic budget/timeline
   - Decision-maker language
   - Clear priorities

8. RECOMMENDED APPROACH:
   - How aggressively to pursue
   - What to emphasize in follow-up
   - Likely objections to prepare for
   - Estimated close timeline

Provide psychological insights for sales strategy.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            urgency_score: { type: "number" },
            urgency_signals: { type: "array", items: { type: "string" } },
            budget_confidence_score: { type: "number" },
            budget_signals: { type: "array", items: { type: "string" } },
            decision_authority_score: { type: "number" },
            authority_signals: { type: "array", items: { type: "string" } },
            research_depth_score: { type: "number" },
            research_signals: { type: "array", items: { type: "string" } },
            emotional_connection_score: { type: "number" },
            emotional_signals: { type: "array", items: { type: "string" } },
            red_flags: { type: "array", items: { type: "string" } },
            green_flags: { type: "array", items: { type: "string" } },
            overall_intent_score: { type: "number" },
            psychological_profile: { type: "string" },
            recommended_approach: { type: "string" },
            likely_objections: { type: "array", items: { type: "string" } },
            key_motivators: { type: "array", items: { type: "string" } },
            estimated_close_timeline: { type: "string" },
            sales_strategy: { type: "string" }
          }
        }
      });

      setAnalysis(result);
    } catch (error) {
      console.error("Error analyzing intent:", error);
    }
  };

  if (!analysis) return null;

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Brain className="w-6 h-6" />
          Customer Intent Analysis
        </CardTitle>
        <p className="text-violet-100 text-sm mt-2">
          AI psychological profiling from form responses
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Overall Intent Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300 text-center"
        >
          <p className="text-sm text-slate-600 mb-2">Overall Intent Score</p>
          <p className="text-6xl font-bold text-purple-900 mb-4">{analysis.overall_intent_score}/100</p>
          <Progress value={analysis.overall_intent_score} className="h-3 mb-4" />
          <p className="text-sm text-slate-700">{analysis.psychological_profile}</p>
        </motion.div>

        {/* Intent Dimensions */}
        <div className="grid md:grid-cols-2 gap-4">
          <IntentCard
            label="Urgency"
            score={analysis.urgency_score}
            signals={analysis.urgency_signals}
            color="red"
          />
          <IntentCard
            label="Budget Confidence"
            score={analysis.budget_confidence_score}
            signals={analysis.budget_signals}
            color="green"
          />
          <IntentCard
            label="Decision Authority"
            score={analysis.decision_authority_score}
            signals={analysis.authority_signals}
            color="blue"
          />
          <IntentCard
            label="Research Depth"
            score={analysis.research_depth_score}
            signals={analysis.research_signals}
            color="purple"
          />
          <IntentCard
            label="Emotional Connection"
            score={analysis.emotional_connection_score}
            signals={analysis.emotional_signals}
            color="pink"
          />
        </div>

        {/* Flags */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
            <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Green Flags
            </h3>
            <ul className="space-y-2">
              {analysis.green_flags?.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border-2 border-red-300">
            <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Red Flags
            </h3>
            <ul className="space-y-2">
              {analysis.red_flags?.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-red-600 font-bold">⚠</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Motivators */}
        <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-300">
          <h3 className="text-lg font-bold text-cyan-900 mb-3">🎯 Key Motivators</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {analysis.key_motivators?.map((motivator, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <span className="text-sm text-slate-800">{motivator}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Strategy */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">💡 Recommended Sales Strategy</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <h4 className="font-bold mb-2">Approach</h4>
              <p className="text-white/90 text-sm leading-relaxed">{analysis.recommended_approach}</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <h4 className="font-bold mb-2">Strategy</h4>
              <p className="text-white/90 text-sm leading-relaxed">{analysis.sales_strategy}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="font-bold mb-2">Estimated Close Timeline</h4>
                <p className="text-2xl font-bold">{analysis.estimated_close_timeline}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="font-bold mb-2">Likely Objections</h4>
                <ul className="space-y-1 text-sm">
                  {analysis.likely_objections?.slice(0, 3).map((obj, idx) => (
                    <li key={idx} className="text-white/90">• {obj}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IntentCard({ label, score, signals, color }) {
  const colorMap = {
    red: "from-red-500 to-rose-500",
    green: "from-green-500 to-emerald-500",
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    pink: "from-pink-500 to-rose-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-slate-900">{label}</h4>
        <div className={`px-3 py-1 bg-gradient-to-r ${colorMap[color]} text-white rounded-full font-bold`}>
          {score}
        </div>
      </div>
      <Progress value={score} className="h-2 mb-3" />
      <ul className="space-y-1">
        {signals?.slice(0, 2).map((signal, idx) => (
          <li key={idx} className="text-xs text-slate-600 flex items-start gap-1">
            <span>•</span>
            <span>{signal}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}