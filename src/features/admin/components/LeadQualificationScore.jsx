import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Target, DollarSign, Clock, MessageSquare, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/shared/components/ui/progress";

export default function LeadQualificationScore({ submission }) {
  // Calculate lead quality score
  const calculateScore = () => {
    let score = 0;
    let breakdown = {};

    // Budget indicator (30 points)
    if (submission.budget_range) {
      if (submission.budget_range.includes("200k+") || submission.budget_range.includes("150k-200k")) {
        score += 30;
        breakdown.budget = { score: 30, reason: "High budget range" };
      } else if (submission.budget_range.includes("100k-150k")) {
        score += 20;
        breakdown.budget = { score: 20, reason: "Medium-high budget" };
      } else {
        score += 10;
        breakdown.budget = { score: 10, reason: "Lower budget range" };
      }
    }

    // Timeline urgency (20 points)
    if (submission.timeline) {
      if (submission.timeline.includes("ASAP") || submission.timeline.includes("3-6 months")) {
        score += 20;
        breakdown.timeline = { score: 20, reason: "Ready to start soon" };
      } else if (submission.timeline.includes("6-12 months")) {
        score += 15;
        breakdown.timeline = { score: 15, reason: "Realistic timeline" };
      } else {
        score += 5;
        breakdown.timeline = { score: 5, reason: "Long timeline (less urgent)" };
      }
    }

    // Detail level (20 points) - Did they provide thoughtful responses?
    const hasVision = submission.pool_vision?.length > 100;
    const hasMustHaves = (submission.must_haves?.length || 0) > 3;
    const hasInspiration = (submission.inspiration_images?.length || 0) > 0;
    
    if (hasVision && hasMustHaves && hasInspiration) {
      score += 20;
      breakdown.detail = { score: 20, reason: "Highly engaged, detailed input" };
    } else if (hasVision || hasMustHaves) {
      score += 10;
      breakdown.detail = { score: 10, reason: "Moderate engagement" };
    } else {
      score += 5;
      breakdown.detail = { score: 5, reason: "Minimal detail provided" };
    }

    // Property value indicator (15 points)
    if (submission.property_data?.estimated_value) {
      const value = submission.property_data.estimated_value;
      if (value.includes("$1M+") || value.includes("$2M+")) {
        score += 15;
        breakdown.property = { score: 15, reason: "High-value property" };
      } else if (value.includes("$800k") || value.includes("$900k")) {
        score += 10;
        breakdown.property = { score: 10, reason: "Medium-high property value" };
      } else {
        score += 5;
        breakdown.property = { score: 5, reason: "Lower property value" };
      }
    }

    // Multiple decision makers (10 points) - shows seriousness
    if (submission.decision_makers?.length > 1) {
      score += 10;
      breakdown.decision_makers = { score: 10, reason: "Multiple decision makers involved" };
    } else {
      score += 5;
      breakdown.decision_makers = { score: 5, reason: "Single decision maker" };
    }

    // Admin created (5 points bonus) - already vetted
    if (submission.created_by_admin) {
      score += 5;
      breakdown.admin_created = { score: 5, reason: "Admin pre-qualified" };
    }

    return { score, breakdown };
  };

  const { score, breakdown } = calculateScore();

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-600 to-emerald-600";
    if (score >= 60) return "from-blue-600 to-cyan-600";
    if (score >= 40) return "from-amber-600 to-orange-600";
    return "from-red-600 to-rose-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "HOT - Priority Lead";
    if (score >= 60) return "WARM - Qualified Lead";
    if (score >= 40) return "COOL - Needs Nurturing";
    return "COLD - Low Priority";
  };

  const getActionRecommendation = (score) => {
    if (score >= 80) {
      return {
        title: "🔥 Take Action Now",
        actions: [
          "Call within 24 hours - high intent, high budget",
          "Review their dossier in detail before calling",
          "Prepare to schedule site visit",
          "Assign to your best closer"
        ]
      };
    } else if (score >= 60) {
      return {
        title: "📞 Schedule Discovery Call",
        actions: [
          "Call within 48-72 hours",
          "Walk through their design concepts",
          "Gauge seriousness and timeline",
          "Send follow-up with next steps"
        ]
      };
    } else if (score >= 40) {
      return {
        title: "📧 Email Follow-up",
        actions: [
          "Send educational content about process",
          "Share portfolio of similar projects",
          "Offer to answer questions via email",
          "Add to nurture sequence"
        ]
      };
    } else {
      return {
        title: "⏳ Low Priority",
        actions: [
          "Add to long-term nurture list",
          "Send occasional updates",
          "Wait for them to reach out",
          "Don't invest heavy sales time"
        ]
      };
    }
  };

  const recommendation = getActionRecommendation(score);

  return (
    <Card className="border-none shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-600" />
          Lead Qualification Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getScoreColor(score)} text-white shadow-floating mb-4`}>
            <div>
              <div className="text-4xl font-bold">{score}</div>
              <div className="text-xs">/ 100</div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{getScoreLabel(score)}</h3>
          <Progress value={score} className="h-3" />
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900">Score Breakdown</h4>
          {Object.entries(breakdown).map(([key, data]) => (
            <div key={key} className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-900 capitalize">
                  {key.replace("_", " ")}
                </span>
                <p className="text-xs text-slate-600">{data.reason}</p>
              </div>
              <Badge className={`bg-gradient-to-r ${getScoreColor(data.score)}`}>
                +{data.score}
              </Badge>
            </div>
          ))}
        </div>

        {/* Action Recommendation */}
        <div className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-300">
          <h4 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
            {recommendation.title}
          </h4>
          <ul className="space-y-2">
            {recommendation.actions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-cyan-600 font-bold">{idx + 1}.</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Makes This Lead Good/Bad */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-900 mb-2 text-sm">✅ Strengths</h5>
            <ul className="space-y-1">
              {score >= 60 && <li className="text-xs text-green-800">• Good budget range</li>}
              {submission.timeline?.includes("ASAP") && <li className="text-xs text-green-800">• Ready to start</li>}
              {submission.pool_vision?.length > 100 && <li className="text-xs text-green-800">• Detailed vision</li>}
              {submission.decision_makers?.length > 1 && <li className="text-xs text-green-800">• Multiple stakeholders</li>}
              {submission.created_by_admin && <li className="text-xs text-green-800">• Admin pre-qualified</li>}
            </ul>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h5 className="font-semibold text-amber-900 mb-2 text-sm">⚠️ Watch For</h5>
            <ul className="space-y-1">
              {score < 60 && <li className="text-xs text-amber-800">• Lower budget range</li>}
              {submission.timeline?.includes("1+ year") && <li className="text-xs text-amber-800">• Long timeline</li>}
              {!submission.pool_vision && <li className="text-xs text-amber-800">• Minimal detail provided</li>}
              {!submission.inspiration_images?.length && <li className="text-xs text-amber-800">• No inspiration photos</li>}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}