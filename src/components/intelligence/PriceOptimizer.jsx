import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Slider } from "@/shared/components/ui/slider";
import { DollarSign, TrendingUp, Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PriceOptimizer({ submission, concepts }) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [priceMultiplier, setPriceMultiplier] = useState(1);

  const optimizePrice = async () => {
    setIsOptimizing(true);
    toast.loading("Analyzing optimal pricing strategy...");

    try {
      const prompt = `You are a pricing strategist for Timeless Pools. Analyze this lead and recommend optimal pricing.

CUSTOMER PROFILE:
- Property Value: ${submission.property_data?.estimated_value || "Unknown"}
- Location: ${submission.property_city}, ${submission.property_state}
- Neighborhood: ${submission.property_data?.neighborhood_info || "Unknown"}
- Budget Range: ${submission.budget_range}
- Timeline: ${submission.timeline}
- Must-Have Features: ${submission.must_haves?.join(", ") || "None"}
- Lead Score: ${submission.lead_score || "Not scored"}
- Lead Temperature: ${submission.lead_temperature || "Unknown"}

DESIGN CONCEPTS:
${concepts?.map((c, i) => `
Concept ${i+1}: ${c.name}
- Estimated Base Cost: ${c.estimated_cost}
- Features: ${c.key_features?.join(", ")}
`).join("\n")}

PRICING ANALYSIS REQUIRED:

1. CUSTOMER ABILITY TO PAY:
   - Based on property value, can they afford higher-end pricing?
   - Are they in a wealthy neighborhood where premium pricing is expected?
   - Do their feature requests indicate luxury buyer?

2. URGENCY PRICING:
   - High urgency ("ASAP") = less price sensitivity
   - Low urgency ("exploring") = more price sensitivity

3. COMPETITIVE POSITIONING:
   - What are competitors charging for similar projects?
   - Where should Timeless Pools price (premium/mid/value)?

4. PSYCHOLOGY:
   - Should we anchor high then discount?
   - Or present "good-better-best" pricing tiers?

5. VALUE JUSTIFICATION:
   - What premium can we charge for GENESIS certification?
   - Premium for Jandy equipment vs competitors' brands?
   - Premium for AI design dossier?

PROVIDE:
- Recommended price for each concept
- Confidence level (high/medium/low)
- Pricing strategy rationale
- Upsell opportunities
- Discount tolerance (if they negotiate)
- Optimal payment terms
- How to present pricing (to maximize close rate)`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            concept_pricing: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  concept_name: { type: "string" },
                  recommended_price: { type: "string" },
                  confidence: { type: "string" },
                  price_reasoning: { type: "string" }
                }
              }
            },
            overall_strategy: { type: "string" },
            customer_price_sensitivity: { type: "string" },
            upsell_opportunities: { type: "array", items: { type: "string" } },
            discount_tolerance: { type: "string" },
            negotiation_strategy: { type: "string" },
            presentation_approach: { type: "string" },
            premium_justification: { type: "array", items: { type: "string" } }
          }
        }
      });

      setRecommendation(result);
      toast.dismiss();
      toast.success("Pricing strategy optimized!");
    } catch (error) {
      console.error("Error optimizing price:", error);
      toast.dismiss();
      toast.error("Failed to optimize pricing");
    }

    setIsOptimizing(false);
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <DollarSign className="w-6 h-6" />
              AI Price Optimization
            </CardTitle>
            <p className="text-emerald-100 text-sm mt-2">
              Machine learning-powered pricing strategy
            </p>
          </div>
          <Button
            onClick={optimizePrice}
            disabled={isOptimizing}
            className="bg-white text-emerald-600 hover:bg-emerald-50"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Optimize Pricing
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!recommendation ? (
          <div className="text-center py-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
            <DollarSign className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Pricing Analysis Yet</h3>
            <p className="text-slate-600 mb-6">
              Let AI analyze optimal pricing based on customer profile and market data
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Strategy */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Overall Pricing Strategy</h3>
              <p className="text-slate-800 leading-relaxed">{recommendation.overall_strategy}</p>
            </div>

            {/* Concept Pricing */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Recommended Pricing by Concept</h3>
              {recommendation.concept_pricing?.map((pricing, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border-2 border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg text-slate-900">{pricing.concept_name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        pricing.confidence === "high" ? "bg-green-600" :
                        pricing.confidence === "medium" ? "bg-amber-600" :
                        "bg-slate-600"
                      }>
                        {pricing.confidence} confidence
                      </Badge>
                      <div className="text-2xl font-bold text-emerald-700">
                        {pricing.recommended_price}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{pricing.price_reasoning}</p>
                </div>
              ))}
            </div>

            {/* Customer Insights */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2">Price Sensitivity</h4>
                <p className="text-sm text-slate-700">{recommendation.customer_price_sensitivity}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                <h4 className="font-bold text-amber-900 mb-2">Discount Tolerance</h4>
                <p className="text-sm text-slate-700">{recommendation.discount_tolerance}</p>
              </div>
            </div>

            {/* Upsell Opportunities */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Upsell Opportunities
              </h3>
              <div className="space-y-2">
                {recommendation.upsell_opportunities?.map((opp, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-slate-800">{opp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Justification */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Premium Price Justifications</h3>
              <div className="space-y-2">
                {recommendation.premium_justification?.map((just, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <Badge className="bg-indigo-600">Why</Badge>
                    <p className="text-slate-800 text-sm">{just}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation Strategy */}
            <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border-2 border-slate-300">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Negotiation Strategy</h3>
              <p className="text-slate-800 leading-relaxed mb-4">{recommendation.negotiation_strategy}</p>
              
              <h4 className="font-bold text-slate-900 mb-2">How to Present Pricing:</h4>
              <p className="text-slate-800 leading-relaxed">{recommendation.presentation_approach}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}