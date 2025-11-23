import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { TrendingUp, Sparkles, Loader2, Calendar, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function DesignTrendPredictor() {
  const [trends, setTrends] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const predictTrends = async () => {
    setIsPredicting(true);
    toast.loading("Analyzing design platforms for emerging trends...");

    try {
      const prompt = `You are a luxury pool design trend analyst. Research current and emerging pool design trends for 2025-2026.

SOURCES TO ANALYZE:
- Pinterest (top pool design pins, "pool design 2025", "luxury pools")
- Instagram (#luxurypools, #pooldesign, #modernpool - top posts)
- Houzz (trending pool designs, most saved photos)
- Architectural Digest pool features
- Pool & Spa News industry trends

ANALYZE FOR:
1. EMERGING FEATURES (what's gaining traction)
   - New water features
   - Technology integrations
   - Material innovations
   - Lighting trends

2. DECLINING FEATURES (what's becoming dated)
   - Features losing popularity
   - Styles people are moving away from

3. COLOR TRENDS
   - Popular finish colors
   - Tile color palettes
   - Deck materials
   - Landscaping aesthetics

4. DESIGN STYLES
   - Modern minimalist
   - Resort/tropical
   - Mediterranean
   - Natural/organic
   - Contemporary

5. MUST-HAVE FEATURES FOR 2025
   - What buyers expect now
   - Premium add-ons with high ROI

6. REGIONAL PREFERENCES
   - California trends
   - Florida trends
   - Southwest trends
   - How they differ

7. INSTAGRAM/PINTEREST STATS
   - Most saved pool designs
   - Hashtag growth rates
   - Influencer recommendations

Provide actionable insights Timeless Pools can use to stay ahead of competitors.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            emerging_features: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  feature: { type: "string" },
                  growth_rate: { type: "string" },
                  why_trending: { type: "string" },
                  implementation_cost: { type: "string" },
                  roi_potential: { type: "string" }
                }
              }
            },
            declining_features: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  feature: { type: "string" },
                  reason: { type: "string" }
                }
              }
            },
            color_trends: {
              type: "object",
              properties: {
                finishes: { type: "array", items: { type: "string" } },
                tiles: { type: "array", items: { type: "string" } },
                decking: { type: "array", items: { type: "string" } }
              }
            },
            top_styles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  style: { type: "string" },
                  popularity: { type: "string" },
                  target_demographic: { type: "string" }
                }
              }
            },
            must_haves_2025: {
              type: "array",
              items: { type: "string" }
            },
            regional_insights: {
              type: "object",
              properties: {
                california: { type: "string" },
                florida: { type: "string" },
                southwest: { type: "string" }
              }
            },
            social_stats: {
              type: "object",
              properties: {
                pinterest_top_searches: { type: "array", items: { type: "string" } },
                instagram_trending_hashtags: { type: "array", items: { type: "string" } },
                most_saved_styles: { type: "array", items: { type: "string" } }
              }
            },
            timeless_recommendations: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setTrends(result);
      toast.dismiss();
      toast.success("Design trends analyzed!");
    } catch (error) {
      console.error("Error predicting trends:", error);
      toast.dismiss();
      toast.error("Failed to analyze trends");
    }

    setIsPredicting(false);
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6" />
              AI Design Trend Predictor
            </CardTitle>
            <p className="text-fuchsia-100 text-sm mt-2">
              Stay ahead of the market with Pinterest, Instagram & Houzz insights
            </p>
          </div>
          <Button
            onClick={predictTrends}
            disabled={isPredicting}
            className="bg-white text-fuchsia-600 hover:bg-fuchsia-50"
          >
            {isPredicting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Predict Trends
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!trends ? (
          <div className="text-center py-16 bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-2xl">
            <Sparkles className="w-16 h-16 text-fuchsia-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Trend Analysis Yet</h3>
            <p className="text-slate-600 mb-6">
              Click "Predict Trends" to analyze Pinterest, Instagram, and Houzz
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Must-Haves for 2025 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-300"
            >
              <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Must-Have Features for 2025
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {trends.must_haves_2025?.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg"
                  >
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-slate-800 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Emerging Features */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-300">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">🚀 Emerging Features (Capitalize Now)</h3>
              <div className="space-y-4">
                {trends.emerging_features?.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border-2 border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg text-slate-900">{item.feature}</h4>
                      <Badge className="bg-green-600">{item.growth_rate}</Badge>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{item.why_trending}</p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Cost: {item.implementation_cost}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-600">ROI: {item.roi_potential}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Declining Features */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">📉 Declining Features (Avoid)</h3>
              <div className="space-y-3">
                {trends.declining_features?.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.feature}</h4>
                      <p className="text-sm text-slate-600">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Trends */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">🎨 Color Trends 2025</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Pool Finishes</h4>
                  <div className="space-y-1">
                    {trends.color_trends?.finishes?.map((color, idx) => (
                      <Badge key={idx} className="bg-purple-600 mr-2">{color}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Tiles</h4>
                  <div className="space-y-1">
                    {trends.color_trends?.tiles?.map((color, idx) => (
                      <Badge key={idx} className="bg-blue-600 mr-2">{color}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Decking</h4>
                  <div className="space-y-1">
                    {trends.color_trends?.decking?.map((color, idx) => (
                      <Badge key={idx} className="bg-slate-600 mr-2">{color}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Styles */}
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-300">
              <h3 className="text-2xl font-bold text-cyan-900 mb-4">🏆 Top Design Styles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {trends.top_styles?.map((style, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900">{style.style}</h4>
                      <Badge className="bg-cyan-600">{style.popularity}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">Target: {style.target_demographic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Insights */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">🗺️ Regional Preferences</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-bold text-indigo-900 mb-2">🌴 California</h4>
                  <p className="text-sm text-slate-700">{trends.regional_insights?.california}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-bold text-indigo-900 mb-2">🏖️ Florida</h4>
                  <p className="text-sm text-slate-700">{trends.regional_insights?.florida}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-bold text-indigo-900 mb-2">🌵 Southwest</h4>
                  <p className="text-sm text-slate-700">{trends.regional_insights?.southwest}</p>
                </div>
              </div>
            </div>

            {/* Social Media Stats */}
            <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border-2 border-rose-300">
              <h3 className="text-2xl font-bold text-rose-900 mb-4">📱 Social Media Intelligence</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-rose-800 mb-2">Pinterest Top Searches</h4>
                  <ul className="space-y-1 text-sm">
                    {trends.social_stats?.pinterest_top_searches?.map((search, idx) => (
                      <li key={idx} className="text-slate-700">• {search}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-rose-800 mb-2">Instagram Trending</h4>
                  <div className="space-y-1">
                    {trends.social_stats?.instagram_trending_hashtags?.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="mr-1 text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-rose-800 mb-2">Most Saved Styles</h4>
                  <ul className="space-y-1 text-sm">
                    {trends.social_stats?.most_saved_styles?.map((style, idx) => (
                      <li key={idx} className="text-slate-700">• {style}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeless Pools Recommendations */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ArrowRight className="w-6 h-6" />
                Actionable Recommendations for Timeless Pools
              </h3>
              <div className="space-y-3">
                {trends.timeless_recommendations?.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-7 h-7 bg-white text-slate-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-white">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}