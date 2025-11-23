import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Search, TrendingDown, TrendingUp, AlertTriangle, Target, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CompetitorAnalysis({ location }) {
  const [competitors, setCompetitors] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [yourStrengths, setYourStrengths] = useState([]);
  const [theirWeaknesses, setTheirWeaknesses] = useState([]);

  const analyzeCompetitors = async () => {
    setIsAnalyzing(true);
    toast.loading("Analyzing local pool builders...");

    try {
      const prompt = `Deep competitive analysis of pool builders in ${location.city}, ${location.state}.

RESEARCH OBJECTIVES:
1. Find top 5-10 local pool builders (competitors to Timeless Pools)
2. Analyze their websites, pricing, offerings, reviews
3. Identify gaps in their service
4. Find competitive advantages for Timeless Pools

For each competitor, research:
- Company name & website
- Years in business
- Price range (if available)
- Design styles offered
- Materials used (do they use Pebble Tec, Jandy equipment?)
- Customer reviews (Google, Yelp, Houzz)
- Average rating
- Common complaints in reviews
- Services they DON'T offer
- Response time
- Website quality
- Social media presence

COMPETITIVE ADVANTAGES:
Identify what makes Timeless Pools SUPERIOR:
- GENESIS Certified Master (do competitors have this?)
- World's Greatest Pools Award Winner
- Elite Pebble Tec Builder status
- Timeless methodology (intentional design, lines of sight, traffic flow)
- 3 locations (Orange County, Utah, Cabo)
- Premium materials (Jandy/Fluidra exclusive)
- AI-powered design dossiers

THEIR WEAKNESSES:
What are competitors doing WRONG that we can exploit?
- Slow response times
- Poor design processes
- Low-quality materials
- Bad reviews about X
- No modern technology
- Generic designs

Return comprehensive competitive intelligence.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            competitors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  website: { type: "string" },
                  years_in_business: { type: "string" },
                  price_range: { type: "string" },
                  avg_rating: { type: "number" },
                  review_count: { type: "number" },
                  strengths: { type: "array", items: { type: "string" } },
                  weaknesses: { type: "array", items: { type: "string" } },
                  common_complaints: { type: "array", items: { type: "string" } },
                  materials_used: { type: "string" },
                  certifications: { type: "array", items: { type: "string" } },
                  services_missing: { type: "array", items: { type: "string" } }
                }
              }
            },
            timeless_advantages: {
              type: "array",
              items: { type: "string" }
            },
            competitor_weaknesses_to_exploit: {
              type: "array",
              items: { type: "string" }
            },
            pricing_strategy: { type: "string" },
            market_positioning: { type: "string" }
          }
        }
      });

      setCompetitors(result.competitors || []);
      setYourStrengths(result.timeless_advantages || []);
      setTheirWeaknesses(result.competitor_weaknesses_to_exploit || []);

      toast.dismiss();
      toast.success(`Analyzed ${result.competitors?.length || 0} competitors`);
    } catch (error) {
      console.error("Error analyzing competitors:", error);
      toast.dismiss();
      toast.error("Failed to analyze competitors");
    }

    setIsAnalyzing(false);
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="w-6 h-6" />
              Competitive Intelligence
            </CardTitle>
            <p className="text-slate-300 text-sm mt-2">
              Know your competition better than they know themselves
            </p>
          </div>
          <Button
            onClick={analyzeCompetitors}
            disabled={isAnalyzing}
            className="bg-white text-slate-900 hover:bg-slate-100"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Market
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {competitors.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
            <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Analysis Yet</h3>
            <p className="text-slate-600 mb-6">
              Click "Analyze Market" to research local competitors
            </p>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="advantages">Your Edge</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <p className="text-sm text-slate-600 mb-1">Competitors Found</p>
                  <p className="text-4xl font-bold text-slate-900">{competitors.length}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <p className="text-sm text-slate-600 mb-1">Your Advantages</p>
                  <p className="text-4xl font-bold text-slate-900">{yourStrengths.length}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                  <p className="text-sm text-slate-600 mb-1">Their Weaknesses</p>
                  <p className="text-4xl font-bold text-slate-900">{theirWeaknesses.length}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {competitors.slice(0, 4).map((comp, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-slate-900">{comp.name}</h4>
                      <Badge className="bg-slate-900">{comp.avg_rating}⭐</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{comp.price_range}</p>
                    <div className="flex gap-2 flex-wrap">
                      {comp.weaknesses?.slice(0, 2).map((weak, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {weak}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              {competitors.map((comp, idx) => (
                <div key={idx} className="p-6 bg-white rounded-xl border-2 border-slate-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{comp.name}</h3>
                      <a href={comp.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        {comp.website}
                      </a>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{comp.avg_rating}⭐</div>
                      <p className="text-sm text-slate-600">{comp.review_count} reviews</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Price Range</p>
                      <p className="font-semibold text-slate-900">{comp.price_range}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Experience</p>
                      <p className="font-semibold text-slate-900">{comp.years_in_business}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Their Strengths
                      </h4>
                      <ul className="space-y-1">
                        {comp.strengths?.map((str, i) => (
                          <li key={i} className="text-sm text-slate-700">• {str}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Their Weaknesses
                      </h4>
                      <ul className="space-y-1">
                        {comp.weaknesses?.map((weak, i) => (
                          <li key={i} className="text-sm text-slate-700">• {weak}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {comp.common_complaints && comp.common_complaints.length > 0 && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <h4 className="font-semibold text-amber-900 mb-2">Common Customer Complaints:</h4>
                      <ul className="space-y-1">
                        {comp.common_complaints.map((complaint, i) => (
                          <li key={i} className="text-sm text-amber-800">⚠️ {complaint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="advantages" className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300">
                <h3 className="text-2xl font-bold text-green-900 mb-4">Timeless Pools Competitive Advantages</h3>
                <div className="space-y-3">
                  {yourStrengths.map((strength, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-slate-800 font-medium">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-red-300">
                <h3 className="text-2xl font-bold text-red-900 mb-4">Competitor Weaknesses to Exploit</h3>
                <div className="space-y-3">
                  {theirWeaknesses.map((weakness, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <p className="text-slate-800 font-medium">{weakness}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strategy">
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">💡 Recommended Sales Strategies</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">1. Lead with Technology</h4>
                      <p className="text-sm text-slate-700">
                        Competitors are using pen & paper. You have AI-powered dossiers worth $10k+. 
                        Make this a centerpiece of your pitch.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">2. Emphasize Certifications</h4>
                      <p className="text-sm text-slate-700">
                        GENESIS Certified Master + World's Greatest Pools Award = unmatched credibility. 
                        Most competitors lack these credentials.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">3. Premium Materials = Premium Results</h4>
                      <p className="text-sm text-slate-700">
                        Exclusive use of Jandy/Fluidra equipment and Pebble Tec finishes. 
                        Competitors often use cheaper alternatives.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">4. Address Their Complaints</h4>
                      <p className="text-sm text-slate-700">
                        Common competitor issues: slow responses, poor communication, cost overruns. 
                        Highlight your transparency and process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}