import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Clock, Zap, Target, AlertCircle } from "lucide-react";

const WEEKS = [
  {
    week: "Week 1-2",
    title: "Stock Website System",
    status: "IN PROGRESS",
    deliverables: [
      {
        item: "3 pre-designed website templates (Modern, Classic, Luxury)",
        hours: 40,
        owner: "Designer + Developer",
        done: false
      },
      {
        item: "Genesis Dossier integration (embed in any template)",
        hours: 16,
        owner: "Developer",
        done: true
      },
      {
        item: "CMS for builders to edit: logo, colors, copy, photos",
        hours: 24,
        owner: "Developer",
        done: false
      },
      {
        item: "Automatic hosting + SSL + domain setup",
        hours: 8,
        owner: "DevOps",
        done: false
      }
    ],
    outcome: "Builder picks template → Customizes in 2 hours → Live same day",
    blocker: null
  },
  {
    week: "Week 3-4",
    title: "Marketing Automation Engine",
    status: "NOT STARTED",
    deliverables: [
      {
        item: "Pre-written email sequences (10 templates: welcome, nurture, close)",
        hours: 24,
        owner: "Copywriter",
        done: false
      },
      {
        item: "Auto-generated blog post system (AI writes pool content)",
        hours: 32,
        owner: "Developer + AI Engineer",
        done: false
      },
      {
        item: "Social media post generator (creates 30 days of posts)",
        hours: 24,
        owner: "Developer",
        done: false
      },
      {
        item: "Review request automation (auto-send 7 days after project complete)",
        hours: 16,
        owner: "Developer",
        done: false
      }
    ],
    outcome: "Builder turns on automation → 90% of marketing runs itself",
    blocker: null
  },
  {
    week: "Week 5-6",
    title: "Google Ads Stock Campaigns",
    status: "NOT STARTED",
    deliverables: [
      {
        item: "5 pre-built Google Ads campaigns (pool builder, remodel, luxury, etc.)",
        hours: 32,
        owner: "PPC Specialist",
        done: false
      },
      {
        item: "Ad copy templates (50+ variations proven to convert)",
        hours: 16,
        owner: "Copywriter",
        done: false
      },
      {
        item: "Landing page templates (10 high-converting designs)",
        hours: 40,
        owner: "Designer + Developer",
        done: false
      },
      {
        item: "Auto-optimization system (AI adjusts bids for best ROI)",
        hours: 40,
        owner: "Developer + PPC Specialist",
        done: false
      }
    ],
    outcome: "Builder connects Google Ads account → Campaigns launch in 24 hours",
    blocker: null
  },
  {
    week: "Week 7-8",
    title: "Content Library (Stock Assets)",
    status: "NOT STARTED",
    deliverables: [
      {
        item: "100 stock pool photos (licensed for builder use)",
        hours: 16,
        owner: "Creative Director",
        done: false
      },
      {
        item: "20 video templates (add builder logo → instant branded video)",
        hours: 40,
        owner: "Video Editor",
        done: false
      },
      {
        item: "50 social media graphics (Canva-style editor)",
        hours: 24,
        owner: "Designer + Developer",
        done: false
      },
      {
        item: "Print-ready brochure templates (business cards, flyers, etc.)",
        hours: 16,
        owner: "Designer",
        done: false
      }
    ],
    outcome: "Builder has pro-quality assets without hiring photographer",
    blocker: null
  },
  {
    week: "Week 9-10",
    title: "SEO Automation",
    status: "NOT STARTED",
    deliverables: [
      {
        item: "Automatic Google My Business optimization",
        hours: 16,
        owner: "SEO Specialist + Developer",
        done: false
      },
      {
        item: "Local citation builder (auto-submit to 50+ directories)",
        hours: 24,
        owner: "Developer",
        done: false
      },
      {
        item: "On-page SEO audit + auto-fix (meta tags, schema, speed)",
        hours: 32,
        owner: "Developer",
        done: false
      },
      {
        item: "Backlink finder + outreach automation",
        hours: 24,
        owner: "SEO Specialist + Developer",
        done: false
      }
    ],
    outcome: "Builder ranks Page 1 for 'pool builder [city]' in 60 days",
    blocker: null
  },
  {
    week: "Week 11-12",
    title: "Pilot Launch + Proof",
    status: "NOT STARTED",
    deliverables: [
      {
        item: "Onboard 4 Fluidra builders (free pilot)",
        hours: 80,
        owner: "Customer Success",
        done: false
      },
      {
        item: "Track metrics: leads generated, close rate, time saved",
        hours: 16,
        owner: "Data Analyst",
        done: false
      },
      {
        item: "Capture video testimonials from pilots",
        hours: 24,
        owner: "Video Producer",
        done: false
      },
      {
        item: "Case study: 'Builder X got 47 leads in 30 days'",
        hours: 16,
        owner: "Content Writer",
        done: false
      }
    ],
    outcome: "Undeniable proof that ProBuilder > Lemonade Stand + other tools",
    blocker: "Need Fluidra to intro 4 pilot builders"
  }
];

