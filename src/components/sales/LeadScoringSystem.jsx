import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { 
  TrendingUp, 
  Flame, 
  Snowflake, 
  ThermometerSun,
  DollarSign,
  Clock,
  Home,
  Target,
  RefreshCw,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function LeadScoringSystem({ submission, onScoreUpdate }) {
  const [score, setScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [breakdown, setBreakdown] = useState(null);

  useEffect(() => {
    if (submission?.lead_score) {
      setScore(submission.lead_score);
      setBreakdown(submission.lead_score_breakdown);
    }
  }, [submission]);

  const calculateLeadScore = async () => {
    setIsCalculating(true);

    try {
      const prompt = `Analyze this pool project lead and provide a comprehensive lead score (0-100).

LEAD INFORMATION:
- Property Value: ${submission.property_data?.estimated_value || "Unknown"}
- Property Location: ${submission.property_city}, ${submission.property_state}
- Budget Range: ${submission.budget_range || "Not specified"}
- Timeline: ${submission.timeline || "Not specified"}
- Contact: ${submission.contact_name} (${submission.contact_email})
- Must-Have Features: ${submission.must_haves?.join(", ") || "None specified"}
- Nice-to-Have Features: ${submission.nice_to_haves?.join(", ") || "None specified"}
- Pool Vision: ${submission.pool_vision || "Not specified"}
- Household: ${submission.household_size}, Children: ${submission.has_children}, Pets: ${submission.has_pets}
- Entertainment: ${submission.entertainment_frequency || "Not specified"}

SCORING CRITERIA:

1. BUDGET SIGNALS (0-25 points):
   - High budget range = higher score
   - Property value indicates ability to pay
   - Specified vs. "not sure yet"

2. URGENCY (0-20 points):
   - "As soon as possible" = highest score
   - "Just exploring" = lowest score
   - Specified timeline vs. uncertain

3. ENGAGEMENT (0-20 points):
   - Detailed vision statement = high engagement
   - Many must-haves specified = serious buyer
   - Uploaded inspiration photos = invested
   - Filled out all form fields = committed

4. PROPERTY FIT (0-15 points):
   - Adequate lot size for desired pool
   - High-value neighborhood (pools common)
   - No major obstacles (HOA restrictions, etc.)

5. DECISION AUTHORITY (0-10 points):
   - Professional email domain = decision maker
   - Complete contact info = serious inquiry
   - Clear communication = ready to move

6. PROJECT COMPLEXITY (0-10 points):
   - Realistic feature requests = qualified buyer
   - Aligned budget + features = understands costs
   - Clear priorities = knows what they want

Provide:
- Overall score (0-100)
- Temperature (HOT 80-100, WARM 50-79, COLD 0-49)
- Score breakdown by category
- Key strengths (why high score)
- Key concerns (why lower score)
- Recommended actions for sales team
- Probability to close (percentage)
- Estimated close timeline`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            overall_score: { type: "number" },
            temperature: { type: "string", enum: ["HOT", "WARM", "COLD"] },
            budget_score: { type: "number" },
            urgency_score: { type: "number" },
            engagement_score: { type: "number" },
            property_fit_score: { type: "number" },
            decision_authority_score: { type: "number" },
            complexity_score: { type: "number" },
            key_strengths: { type: "array", items: { type: "string" } },
            key_concerns: { type: "array", items: { type: "string" } },
            recommended_actions: { type: "array", items: { type: "string" } },
            probability_to_close: { type: "number" },
            estimated_close_timeline: { type: "string" },
            follow_up_priority: { type: "string", enum: ["IMMEDIATE", "HIGH", "MEDIUM", "LOW"] }
          }
        }
      });

      setScore(result.overall_score);
      setBreakdown(result);

      // Save to database
      await base44.entities.OnboardingSubmission.update(submission.id, {
        lead_score: result.overall_score,
        lead_temperature: result.temperature,
        lead_score_breakdown: result,
        lead_scored_date: new Date().toISOString()
      });

      if (onScoreUpdate) {
        onScoreUpdate(result);
      }
    } catch (error) {
      console.error("Error calculating lead score:", error);
    }

    setIsCalculating(false);
  };

  const getTemperatureConfig = (temp) => {
    const configs = {
      HOT: {
        color: "from-red-500 to-orange-500",
        bgColor: "from-red-50 to-orange-50",
        icon: <Flame className="w-8 h-8" />,
        iconColor: "text-red-600",
        label: "🔥 HOT LEAD",
        description: "High probability to close. Priority follow-up!"
      },
      WARM: {
        color: "from-yellow-500 to-amber-500",
        bgColor: "from-yellow-50 to-amber-50",
        icon: <ThermometerSun className="w-8 h-8" />,
        iconColor: "text-yellow-600",
        label: "☀️ WARM LEAD",
        description: "Good potential. Nurture with regular follow-up."
      },
      COLD: {
        color: "from-blue-500 to-cyan-500",
        bgColor: "from-blue-50 to-cyan-50",
        icon: <Snowflake className="w-8 h-8" />,
        iconColor: "text-blue-600",
        label: "❄️ COLD LEAD",
        description: "Low urgency. Add to nurture campaign."
      }
    };
    return configs[temp] || configs.COLD;
  };

  if (!score && !isCalculating) {
    return (
      <Card className="border-none shadow-xl">
        <CardContent className="p-12 text-center">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-3">Lead Score Not Calculated</h3>
          <p className="text-gray-600 mb-6">
            Use AI to analyze this lead and predict likelihood to close
          </p>
          <Button 
            onClick={calculateLeadScore}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Calculate Lead Score
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isCalculating) {
    return (
      <Card className="border-none shadow-xl">
        <CardContent className="p-12 text-center">
          <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Lead...</h3>
          <p className="text-gray-600">AI is scoring this prospect based on multiple factors</p>
        </CardContent>
      </Card>
    );
  }

  const temp = breakdown?.temperature || "COLD";
  const config = getTemperatureConfig(temp);

  return (
    <Card className="border-none shadow-xl overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${config.color} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {config.icon}
            <div>
              <CardTitle className="text-2xl">{config.label}</CardTitle>
              <p className="text-white/90 text-sm mt-1">{config.description}</p>
            </div>
          </div>
          <Button
            onClick={calculateLeadScore}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/40 text-white hover:bg-white/30"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recalculate
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Overall Score */}
        <div className={`p-6 bg-gradient-to-r ${config.bgColor} rounded-xl border-2 border-gray-200`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Lead Score</p>
              <p className="text-5xl font-bold text-gray-900">{score}/100</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Close Probability</p>
              <p className="text-3xl font-bold text-green-700">{breakdown?.probability_to_close}%</p>
            </div>
          </div>
          <Progress value={score} className="h-3" />
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-4">
          <ScoreCard
            label="Budget Signals"
            score={breakdown?.budget_score || 0}
            max={25}
            icon={<DollarSign className="w-5 h-5" />}
            color="green"
          />
          <ScoreCard
            label="Urgency"
            score={breakdown?.urgency_score || 0}
            max={20}
            icon={<Clock className="w-5 h-5" />}
            color="orange"
          />
          <ScoreCard
            label="Engagement"
            score={breakdown?.engagement_score || 0}
            max={20}
            icon={<Target className="w-5 h-5" />}
            color="purple"
          />
          <ScoreCard
            label="Property Fit"
            score={breakdown?.property_fit_score || 0}
            max={15}
            icon={<Home className="w-5 h-5" />}
            color="blue"
          />
          <ScoreCard
            label="Decision Authority"
            score={breakdown?.decision_authority_score || 0}
            max={10}
            icon={<TrendingUp className="w-5 h-5" />}
            color="indigo"
          />
          <ScoreCard
            label="Project Complexity"
            score={breakdown?.complexity_score || 0}
            max={10}
            icon={<Target className="w-5 h-5" />}
            color="cyan"
          />
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-lg text-green-800 mb-3">✓ Key Strengths</h4>
            <ul className="space-y-2">
              {breakdown?.key_strengths?.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg text-amber-800 mb-3">⚠ Key Concerns</h4>
            <ul className="space-y-2">
              {breakdown?.key_concerns?.map((concern, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
          <h4 className="font-bold text-purple-900 mb-3">📋 Recommended Sales Actions</h4>
          <ul className="space-y-2">
            {breakdown?.recommended_actions?.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-800">
                <span className="text-purple-600 font-bold">{idx + 1}.</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline & Priority */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Estimated Close Timeline</p>
            <p className="text-xl font-bold text-blue-900">{breakdown?.estimated_close_timeline}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
            <p className="text-sm text-gray-600 mb-1">Follow-Up Priority</p>
            <Badge className="text-lg px-4 py-1 bg-red-600">{breakdown?.follow_up_priority}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreCard({ label, score, max, icon, color }) {
  const percentage = (score / max) * 100;
  
  const colorMap = {
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-amber-500",
    purple: "from-purple-500 to-pink-500",
    blue: "from-blue-500 to-cyan-500",
    indigo: "from-indigo-500 to-purple-500",
    cyan: "from-cyan-500 to-teal-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 bg-gradient-to-r ${colorMap[color]} rounded-lg text-white`}>
            {icon}
          </div>
          <span className="font-medium text-gray-900">{label}</span>
        </div>
        <span className="text-2xl font-bold text-gray-900">{score}/{max}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </motion.div>
  );
}