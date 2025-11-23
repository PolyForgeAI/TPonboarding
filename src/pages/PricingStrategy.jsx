import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Check, Zap, Crown, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const TIERS = [
  {
    id: "essentials",
    name: "Essentials",
    tagline: "DIY with Pro Tools",
    price: "$997",
    period: "/month",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    description: "SaaS tools only. You handle marketing.",
    features: [
      { name: "Genesis Project Dossier", included: true, detail: "Unlimited dossiers" },
      { name: "Material Visualizer Pro", included: true, detail: "AR + 3D rendering" },
      { name: "Lead Scoring & Automation", included: true, detail: "AI-powered" },
      { name: "ROI Calculator + Financing", included: true, detail: "With lender integrations" },
      { name: "Construction Portal", included: true, detail: "Unlimited projects" },
      { name: "Reputation Engine", included: true, detail: "Review automation" },
      { name: "White-label branding", included: true },
      { name: "API access", included: true },
      { name: "Website design", included: false },
      { name: "Marketing management", included: false },
      { name: "Content creation", included: false },
      { name: "SEO optimization", included: false },
      { name: "Google Ads management", included: false },
    ],
    cta: "Start Free Trial",
    ideal: "Tech-savvy builders with in-house marketing"
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "SaaS + Marketing Done For You",
    price: "$4,997",
    period: "/month",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    badge: "MOST POPULAR",
    description: "Everything in Essentials + full marketing services",
    features: [
      { name: "Everything in Essentials", included: true, highlight: true },
      { name: "Custom website design", included: true, detail: "Mobile-responsive, hosted" },
      { name: "SEO optimization", included: true, detail: "Local + national" },
      { name: "Google Ads management", included: true, detail: "Up to $5k/month ad spend" },
      { name: "Social media management", included: true, detail: "3 platforms" },
      { name: "Content creation", included: true, detail: "4 blog posts/month" },
      { name: "Email marketing", included: true, detail: "Automated sequences" },
      { name: "Monthly analytics reports", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Photography coordination", included: false },
      { name: "Video production", included: false },
      { name: "Premium PR placements", included: false },
    ],
    cta: "Schedule Demo",
    ideal: "Builders doing 20-50 pools/year wanting to scale"
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "White-Glove Everything",
    price: "$12,997",
    period: "/month",
    icon: Rocket,
    color: "from-amber-500 to-orange-500",
    badge: "MAXIMUM ROI",
    description: "Full concierge service + all SaaS tools",
    features: [
      { name: "Everything in Professional", included: true, highlight: true },
      { name: "Google Ads management", included: true, detail: "Up to $25k/month ad spend" },
      { name: "Professional photography", included: true, detail: "Monthly shoots" },
      { name: "Video production", included: true, detail: "2 videos/month" },
      { name: "PR & media placements", included: true, detail: "Local magazines, TV" },
      { name: "Trade show booth design", included: true },
      { name: "Print collateral design", included: true, detail: "Brochures, flyers" },
      { name: "Subcontractor marketplace", included: true, detail: "Premium network" },
      { name: "Multi-location support", included: true },
      { name: "Custom integrations", included: true, detail: "CRM, accounting" },
      { name: "24/7 priority support", included: true },
      { name: "Quarterly strategy sessions", included: true },
    ],
    cta: "Apply Now",
    ideal: "Elite builders doing 50+ pools/year, regional expansion"
  }
];

const ADD_ONS = [
  {
    name: "Google Ads Overage",
    price: "15% of ad spend",
    description: "For ad spend above tier limits"
  },
  {
    name: "Additional Locations",
    price: "$1,997/month each",
    description: "Multi-location branding & marketing"
  },
  {
    name: "Video Production Extra",
    price: "$2,500/video",
    description: "Beyond included videos"
  },
  {
    name: "Photography Extra",
    price: "$1,500/shoot",
    description: "Additional project shoots"
  },
  {
    name: "Custom Development",
    price: "Quoted",
    description: "Bespoke features or integrations"
  },
  {
    name: "Influencer Campaigns",
    price: "$5k-$25k",
    description: "Coordinated influencer partnerships"
  }
];

export default function PricingStrategy() {
  const [selectedTier, setSelectedTier] = useState("professional");

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
              Complete Lemonade Stand Replacement + Superior SaaS
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Maximum MRR Strategy
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three tiers: DIY with tools, Done-for-you marketing, or white-glove everything.
              <br />Every tier includes all SaaS products. Higher tiers add full-service agency work.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {TIERS.map((tier, idx) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              delay={idx * 0.1}
              isSelected={selectedTier === tier.id}
              onSelect={() => setSelectedTier(tier.id)}
            />
          ))}
        </div>

        {/* Revenue Projections */}
        <Card className="mb-16 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl">Revenue Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <RevenueScenario
                year="Year 1 (2025)"
                customers={[
                  { tier: "Essentials", count: 10, price: 997 },
                  { tier: "Professional", count: 15, price: 4997 },
                  { tier: "Elite", count: 5, price: 12997 }
                ]}
              />
              <RevenueScenario
                year="Year 2 (2026)"
                customers={[
                  { tier: "Essentials", count: 30, price: 997 },
                  { tier: "Professional", count: 50, price: 4997 },
                  { tier: "Elite", count: 20, price: 12997 }
                ]}
              />
              <RevenueScenario
                year="Year 3 (2027)"
                customers={[
                  { tier: "Essentials", count: 50, price: 997 },
                  { tier: "Professional", count: 100, price: 4997 },
                  { tier: "Elite", count: 50, price: 12997 }
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add-Ons */}
        <Card className="mb-16 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl">Add-On Services</CardTitle>
            <p className="text-slate-600 mt-2">Boost MRR with optional services</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ADD_ONS.map((addon, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 glass rounded-xl border-2 border-purple-300/50 hover:border-purple-500/50 transition-all"
                >
                  <h4 className="font-bold text-slate-900 mb-2">{addon.name}</h4>
                  <p className="text-2xl font-bold text-purple-600 mb-2">{addon.price}</p>
                  <p className="text-sm text-slate-600">{addon.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Value Props */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl">Why We Crush Lemonade Stand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <ComparisonColumn
                title="Lemonade Stand"
                color="red"
                items={[
                  "Marketing services only",
                  "No proprietary software",
                  "Manual processes",
                  "Generic solutions",
                  "$2k-$10k/month",
                  "20-30% margins",
                  "Linear scaling (more staff)"
                ]}
              />
              <ComparisonColumn
                title="ProBuilder Suite (Us)"
                color="green"
                items={[
                  "Marketing + SaaS platform",
                  "Proprietary AI-powered tools",
                  "Automated workflows",
                  "Pool-specific solutions",
                  "$997-$12,997/month",
                  "60-80% margins (software + services)",
                  "Exponential scaling (software)"
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PricingCard({ tier, delay, isSelected, onSelect }) {
  const Icon = tier.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onSelect}
      className="cursor-pointer"
    >
      <Card className={`relative overflow-hidden transition-all h-full ${
        isSelected 
          ? 'ring-4 ring-purple-500 shadow-floating scale-105' 
          : 'hover:shadow-elevated hover:scale-102'
      }`}>
        {tier.badge && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-bold">
            {tier.badge}
          </div>
        )}
        <CardContent className={`p-8 ${tier.badge ? 'pt-16' : ''}`}>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tier.color} flex items-center justify-center mb-6 shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-3xl font-bold text-slate-900 mb-2">{tier.name}</h3>
          <p className="text-slate-600 text-sm mb-4">{tier.tagline}</p>

          <div className="mb-6">
            <span className="text-5xl font-bold text-slate-900">{tier.price}</span>
            <span className="text-slate-600">{tier.period}</span>
          </div>

          <p className="text-slate-700 mb-6">{tier.description}</p>

          <Button className={`w-full mb-6 bg-gradient-to-r ${tier.color} text-white shadow-lg`}>
            {tier.cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="space-y-3">
            {tier.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  feature.included 
                    ? feature.highlight ? 'text-purple-600' : 'text-green-600'
                    : 'text-slate-300'
                }`} />
                <div>
                  <span className={`text-sm ${
                    feature.included 
                      ? feature.highlight ? 'font-bold text-purple-900' : 'text-slate-900'
                      : 'text-slate-400 line-through'
                  }`}>
                    {feature.name}
                  </span>
                  {feature.detail && (
                    <span className="text-xs text-slate-500 block">{feature.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              <strong>Ideal for:</strong> {tier.ideal}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RevenueScenario({ year, customers }) {
  const totalMRR = customers.reduce((sum, c) => sum + (c.count * c.price), 0);
  const totalARR = totalMRR * 12;

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
      <h4 className="text-2xl font-bold text-slate-900 mb-4">{year}</h4>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {customers.map((c, idx) => (
          <div key={idx} className="text-center">
            <div className="text-3xl font-bold text-green-600">{c.count}</div>
            <div className="text-sm text-slate-600">{c.tier}</div>
            <div className="text-xs text-slate-500">${(c.count * c.price).toLocaleString()}/mo</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-green-300">
        <div>
          <div className="text-sm text-slate-600">Monthly Recurring Revenue</div>
          <div className="text-3xl font-bold text-green-600">${totalMRR.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Annual Recurring Revenue</div>
          <div className="text-3xl font-bold text-green-600">${totalARR.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

function ComparisonColumn({ title, color, items }) {
  const colorClass = color === 'red' ? 'text-red-600' : 'text-green-600';
  const bgClass = color === 'red' ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300';

  return (
    <div className={`p-6 rounded-xl border-2 ${bgClass}`}>
      <h4 className={`text-2xl font-bold mb-4 ${colorClass}`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className={`text-lg ${colorClass}`}>{color === 'red' ? '❌' : '✅'}</span>
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}