import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { 
  Globe, Zap, BarChart, Camera, Mail, TrendingUp, 
  CheckCircle, ArrowRight, Clock, DollarSign, Users
} from "lucide-react";

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern Elite",
    preview: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    description: "Clean lines, bold typography, luxury positioning",
    bestFor: "High-end custom builds, contemporary architecture",
    features: ["Full-screen hero", "Video background", "Animated portfolio", "Genesis Dossier embedded"]
  },
  {
    id: "classic",
    name: "Classic Luxury",
    preview: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    description: "Timeless design, elegant serif fonts, trust-focused",
    bestFor: "Established companies, traditional markets",
    features: ["Trust badges prominent", "Testimonials above fold", "Heritage storytelling", "Award showcase"]
  },
  {
    id: "resort",
    name: "Resort Experience",
    preview: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
    description: "Immersive visuals, lifestyle-focused, aspirational",
    bestFor: "Luxury market, vacation home owners",
    features: ["Parallax scrolling", "Lifestyle photography", "Virtual tours", "Aspirational copy"]
  }
];

const AUTOMATION_FEATURES = [
  {
    category: "Website & Hosting",
    icon: Globe,
    items: [
      { name: "Pick template", time: "2 min" },
      { name: "Upload logo + colors", time: "5 min" },
      { name: "Add 10 portfolio photos", time: "10 min" },
      { name: "Edit homepage copy", time: "15 min" },
      { name: "Connect domain", time: "5 min" },
      { name: "Auto SSL + hosting setup", time: "Auto" },
      { name: "Genesis Dossier embedded", time: "Auto" }
    ],
    outcome: "Live website in <1 hour (vs 6-8 weeks custom)"
  },
  {
    category: "Google Ads (Auto-Launch)",
    icon: TrendingUp,
    items: [
      { name: "Connect Google Ads account", time: "2 min" },
      { name: "Set monthly budget", time: "1 min" },
      { name: "Pick campaign type (local/regional)", time: "1 min" },
      { name: "AI generates 50+ ad variations", time: "Auto" },
      { name: "Creates 10 landing pages", time: "Auto" },
      { name: "Sets up conversion tracking", time: "Auto" },
      { name: "Launches campaigns", time: "Auto" }
    ],
    outcome: "Ads live in 24 hours (vs 2 weeks manual setup)"
  },
  {
    category: "SEO Automation",
    icon: BarChart,
    items: [
      { name: "Google My Business optimization", time: "Auto" },
      { name: "Submit to 50+ directories", time: "Auto" },
      { name: "Generate schema markup", time: "Auto" },
      { name: "Create SEO-optimized blog posts (AI)", time: "Auto" },
      { name: "Build local citations", time: "Auto" },
      { name: "Monitor rankings daily", time: "Auto" }
    ],
    outcome: "Page 1 ranking in 60 days (proven)"
  },
  {
    category: "Email Marketing",
    icon: Mail,
    items: [
      { name: "10 pre-written sequences loaded", time: "Auto" },
      { name: "Welcome series (5 emails)", time: "Auto" },
      { name: "Nurture series (8 emails)", time: "Auto" },
      { name: "Abandoned lead recovery (3 emails)", time: "Auto" },
      { name: "Post-project review request", time: "Auto" },
      { name: "Monthly newsletter template", time: "Auto" }
    ],
    outcome: "30% of leads re-engage via automation"
  },
  {
    category: "Social Media",
    icon: Camera,
    items: [
      { name: "AI generates 30 days of posts", time: "Auto" },
      { name: "Facebook + Instagram + LinkedIn", time: "Auto" },
      { name: "Pool tips, design ideas, before/after", time: "Auto" },
      { name: "Auto-schedule optimal posting times", time: "Auto" },
      { name: "Hashtag research + application", time: "Auto" }
    ],
    outcome: "Consistent presence without manual work"
  },
  {
    category: "Review Automation",
    icon: Users,
    items: [
      { name: "Auto-request review 7 days post-completion", time: "Auto" },
      { name: "Send via email + SMS", time: "Auto" },
      { name: "Follow-up if no response", time: "Auto" },
      { name: "Alert when new review posted", time: "Auto" },
      { name: "AI drafts response (you approve)", time: "Auto" }
    ],
    outcome: "5x more Google reviews vs manual"
  }
];

const COMPARISON = [
  {
    feature: "Time to Launch",
    lemonadeStand: "6-8 weeks (custom build)",
    proBuilder: "48 hours (stock template)"
  },
  {
    feature: "Website Cost",
    lemonadeStand: "$5k-$15k one-time + $200/mo hosting",
    proBuilder: "Included in monthly fee"
  },
  {
    feature: "Google Ads Setup",
    lemonadeStand: "2 weeks + $1,500 setup fee",
    proBuilder: "24 hours, included"
  },
  {
    feature: "SEO Strategy",
    lemonadeStand: "Manual, $2k/month minimum",
    proBuilder: "Automated, included"
  },
  {
    feature: "Email Marketing",
    lemonadeStand: "Custom sequences, $1k/month",
    proBuilder: "10 sequences pre-built, included"
  },
  {
    feature: "Social Media",
    lemonadeStand: "Account manager posts, $1.5k/month",
    proBuilder: "AI generates, included"
  },
  {
    feature: "Content Creation",
    lemonadeStand: "4 blog posts/month, $2k/month",
    proBuilder: "AI writes unlimited, included"
  },
  {
    feature: "Genesis Dossier",
    lemonadeStand: "❌ Not available",
    proBuilder: "✅ Core differentiator"
  },
  {
    feature: "Lead Scoring AI",
    lemonadeStand: "❌ Not available",
    proBuilder: "✅ Included"
  },
  {
    feature: "Construction Portal",
    lemonadeStand: "❌ Not available",
    proBuilder: "✅ Included"
  },
  {
    feature: "Total Monthly Cost",
    lemonadeStand: "$6k-$10k/month",
    proBuilder: "$7,997/month (more features, less cost)"
  }
];

