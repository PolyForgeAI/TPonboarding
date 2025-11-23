import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { DollarSign, TrendingUp, Home, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function WealthIndicators({ submission }) {
  const [indicators, setIndicators] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeWealth = async () => {
    setIsAnalyzing(true);
    toast.loading("Analyzing wealth indicators...");

    try {
      const prompt = `Analyze affluence and ability-to-pay for this customer.

PROPERTY INFO:
- Address: ${submission.property_address}, ${submission.property_city}, ${submission.property_state} ${submission.property_zip}
- Estimated Value: ${submission.property_data?.estimated_value || "Unknown"}
- Lot Size: ${submission.property_data?.lot_square_footage || "Unknown"}
- Neighborhood: ${submission.property_data?.neighborhood_info || "Unknown"}

ANALYZE WEALTH INDICATORS:

1. PROPERTY-BASED SIGNALS:
   - Property value percentile for area
   - Recent remodels/improvements visible
   - Landscaping quality
   - Architectural style (custom vs. tract)
   - Pool-ready infrastructure

2. NEIGHBORHOOD AFFLUENCE:
   - Median income in ZIP code
   - Average home values
   - Luxury amenities nearby (country clubs, marinas, golf courses)
   - School district quality (indicator of income)
   - HOA fees (higher = wealthier area)

3. LIFESTYLE INDICATORS:
   - Multiple cars visible (from Google Street View)
   - Luxury vehicles present
   - Boat/RV ownership
   - Recent home purchases (paid over market?)

4. SPENDING CAPACITY:
   - Property value vs. mortgage (equity position)
   - Recent renovations (indicates cash flow)
   - Pool budget stated vs. property value (realistic?)

5. AFFLUENCE TIER:
   - Mass Affluent ($500k-1M property)
   - Upper Affluent ($1M-2M property)
   - High Net Worth ($2M-5M property)
   - Ultra High Net Worth ($5M+ property)

6. SPENDING PATTERNS:
   - Likely to value premium materials?
   - Likely to add luxury features?
   - Price sensitivity estimate

7. DECISION FACTORS:
   - More influenced by quality or price?
   - Likely to pay premium for Timeless Pools brand?
   - Expected discount tolerance

Provide tactical sales intelligence.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            affluence_tier: { type: "string" },
            wealth_score: { type: "number" },
            property_signals: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  indicator: { type: "string" },
                  finding: { type: "string" },
                  affluence_signal: { type: "string", enum: ["strong", "moderate", "weak"] }
                }
              }
            },
            neighborhood_affluence: {
              type: "object",
              properties: {
                median_income: { type: "string" },
                avg_home_value: { type: "string" },
                affluence_rank: { type: "string" },
                luxury_amenities: { type: "array", items: { type: "string" } }
              }
            },
            spending_capacity: {
              type: "object",
              properties: {
                estimated_liquid_assets: { type: "string" },
                home_equity_position: { type: "string" },
                ability_to_pay: { type: "string", enum: ["high", "medium", "low"] }
              }
            },
            lifestyle_indicators: {
              type: "array",
              items: { type: "string" }
            },
            spending_patterns: {
              type: "object",
              properties: {
                quality_vs_price_preference: { type: "string" },
                premium_likelihood: { type: "string" },
                upsell_potential: { type: "string" },
                discount_expectation: { type: "string" }
              }
            },
            sales_intelligence: {
              type: "object",
              properties: {
                recommended_pricing_strategy: { type: "string" },
                emphasis_points: { type: "array", items: { type: "string" } },
                red_flags: { type: "array", items: { type: "string" } },
                close_probability: { type: "string" }
              }
            }
          }
        }
      });

      setIndicators(result);
      toast.dismiss();
      toast.success("Wealth analysis complete!");
    } catch (error) {
      console.error("Error analyzing wealth:", error);
      toast.dismiss();
      toast.error("Failed to analyze wealth indicators");
    }

    setIsAnalyzing(false);
  };

  const getTierColor = (tier) => {
    if (tier?.includes("Ultra")) return "from-amber-600 to-yellow-500";
    if (tier?.includes("High Net")) return "from-purple-600 to-pink-600";
    if (tier?.includes("Upper")) return "from-blue-600 to-cyan-600";
    return "from-green-600 to-emerald-600";
  };

  const getSignalColor = (signal) => {
    if (signal === "strong") return "bg-green-600";
    if (signal === "moderate") return "bg-amber-600";
    return "bg-slate-600";
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <DollarSign className="w-6 h-6" />
              Wealth & Affluence Analysis
            </CardTitle>
            <p className="text-amber-100 text-sm mt-2">
              AI-powered ability-to-pay assessment
            </p>
          </div>
          <Button
            onClick={analyzeWealth}
            disabled={isAnalyzing}
            className="bg-white text-amber-600 hover:bg-amber-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Analyze Wealth
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!indicators ? (
          <div className="text-center py-16 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl">
            <DollarSign className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Wealth Analysis Yet</h3>
            <p className="text-slate-600 mb-6">
              Click "Analyze Wealth" to assess customer's ability to pay
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Affluence Tier */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-8 bg-gradient-to-r ${getTierColor(indicators.affluence_tier)} text-white rounded-2xl text-center shadow-2xl`}
            >
              <p className="text-sm text-white/80 mb-2">Affluence Classification</p>
              <p className="text-4xl font-bold mb-4">{indicators.affluence_tier}</p>
              <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full">
                <span className="text-lg">Wealth Score:</span>
                <span className="text-3xl font-bold">{indicators.wealth_score}/100</span>
              </div>
            </motion.div>

            {/* Spending Capacity */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 text-center">
                <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-1">Home Equity</p>
                <p className="text-xl font-bold text-slate-900">{indicators.spending_capacity?.home_equity_position}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-300 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-1">Liquid Assets</p>
                <p className="text-xl font-bold text-slate-900">{indicators.spending_capacity?.estimated_liquid_assets}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-1">Ability to Pay</p>
                <Badge className={
                  indicators.spending_capacity?.ability_to_pay === "high" ? "bg-green-600 text-lg px-4 py-1" :
                  indicators.spending_capacity?.ability_to_pay === "medium" ? "bg-amber-600 text-lg px-4 py-1" :
                  "bg-red-600 text-lg px-4 py-1"
                }>
                  {indicators.spending_capacity?.ability_to_pay?.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Property Signals */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-300">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Property-Based Wealth Signals</h3>
              <div className="space-y-3">
                {indicators.property_signals?.map((signal, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{signal.indicator}</h4>
                      <p className="text-sm text-slate-600">{signal.finding}</p>
                    </div>
                    <Badge className={getSignalColor(signal.affluence_signal)}>
                      {signal.affluence_signal}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhood Affluence */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Neighborhood Affluence</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Median Income</p>
                  <p className="text-2xl font-bold text-slate-900">{indicators.neighborhood_affluence?.median_income}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Avg Home Value</p>
                  <p className="text-2xl font-bold text-slate-900">{indicators.neighborhood_affluence?.avg_home_value}</p>
                </div>
                <div className="p-4 bg-white rounded-lg md:col-span-2">
                  <p className="text-sm text-slate-600 mb-2">Affluence Rank</p>
                  <Badge className="bg-indigo-600 text-lg px-4 py-1">{indicators.neighborhood_affluence?.affluence_rank}</Badge>
                </div>
              </div>
              {indicators.neighborhood_affluence?.luxury_amenities && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-sm font-semibold text-slate-900 mb-2">Nearby Luxury Amenities:</p>
                  <div className="flex gap-2 flex-wrap">
                    {indicators.neighborhood_affluence.luxury_amenities.map((amenity, idx) => (
                      <Badge key={idx} variant="outline">{amenity}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lifestyle Indicators */}
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-300">
              <h3 className="text-xl font-bold text-cyan-900 mb-4">Lifestyle Wealth Indicators</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {indicators.lifestyle_indicators?.map((indicator, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg flex items-center gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-sm text-slate-800">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Patterns */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Predicted Spending Patterns</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-slate-600 mb-1">Quality vs. Price</p>
                  <p className="font-semibold text-slate-900">{indicators.spending_patterns?.quality_vs_price_preference}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-slate-600 mb-1">Premium Likelihood</p>
                  <p className="font-semibold text-slate-900">{indicators.spending_patterns?.premium_likelihood}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-slate-600 mb-1">Upsell Potential</p>
                  <p className="font-semibold text-slate-900">{indicators.spending_patterns?.upsell_potential}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-slate-600 mb-1">Discount Expectation</p>
                  <p className="font-semibold text-slate-900">{indicators.spending_patterns?.discount_expectation}</p>
                </div>
              </div>
            </div>

            {/* Sales Intelligence */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">💰 Sales Intelligence</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="font-bold mb-2">Recommended Pricing Strategy</h4>
                  <p className="text-white/90">{indicators.sales_intelligence?.recommended_pricing_strategy}</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="font-bold mb-2">What to Emphasize</h4>
                  <ul className="space-y-1">
                    {indicators.sales_intelligence?.emphasis_points?.map((point, idx) => (
                      <li key={idx} className="text-white/90 text-sm">• {point}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="font-bold mb-2">Close Probability</h4>
                  <p className="text-3xl font-bold">{indicators.sales_intelligence?.close_probability}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}