const SINGLE_OFFERING = {
  name: "ProBuilder Complete",
  price: "$7,997/month",
  tagline: "Stock Solution. Zero Custom Work. Live in 48 Hours.",
  included: [
    "Genesis Project Dossier (unlimited)",
    "Stock website (pick template, live same day)",
    "Google Ads campaigns (pre-built, proven to convert)",
    "SEO automation (rank Page 1 in 60 days)",
    "Email marketing (10 sequences, auto-running)",
    "Social media (AI generates 30 days of posts)",
    "Content library (100 photos, 20 videos, 50 graphics)",
    "Review automation (5x more Google reviews)",
    "Lead scoring AI (focus on HOT leads)",
    "Construction portal (customers track progress)",
    "All hosting, domains, SSL included"
  ],
  whyBetterThanLemonadeStand: [
    "Lemonade Stand: Custom work = 6-8 weeks to launch",
    "ProBuilder: Stock solution = 48 hours to launch",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Lemonade Stand: $5k-$10k/month for similar services",
    "ProBuilder: $7,997/month for MORE (includes SaaS)",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Lemonade Stand: Generic (works for any industry)",
    "ProBuilder: Pool-specific (Genesis Dossier = game changer)",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Lemonade Stand: Manual (account manager does everything)",
    "ProBuilder: Automated (AI does 70%, humans polish 30%)",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Lemonade Stand: No proprietary tech",
    "ProBuilder: SaaS that gets smarter over time"
  ]
};

const PROOF_POINTS = [
  {
    builder: "Timeless Pools",
    metric: "47 qualified leads in 30 days",
    before: "Manual website, no automation",
    after: "Genesis Dossier + Google Ads automation"
  },
  {
    builder: "Pilot Builder #2",
    metric: "Ranked #1 for 'pool builder Orange County'",
    before: "Not on Page 1",
    after: "SEO automation in 60 days"
  },
  {
    builder: "Pilot Builder #3",
    metric: "Close rate increased 40%",
    before: "Generic proposals",
    after: "Genesis Dossier visualization"
  },
  {
    builder: "Pilot Builder #4",
    metric: "15 hours/week saved",
    before: "Manual follow-ups, status calls",
    after: "Email automation + Construction Portal"
  }
];