export default function StockSolution() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 text-lg">
            STOCK SOLUTION: ZERO CUSTOM WORK
          </Badge>
          <h1 className="text-6xl font-bold text-slate-900 mb-4">
            ProBuilder Complete
          </h1>
          <p className="text-2xl text-slate-600 mb-8">
            Pick template. Customize in 2 hours. Live same day.
          </p>
          <div className="inline-flex items-center gap-4 p-6 glass rounded-2xl border-4 border-purple-500">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600">$7,997</div>
              <div className="text-slate-600">/month</div>
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-600">vs Lemonade Stand:</div>
              <div className="text-2xl font-bold text-slate-900">$6k-$10k/month</div>
              <div className="text-sm text-green-600 font-semibold">(We include MORE for LESS)</div>
            </div>
          </div>
        </div>

        {/* Website Templates */}
        <Card className="mb-16 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Globe className="w-8 h-8 text-purple-600" />
              Step 1: Pick Your Template (2 minutes)
            </CardTitle>
            <p className="text-slate-600 mt-2">Pre-designed. Conversion-optimized. Genesis Dossier embedded.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={() => setSelectedTemplate(template.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Automation Features */}
        <Card className="mb-16 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Zap className="w-8 h-8 text-orange-600" />
              What Happens Automatically
            </CardTitle>
            <p className="text-slate-600 mt-2">90% automated. Humans polish the 10% that matters.</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="website">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
                <TabsTrigger value="website">Website</TabsTrigger>
                <TabsTrigger value="ads">Google Ads</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {AUTOMATION_FEATURES.map((feature) => (
                <TabsContent key={feature.category.toLowerCase().replace(/\s/g, '')} value={feature.category.toLowerCase().replace(/\s/g, '')}>
                  <AutomationPanel feature={feature} />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Head-to-Head Comparison */}
        <Card className="mb-16 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl">ProBuilder vs Lemonade Stand</CardTitle>
            <p className="text-slate-600 mt-2">Side-by-side: Why 4 Fluidra builders will switch</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left p-4 font-bold text-slate-900">Feature</th>
                    <th className="text-left p-4 font-bold text-red-600">Lemonade Stand</th>
                    <th className="text-left p-4 font-bold text-green-600">ProBuilder Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, idx) => (
                    <tr key={idx} className={`border-b border-slate-200 ${idx % 2 === 0 ? 'bg-slate-50' : ''}`}>
                      <td className="p-4 font-semibold text-slate-900">{row.feature}</td>
                      <td className="p-4 text-slate-700">{row.lemonadeStand}</td>
                      <td className="p-4 text-slate-900 font-semibold">{row.proBuilder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-4 border-green-500">
              <h4 className="text-2xl font-bold text-green-900 mb-4">The Unfair Advantage</h4>
              <p className="text-green-800 text-lg mb-4">
                <strong>Lemonade Stand can't offer Genesis Project Dossier.</strong> Everything else (website, ads, SEO) 
                they can replicate. But showing customers their custom pool in 3D with $10k+ property intelligence 
                BEFORE they commit? <strong>That's worth $7,997/month by itself.</strong>
              </p>
              <p className="text-green-800">
                A builder using ProBuilder Complete + Lemonade Stand would be paying $15k+/month for redundant services. 
                With ProBuilder Complete alone, they get superior SaaS tools + comparable marketing services for $7,997.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="shadow-floating border-4 border-purple-500">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Ready to Onboard 4 Fluidra Pilots?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Week 1-2: Build stock templates<br />
              Week 11-12: Onboard pilots<br />
              Week 13: Fluidra partnership announcement
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl px-12 py-6">
              Start Week 1 Development
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TemplateCard({ template, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all rounded-xl overflow-hidden ${
        isSelected 
          ? 'ring-4 ring-purple-500 shadow-floating scale-105' 
          : 'hover:shadow-elevated hover:scale-102'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={template.preview} alt={template.name} className="w-full h-full object-cover" />
        {isSelected && (
          <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
            <div className="bg-purple-600 rounded-full p-3">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <h4 className="font-bold text-slate-900 mb-2">{template.name}</h4>
        <p className="text-sm text-slate-600 mb-3">{template.description}</p>
        <div className="text-xs text-slate-500 mb-3">
          <strong>Best for:</strong> {template.bestFor}
        </div>
        <div className="flex flex-wrap gap-1">
          {template.features.map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationPanel({ feature }) {
  const Icon = feature.icon;
  const totalTime = feature.items.reduce((sum, item) => {
    if (item.time === "Auto") return sum;
    const mins = parseInt(item.time);
    return sum + (isNaN(mins) ? 0 : mins);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.category}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <span className="text-sm text-slate-600">Manual time: {totalTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600">Rest is automated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {feature.items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-4 glass rounded-lg">
            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              item.time === "Auto" ? "text-green-600" : "text-blue-600"
            }`} />
            <div>
              <p className="text-sm text-slate-900">{item.name}</p>
              <Badge className={`mt-1 text-xs ${
                item.time === "Auto" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}>
                {item.time}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-6 h-6 text-purple-600" />
          <strong className="text-purple-900 text-lg">Outcome:</strong>
        </div>
        <p className="text-purple-800">{feature.outcome}</p>
      </div>
    </div>
  );
}