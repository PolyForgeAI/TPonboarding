import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { 
  Lightbulb, TrendingUp, DollarSign, Users, Target, 
  Award, Shield, Zap, CheckCircle
} from "lucide-react";

export default function StrategicVision() {
  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
            STRATEGIC VISION - REVISIT LATER
          </Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            The Complete Strategic Roadmap
          </h1>
          <p className="text-xl text-slate-600">
            All strategic ideas, business models, and execution plans consolidated for future reference.
          </p>
        </div>

        {/* Brand Strategy */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Award className="w-8 h-8" />
              Brand Strategy: CREST
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Why "Crest"?</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Wave crest</strong> = water reference (pool industry)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Peak/crest</strong> = highest point (excellence)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Coat of arms crest</strong> = prestige, heritage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Short, memorable, strong</strong> (one syllable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Professional</strong> (not generic like "ProBuilder" or "PoolScape")</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-300">
                <h4 className="font-bold text-blue-900 mb-3">Tagline Options:</h4>
                <ul className="space-y-2 text-blue-800">
                  <li>• "Crest: Where Elite Builders Rise"</li>
                  <li>• "Crest: Peak Pool Business Platform"</li>
                  <li>• "Crest: Built for Builders Who Build Dreams"</li>
                </ul>
              </div>

              <div className="p-6 bg-amber-50 rounded-xl border-2 border-amber-300">
                <h4 className="font-bold text-amber-900 mb-3">⚠️ Genesis Branding Guidelines:</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-green-800">✅ What We CAN Say:</strong>
                    <ul className="mt-2 space-y-1 text-amber-800 text-sm">
                      <li>• "Created by a Genesis Master Certified builder"</li>
                      <li>• "Built using Genesis intentional design methodology"</li>
                      <li>• "Developed by Timeless Pools, a Genesis Master"</li>
                      <li>• "Inspired by Genesis principles"</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-red-800">❌ What We CAN'T Say:</strong>
                    <ul className="mt-2 space-y-1 text-amber-800 text-sm">
                      <li>• "Genesis-approved platform"</li>
                      <li>• "Official Genesis software"</li>
                      <li>• "Endorsed by Genesis"</li>
                      <li>• Use Genesis logo without permission</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Model */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-3xl flex items-center gap-3">
              <DollarSign className="w-8 h-8" />
              Freemium B2B2C Model (Genius Distribution)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">How It Works:</h3>
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
                  <p className="text-green-900 font-semibold mb-4">
                    "As a Fluidra partner, you get Crest Basic FREE. This includes our revolutionary 
                    Genesis Project Dossier, website, lead management, and more."
                  </p>
                  <p className="text-green-800">
                    Builders can upgrade to Professional ($2,997/mo) or Elite ($7,997/mo) for advanced features.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Revenue Streams:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3">1. Fluidra Pays Us (Wholesale)</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>• $697/month per active builder for Crest Basic</li>
                      <li>• White-label platform with Fluidra co-branding</li>
                      <li>• Fluidra equipment catalog integrated</li>
                      <li>• Every dossier recommends Fluidra products</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-300">
                    <h4 className="font-bold text-purple-900 mb-3">2. Builders Pay Us (Direct)</h4>
                    <ul className="space-y-2 text-purple-800 text-sm">
                      <li>• Professional tier: $2,997/month</li>
                      <li>• Elite tier: $7,997/month</li>
                      <li>• We keep 100% of upgrade revenue</li>
                      <li>• Fluidra gets builder performance data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">3-Tier Structure:</h3>
                <div className="space-y-4">
                  <TierSummary
                    name="Crest Basic"
                    price="FREE (Fluidra pays $697/mo)"
                    color="green"
                    features={[
                      "1 website template (Fluidra co-branded)",
                      "Genesis Project Dossier (5 per month)",
                      "Lead capture forms + Basic CRM",
                      "Fluidra product catalog integration",
                      "'Powered by Fluidra' branding",
                      "Basic email sequences (3)",
                      "Construction portal (basic)"
                    ]}
                  />
                  <TierSummary
                    name="Crest Professional"
                    price="$2,997/month (builder pays)"
                    color="blue"
                    features={[
                      "Unlimited Genesis Dossiers",
                      "3 website templates",
                      "Google Ads automation",
                      "SEO tools",
                      "10 email sequences",
                      "Social media automation",
                      "Review automation",
                      "Advanced analytics",
                      "Optional white-label"
                    ]}
                  />
                  <TierSummary
                    name="Crest Elite"
                    price="$7,997/month (builder pays)"
                    color="purple"
                    features={[
                      "Everything in Professional",
                      "Stock content library (100 photos, 20 videos)",
                      "Print collateral templates",
                      "Multi-location support",
                      "Custom integrations (QuickBooks, BuilderTrend)",
                      "24/7 priority support",
                      "Dedicated account manager",
                      "Quarterly strategy sessions"
                    ]}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Projections */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardTitle className="text-3xl flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              Revenue Projections (Freemium Model)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <RevenueMilestone
                period="Month 6 (Conservative)"
                fluidra={{ builders: 100, revenue: 69700 }}
                professional={{ count: 15, revenue: 44955 }}
                elite={{ count: 5, revenue: 39985 }}
                total={{ mrr: 154640, arr: 1855680 }}
              />
              <RevenueMilestone
                period="Month 12 (Growth)"
                fluidra={{ builders: 250, revenue: 174250 }}
                professional={{ count: 50, revenue: 149850 }}
                elite={{ count: 20, revenue: 159940 }}
                total={{ mrr: 484040, arr: 5808480 }}
              />
              <RevenueMilestone
                period="Month 24 (Scale)"
                fluidra={{ builders: 500, revenue: 348500 }}
                professional={{ count: 125, revenue: 374625 }}
                elite={{ count: 60, revenue: 479820 }}
                total={{ mrr: 1202945, arr: 14435340 }}
              />
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-4 border-amber-500">
                <h4 className="text-2xl font-bold text-amber-900 mb-2">Exit Valuation (Month 24)</h4>
                <div className="text-5xl font-bold text-amber-600">$100-150M</div>
                <p className="text-amber-800 mt-2">(7-10x ARR multiple for hybrid SaaS + services)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fluidra Partnership Terms */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Fluidra Partnership Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">What Fluidra Gets:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Competitive advantage:</strong> "Join Fluidra, get Crest free"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Equipment sales intelligence:</strong> Track which products recommended</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Builder performance data:</strong> Know who's scaling (upgrade tracking)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Brand integration:</strong> Every dossier shows Fluidra equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Acquisition target:</strong> $100-150M in 24 months</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">What We Get:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Instant distribution:</strong> 500+ elite builders access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Guaranteed revenue:</strong> $697/mo × 100 builders = $69,700 base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Credibility:</strong> "Official Fluidra platform" positioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Real usage data:</strong> 100+ builders for rapid product development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Exit path:</strong> Clear acquisition target (Fluidra or competitors)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 12-Week Execution Plan */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Target className="w-8 h-8" />
              12-Week Execution Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              <WeekSummary week="1-2" focus="Crest Basic MVP" outcome="Basic tier ready for Fluidra pilot" />
              <WeekSummary week="3-4" focus="Usage Limits + Upgrade Prompts" outcome="Monetization mechanics in place" />
              <WeekSummary week="5-6" focus="Professional Tier Features" outcome="Professional tier ready to sell" />
              <WeekSummary week="7-8" focus="Elite Tier Features" outcome="Elite tier ready" />
              <WeekSummary week="9-10" focus="Fluidra Integration Polish" outcome="Fluidra sees strategic value" />
              <WeekSummary week="11-12" focus="Pilot + Proof" outcome="Ready for partnership announcement" />
            </div>
          </CardContent>
        </Card>

        {/* The Pitch */}
        <Card className="shadow-floating border-4 border-purple-500">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Lightbulb className="w-8 h-8" />
              The Pitch to Fluidra (Week 8)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="p-8 bg-slate-50 rounded-xl border-2 border-slate-300 font-mono text-sm space-y-4">
              <p className="text-slate-900 font-semibold text-lg">"We've built Crest—a platform that makes your elite builders unstoppable."</p>
              
              <div>
                <strong className="text-purple-900">WHAT IT IS:</strong>
                <p className="text-slate-700 mt-1">A complete business platform for pool builders: Genesis Project Dossier (3D pool design), automated marketing, lead management, construction tracking—all integrated with YOUR product catalog.</p>
              </div>

              <div>
                <strong className="text-purple-900">THE BUSINESS MODEL:</strong>
                <ul className="list-disc list-inside text-slate-700 mt-1 space-y-1">
                  <li>You give Crest Basic FREE to all ProEdge members</li>
                  <li>You pay us $697/month per active builder</li>
                  <li>Builders upgrade to Professional ($2,997) or Elite ($7,997)</li>
                  <li>We keep upgrade revenue, you get strategic data</li>
                </ul>
              </div>

              <div>
                <strong className="text-purple-900">YOUR BENEFITS:</strong>
                <ul className="list-disc list-inside text-slate-700 mt-1 space-y-1">
                  <li>Competitive advantage ("Join Fluidra, get Crest free")</li>
                  <li>More pools built = more equipment sold</li>
                  <li>Every dossier recommends Fluidra products</li>
                  <li>Data on builder performance + product demand</li>
                  <li>Lock builders into Fluidra ecosystem</li>
                  <li>Potential acquisition target ($100M+ in 24 months)</li>
                </ul>
              </div>

              <div>
                <strong className="text-purple-900">THE PROOF (10 pilots):</strong>
                <ul className="list-disc list-inside text-slate-700 mt-1 space-y-1">
                  <li>150+ Genesis Dossiers created in 60 days</li>
                  <li>25% of pilots upgraded to paid tiers</li>
                  <li>Average builder generated 40+ qualified leads</li>
                  <li>$250k+ in equipment sales tracked</li>
                </ul>
              </div>

              <div>
                <strong className="text-purple-900">THE ASK:</strong>
                <ul className="list-disc list-inside text-slate-700 mt-1 space-y-1">
                  <li>3-year partnership agreement</li>
                  <li>$697/month per active builder (start with 100)</li>
                  <li>Co-marketing: Feature Crest at all Fluidra events</li>
                  <li>Intro to ProEdge members for rollout</li>
                </ul>
              </div>

              <p className="text-purple-900 font-bold text-lg">"LET'S MAKE FLUIDRA BUILDERS THE BEST IN THE INDUSTRY."</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TierSummary({ name, price, color, features }) {
  const colorClasses = {
    green: "border-green-300 bg-green-50",
    blue: "border-blue-300 bg-blue-50",
    purple: "border-purple-300 bg-purple-50"
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-xl font-bold text-slate-900">{name}</h4>
        <Badge className="text-sm">{price}</Badge>
      </div>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RevenueMilestone({ period, fluidra, professional, elite, total }) {
  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
      <h4 className="text-2xl font-bold text-slate-900 mb-4">{period}</h4>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-4 bg-white rounded-lg">
          <div className="text-sm text-slate-600 mb-1">Fluidra (Basic)</div>
          <div className="text-2xl font-bold text-green-600">{fluidra.builders} builders</div>
          <div className="text-sm text-slate-600">${fluidra.revenue.toLocaleString()}/mo</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg">
          <div className="text-sm text-slate-600 mb-1">Professional</div>
          <div className="text-2xl font-bold text-blue-600">{professional.count} builders</div>
          <div className="text-sm text-slate-600">${professional.revenue.toLocaleString()}/mo</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg">
          <div className="text-sm text-slate-600 mb-1">Elite</div>
          <div className="text-2xl font-bold text-purple-600">{elite.count} builders</div>
          <div className="text-sm text-slate-600">${elite.revenue.toLocaleString()}/mo</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-green-300">
        <div className="text-center">
          <div className="text-sm text-slate-600">MRR</div>
          <div className="text-3xl font-bold text-green-600">${total.mrr.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-slate-600">ARR</div>
          <div className="text-3xl font-bold text-green-600">${total.arr.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

function WeekSummary({ week, focus, outcome }) {
  return (
    <div className="flex items-start gap-4 p-4 glass rounded-lg">
      <div className="flex-shrink-0 w-20">
        <Badge className="bg-cyan-600">Week {week}</Badge>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 mb-1">{focus}</h4>
        <p className="text-sm text-slate-600">→ {outcome}</p>
      </div>
    </div>
  );
}