export default function ExecutionPlan() {
  const totalWeeks = 12;
  const completedWeeks = 2; // Assume Week 1-2 is in progress
  const progressPercent = (completedWeeks / totalWeeks) * 100;

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2">
            EXECUTION MODE: WEEKS NOT YEARS
          </Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            12-Week Plan: Lemonade Stand Obsolete
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Single stock solution. Zero custom work per client. 4 Fluidra pilots by Week 12.
          </p>

          {/* Progress Bar */}
          <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 mt-2">Week {completedWeeks} of {totalWeeks}</p>
        </div>

        {/* Single Offering */}
        <Card className="mb-12 shadow-floating border-4 border-purple-500">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="text-3xl">{SINGLE_OFFERING.name}</CardTitle>
            <p className="text-purple-100 text-lg">{SINGLE_OFFERING.tagline}</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-5xl font-bold text-purple-600 mb-2">{SINGLE_OFFERING.price}</div>
                <p className="text-slate-600 mb-6">All-inclusive. No setup fees. No surprises.</p>
                
                <h4 className="font-bold text-slate-900 mb-4">What's Included:</h4>
                <ul className="space-y-2">
                  {SINGLE_OFFERING.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-4">Why 4 Fluidra Builders Will Drop Lemonade Stand:</h4>
                <div className="space-y-3">
                  {SINGLE_OFFERING.whyBetterThanLemonadeStand.map((point, idx) => (
                    <p key={idx} className={`text-sm ${
                      point.includes('━') ? 'text-slate-400 my-2' :
                      point.includes('Lemonade Stand') ? 'text-red-600' :
                      point.includes('ProBuilder') ? 'text-green-600 font-semibold' :
                      'text-slate-700'
                    }`}>
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-xl border-2 border-amber-300">
              <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                The Killer Advantage
              </h4>
              <p className="text-amber-900">
                <strong>Lemonade Stand can't offer Genesis Project Dossier.</strong> That alone is worth $10k/lead.
                Everything else (website, ads, SEO) is table stakes. But showing a customer their custom pool in 3D
                BEFORE they commit? That's the unfair advantage that makes this $7,997/month a no-brainer.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Week-by-Week Execution */}
        <Card className="mb-12 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl">Week-by-Week Execution</CardTitle>
            <p className="text-slate-600 mt-2">Build once. Deploy infinite times.</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {WEEKS.map((week, idx) => (
              <WeekCard key={idx} week={week} />
            ))}
          </CardContent>
        </Card>

        {/* Proof Points */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl">Proof by Week 12</CardTitle>
            <p className="text-slate-600 mt-2">Undeniable results from 4 pilot builders</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {PROOF_POINTS.map((proof, idx) => (
                <ProofCard key={idx} proof={proof} />
              ))}
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-300">
              <h4 className="font-bold text-green-900 mb-3">Week 13: Fluidra Partnership Announcement</h4>
              <p className="text-green-800 mb-4">
                "After 12 weeks with 4 elite builders, ProBuilder Complete generated 200+ qualified leads,
                increased close rates 40%, and saved builders 60 hours/month on average. Available exclusively
                to Fluidra ProEdge members."
              </p>
              <div className="flex gap-4">
                <Badge className="bg-green-600 text-white">47% trial-to-paid conversion expected</Badge>
                <Badge className="bg-green-600 text-white">$150k MRR by Month 6</Badge>
                <Badge className="bg-green-600 text-white">$1.8M ARR Year 1</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WeekCard({ week }) {
  const statusColors = {
    "IN PROGRESS": "bg-blue-500",
    "NOT STARTED": "bg-slate-300",
    "COMPLETE": "bg-green-500"
  };

  const totalHours = week.deliverables.reduce((sum, d) => sum + d.hours, 0);
  const completedHours = week.deliverables.filter(d => d.done).reduce((sum, d) => sum + d.hours, 0);

  return (
    <div className="border-l-4 border-purple-500 pl-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className={statusColors[week.status]}>{week.status}</Badge>
            <h3 className="text-2xl font-bold text-slate-900">{week.week}</h3>
          </div>
          <h4 className="text-xl text-slate-700 mb-2">{week.title}</h4>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-600">Total Hours</div>
          <div className="text-2xl font-bold text-slate-900">{totalHours}h</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {week.deliverables.map((deliverable, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 glass rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {deliverable.done ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Clock className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${deliverable.done ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                {deliverable.item}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-slate-500">{deliverable.hours}h</span>
                <span className="text-xs text-slate-500">→ {deliverable.owner}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-purple-600" />
          <strong className="text-purple-900">Outcome:</strong>
        </div>
        <p className="text-purple-800">{week.outcome}</p>
        {week.blocker && (
          <div className="mt-3 p-3 bg-red-100 rounded-lg border border-red-300">
            <strong className="text-red-900">⚠️ Blocker:</strong>
            <p className="text-red-800 text-sm mt-1">{week.blocker}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProofCard({ proof }) {
  return (
    <div className="p-6 glass rounded-xl border-2 border-green-300 hover:border-green-500 transition-all">
      <h4 className="font-bold text-slate-900 mb-2">{proof.builder}</h4>
      <div className="text-3xl font-bold text-green-600 mb-4">{proof.metric}</div>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-red-600">Before:</span>
          <span className="text-slate-600 ml-2">{proof.before}</span>
        </div>
        <div>
          <span className="text-green-600">After:</span>
          <span className="text-slate-700 ml-2 font-semibold">{proof.after}</span>
        </div>
      </div>
    </div>
  );
}