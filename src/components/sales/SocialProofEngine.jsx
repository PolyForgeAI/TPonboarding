import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Award, Star, Users, TrendingUp, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SocialProofEngine({ submission }) {
  const [proofs, setProofs] = useState(null);
  const [isGathering, setIsGathering] = useState(false);

  const gatherSocialProof = async () => {
    setIsGathering(true);
    toast.loading("Gathering social proof for this customer...");

    try {
      const prompt = `Gather powerful social proof to help close this pool sale.

CUSTOMER LOCATION: ${submission.property_city}, ${submission.property_state}
CUSTOMER PROPERTY VALUE: ${submission.property_data?.estimated_value || "Unknown"}
CUSTOMER BUDGET: ${submission.budget_range}

FIND AND ANALYZE:

1. NEARBY PROJECTS:
   - Find Timeless Pools projects within 5-10 miles
   - Similar property values
   - Similar budgets
   - Before/after transformations

2. CUSTOMER REVIEWS:
   - Google reviews (5-star reviews, specific quotes)
   - Houzz reviews and photos
   - Testimonials mentioning quality, process, results
   - Recent reviews (last 12 months)

3. AWARDS & CERTIFICATIONS:
   - GENESIS Certified Master details
   - World's Greatest Pools Award Winner
   - Elite Pebble Tec Builder status
   - Other industry recognition

4. PROJECT COMPLETION STATS:
   - Total pools built
   - Years in business
   - On-time completion rate
   - Customer satisfaction rate

5. MEDIA MENTIONS:
   - Magazine features
   - TV appearances
   - Industry publications
   - Social media following

6. NEIGHBORHOOD PENETRATION:
   - How many pools in their neighborhood?
   - What % are Timeless Pools projects?
   - Neighbor recommendations

Return data optimized for sales conversations.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            nearby_projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  distance: { type: "string" },
                  address: { type: "string" },
                  project_value: { type: "string" },
                  testimonial: { type: "string" },
                  features: { type: "array", items: { type: "string" } }
                }
              }
            },
            top_reviews: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  platform: { type: "string" },
                  rating: { type: "number" },
                  reviewer_name: { type: "string" },
                  quote: { type: "string" },
                  date: { type: "string" }
                }
              }
            },
            certifications: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  significance: { type: "string" }
                }
              }
            },
            company_stats: {
              type: "object",
              properties: {
                pools_built: { type: "number" },
                years_in_business: { type: "number" },
                avg_rating: { type: "number" },
                total_reviews: { type: "number" },
                on_time_completion: { type: "string" }
              }
            },
            media_mentions: {
              type: "array",
              items: { type: "string" }
            },
            neighborhood_stats: {
              type: "object",
              properties: {
                total_pools_in_area: { type: "number" },
                timeless_pools_in_area: { type: "number" },
                market_share: { type: "string" }
              }
            }
          }
        }
      });

      setProofs(result);
      toast.dismiss();
      toast.success("Social proof gathered!");
    } catch (error) {
      console.error("Error gathering social proof:", error);
      toast.dismiss();
      toast.error("Failed to gather social proof");
    }

    setIsGathering(false);
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Award className="w-6 h-6" />
              Social Proof Engine
            </CardTitle>
            <p className="text-indigo-100 text-sm mt-2">
              Build trust with data-driven credibility
            </p>
          </div>
          <Button
            onClick={gatherSocialProof}
            disabled={isGathering}
            className="bg-white text-indigo-600 hover:bg-indigo-50"
          >
            {isGathering ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gathering...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Gather Proof
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!proofs ? (
          <div className="text-center py-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
            <Award className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Social Proof Gathered Yet</h3>
            <p className="text-slate-600 mb-6">
              Click "Gather Proof" to collect powerful credibility signals
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Company Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 text-center"
              >
                <div className="text-4xl font-bold text-green-700 mb-1">
                  {proofs.company_stats?.pools_built}+
                </div>
                <p className="text-sm text-slate-600">Pools Built</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 text-center"
              >
                <div className="text-4xl font-bold text-blue-700 mb-1 flex items-center justify-center gap-1">
                  {proofs.company_stats?.avg_rating}
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-sm text-slate-600">Average Rating</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 text-center"
              >
                <div className="text-4xl font-bold text-purple-700 mb-1">
                  {proofs.company_stats?.years_in_business}+
                </div>
                <p className="text-sm text-slate-600">Years Excellence</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 text-center"
              >
                <div className="text-4xl font-bold text-amber-700 mb-1">
                  {proofs.company_stats?.on_time_completion}
                </div>
                <p className="text-sm text-slate-600">On-Time Rate</p>
              </motion.div>
            </div>

            {/* Nearby Projects */}
            {proofs.nearby_projects && proofs.nearby_projects.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Projects Near You
                </h3>
                <div className="space-y-3">
                  {proofs.nearby_projects.slice(0, 3).map((project, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge className="bg-cyan-600 mb-2">{project.distance} away</Badge>
                          <p className="text-sm text-slate-600">{project.address}</p>
                        </div>
                        <Badge variant="outline">{project.project_value}</Badge>
                      </div>
                      <p className="text-sm text-slate-700 italic">"{project.testimonial}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Reviews */}
            {proofs.top_reviews && proofs.top_reviews.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  What Customers Say
                </h3>
                <div className="space-y-4">
                  {proofs.top_reviews.slice(0, 3).map((review, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-white rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-600">
                            {review.rating} ⭐
                          </Badge>
                          <span className="text-sm font-semibold text-slate-900">{review.reviewer_name}</span>
                        </div>
                        <span className="text-xs text-slate-500">{review.platform}</span>
                      </div>
                      <p className="text-sm text-slate-700 italic leading-relaxed">
                        "{review.quote}"
                      </p>
                      <p className="text-xs text-slate-500 mt-2">{review.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {proofs.certifications && proofs.certifications.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Industry Recognition
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {proofs.certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">{cert.name}</h4>
                      <p className="text-sm text-slate-600">{cert.significance}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Neighborhood Stats */}
            {proofs.neighborhood_stats && (
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Your Neighborhood Trusts Us
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-700">
                      {proofs.neighborhood_stats.timeless_pools_in_area}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">Timeless Pools</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg text-center">
                    <p className="text-3xl font-bold text-slate-700">
                      {proofs.neighborhood_stats.total_pools_in_area}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">Total Pools</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-700">
                      {proofs.neighborhood_stats.market_share}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">Market Share</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}