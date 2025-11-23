import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { MapPin, Target, TrendingUp, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function NeighborhoodMapper() {
  const [location, setLocation] = useState("");
  const [mapData, setMapData] = useState(null);
  const [isMapping, setIsMapping] = useState(false);

  const mapNeighborhood = async () => {
    if (!location) {
      toast.error("Please enter a location");
      return;
    }

    setIsMapping(true);
    toast.loading("Mapping neighborhood pools...");

    try {
      const prompt = `Create a comprehensive pool market map for: ${location}

OBJECTIVES:
1. Find all properties with pools in this area
2. Identify properties WITHOUT pools (target prospects)
3. Estimate property values for targeting
4. Identify Timeless Pools projects vs competitors

RESEARCH STEPS:

1. POOL INVENTORY:
   - Total homes in area
   - Homes with pools (estimate from aerial/satellite imagery)
   - Homes without pools (prospects)
   - Pool penetration rate (%)

2. PROPERTY VALUE ANALYSIS:
   - Find homes $500k+ (luxury tier)
   - Find homes $750k+ (premium tier)
   - Find homes $1M+ (ultra-premium tier)
   - Average lot sizes by tier

3. COMPETITOR ANALYSIS:
   - Which builders have projects here?
   - Quality indicators from aerial views
   - Estimated age of pools (older = remodel opportunity)

4. TARGET PROSPECTS:
   - High-value homes WITHOUT pools
   - Recent home sales (new owners = opportunity)
   - Large lots suitable for pools
   - Neighborhoods with high pool density (social proof)

5. TIMELESS POOLS PRESENCE:
   - Do we have projects in this area?
   - Neighbor testimonials available?
   - Market share estimate

6. MARKETING INSIGHTS:
   - Best streets/neighborhoods to target
   - Property owner demographics
   - Expected budget ranges
   - Best time to approach (seasonal)

Provide actionable prospecting intelligence.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            area_stats: {
              type: "object",
              properties: {
                total_homes: { type: "number" },
                homes_with_pools: { type: "number" },
                homes_without_pools: { type: "number" },
                pool_penetration_rate: { type: "string" }
              }
            },
            property_tiers: {
              type: "object",
              properties: {
                luxury_500k_plus: { type: "number" },
                premium_750k_plus: { type: "number" },
                ultra_premium_1m_plus: { type: "number" }
              }
            },
            target_prospects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  address: { type: "string" },
                  estimated_value: { type: "string" },
                  lot_size: { type: "string" },
                  why_good_prospect: { type: "string" },
                  expected_budget: { type: "string" }
                }
              }
            },
            competitor_presence: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  builder: { type: "string" },
                  estimated_projects: { type: "number" }
                }
              }
            },
            timeless_presence: {
              type: "object",
              properties: {
                projects_in_area: { type: "number" },
                market_share: { type: "string" },
                neighbor_testimonials_available: { type: "boolean" }
              }
            },
            best_streets_to_target: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  street_name: { type: "string" },
                  avg_home_value: { type: "string" },
                  pool_penetration: { type: "string" },
                  prospects_count: { type: "number" }
                }
              }
            },
            remodel_opportunities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  address: { type: "string" },
                  estimated_pool_age: { type: "string" },
                  remodel_potential: { type: "string" }
                }
              }
            },
            marketing_strategy: {
              type: "object",
              properties: {
                best_approach: { type: "string" },
                expected_response_rate: { type: "string" },
                optimal_timing: { type: "string" },
                messaging_recommendations: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      });

      setMapData(result);
      toast.dismiss();
      toast.success("Neighborhood mapped successfully!");
    } catch (error) {
      console.error("Error mapping neighborhood:", error);
      toast.dismiss();
      toast.error("Failed to map neighborhood");
    }

    setIsMapping(false);
  };

  const exportProspects = () => {
    if (!mapData?.target_prospects) return;

    const csv = [
      ["Address", "Estimated Value", "Lot Size", "Why Good Prospect", "Expected Budget"],
      ...mapData.target_prospects.map(p => [
        p.address,
        p.estimated_value,
        p.lot_size,
        p.why_good_prospect,
        p.expected_budget
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prospects-${location.replace(/[^a-z0-9]/gi, '-')}.csv`;
    a.click();
    toast.success("Prospects exported!");
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="w-6 h-6" />
          Neighborhood Pool Mapping
        </CardTitle>
        <p className="text-teal-100 text-sm mt-2">
          Find every prospect in any neighborhood
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter neighborhood, city, or ZIP code..."
            className="flex-1 text-base"
            onKeyDown={(e) => e.key === "Enter" && mapNeighborhood()}
          />
          <Button
            onClick={mapNeighborhood}
            disabled={isMapping || !location}
            className="bg-gradient-to-r from-teal-600 to-emerald-600"
          >
            {isMapping ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mapping...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                Map Area
              </>
            )}
          </Button>
        </div>

        {!mapData ? (
          <div className="text-center py-16 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl">
            <MapPin className="w-16 h-16 text-teal-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Map Data Yet</h3>
            <p className="text-slate-600 mb-6">
              Enter a location to map pools and find prospects
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Area Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-4 gap-4"
            >
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 text-center">
                <p className="text-sm text-slate-600 mb-1">Total Homes</p>
                <p className="text-4xl font-bold text-slate-900">{mapData.area_stats?.total_homes}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 text-center">
                <p className="text-sm text-slate-600 mb-1">With Pools</p>
                <p className="text-4xl font-bold text-slate-900">{mapData.area_stats?.homes_with_pools}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 text-center">
                <p className="text-sm text-slate-600 mb-1">Prospects</p>
                <p className="text-4xl font-bold text-slate-900">{mapData.area_stats?.homes_without_pools}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 text-center">
                <p className="text-sm text-slate-600 mb-1">Penetration</p>
                <p className="text-4xl font-bold text-slate-900">{mapData.area_stats?.pool_penetration_rate}</p>
              </div>
            </motion.div>

            {/* Property Tiers */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">🏡 Property Value Tiers</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <Badge className="bg-blue-600 mb-2">Luxury $500k+</Badge>
                  <p className="text-3xl font-bold text-slate-900">{mapData.property_tiers?.luxury_500k_plus}</p>
                  <p className="text-sm text-slate-600 mt-1">homes</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <Badge className="bg-purple-600 mb-2">Premium $750k+</Badge>
                  <p className="text-3xl font-bold text-slate-900">{mapData.property_tiers?.premium_750k_plus}</p>
                  <p className="text-sm text-slate-600 mt-1">homes</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <Badge className="bg-amber-600 mb-2">Ultra $1M+</Badge>
                  <p className="text-3xl font-bold text-slate-900">{mapData.property_tiers?.ultra_premium_1m_plus}</p>
                  <p className="text-sm text-slate-600 mt-1">homes</p>
                </div>
              </div>
            </div>

            {/* Target Prospects */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-900 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  High-Priority Prospects
                </h3>
                <Button onClick={exportProspects} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              <div className="space-y-3">
                {mapData.target_prospects?.slice(0, 10).map((prospect, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg border-2 border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">{prospect.address}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{prospect.estimated_value}</Badge>
                          <Badge variant="outline">{prospect.lot_size}</Badge>
                        </div>
                      </div>
                      <Badge className="bg-green-600">{prospect.expected_budget}</Badge>
                    </div>
                    <p className="text-sm text-slate-700">{prospect.why_good_prospect}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Streets */}
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-300">
              <h3 className="text-xl font-bold text-cyan-900 mb-4">🎯 Best Streets to Target</h3>
              <div className="space-y-3">
                {mapData.best_streets_to_target?.map((street, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{street.street_name}</h4>
                      <p className="text-sm text-slate-600">
                        Avg Value: {street.avg_home_value} • Pool Rate: {street.pool_penetration}
                      </p>
                    </div>
                    <Badge className="bg-cyan-600">{street.prospects_count} prospects</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Remodel Opportunities */}
            {mapData.remodel_opportunities && mapData.remodel_opportunities.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300">
                <h3 className="text-xl font-bold text-amber-900 mb-4">🔄 Pool Remodel Opportunities</h3>
                <div className="space-y-3">
                  {mapData.remodel_opportunities.slice(0, 5).map((opp, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-900">{opp.address}</h4>
                        <Badge variant="outline">{opp.estimated_pool_age} old</Badge>
                      </div>
                      <p className="text-sm text-slate-700">{opp.remodel_potential}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Marketing Strategy */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Marketing Strategy for This Area
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="font-bold mb-2">Best Approach</h4>
                  <p className="text-white/90">{mapData.marketing_strategy?.best_approach}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h4 className="font-bold mb-2">Expected Response Rate</h4>
                    <p className="text-2xl font-bold">{mapData.marketing_strategy?.expected_response_rate}</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h4 className="font-bold mb-2">Optimal Timing</h4>
                    <p className="text-lg">{mapData.marketing_strategy?.optimal_timing}</p>
                  </div>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="font-bold mb-3">Messaging Recommendations</h4>
                  <ul className="space-y-2">
                    {mapData.marketing_strategy?.messaging_recommendations?.map((msg, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/90">
                        <span className="text-emerald-400">✓</span>
                        <span>{msg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Market Share */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-purple-900 mb-3">Timeless Pools Presence</h4>
                <div className="space-y-2">
                  <p className="text-sm text-slate-700">
                    Projects in Area: <strong>{mapData.timeless_presence?.projects_in_area}</strong>
                  </p>
                  <p className="text-sm text-slate-700">
                    Market Share: <strong>{mapData.timeless_presence?.market_share}</strong>
                  </p>
                  <p className="text-sm text-slate-700">
                    Testimonials Available: <strong>{mapData.timeless_presence?.neighbor_testimonials_available ? "Yes" : "No"}</strong>
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border-2 border-red-200">
                <h4 className="font-bold text-red-900 mb-3">Competitor Presence</h4>
                <div className="space-y-2">
                  {mapData.competitor_presence?.map((comp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">{comp.builder}</span>
                      <Badge variant="outline">{comp.estimated_projects} projects</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}