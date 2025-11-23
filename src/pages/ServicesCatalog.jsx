import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { 
  Globe, Search, MousePointer, Camera, Video, FileText, 
  Mail, Facebook, Instagram, Award, TrendingUp, Users,
  Zap, Target, BarChart, Megaphone
} from "lucide-react";

const SERVICES = {
  saas: {
    title: "SaaS Products (All Tiers)",
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        icon: Zap,
        name: "Genesis Project Dossier",
        description: "AI-powered custom pool design with 3D visualization, property intelligence, and lead qualification",
        deliverables: ["Unlimited dossiers", "3D renders", "Property analysis", "Material selection"],
        value: "$10,000+ per lead"
      },
      {
        icon: Target,
        name: "Material Visualizer Pro",
        description: "AR app for real-time material visualization in customer's backyard",
        deliverables: ["AR mobile app", "Material swapping", "PDF export", "Client presentations"],
        value: "40% increase in upsells"
      },
      {
        icon: BarChart,
        name: "Lead Scoring & Automation",
        description: "AI analyzes leads, predicts close probability, automates follow-ups",
        deliverables: ["HOT/WARM/COLD scoring", "Automated sequences", "Content library", "Performance tracking"],
        value: "50% time savings"
      },
      {
        icon: TrendingUp,
        name: "ROI Calculator + Financing",
        description: "Property value analysis, pool ROI estimator, lender integrations",
        deliverables: ["Zillow/Redfin integration", "Financing calculator", "Instant approvals", "Payment plans"],
        value: "Overcome price objections"
      },
      {
        icon: Users,
        name: "Construction Portal",
        description: "Customer-facing project tracking with photos, milestones, and messaging",
        deliverables: ["Timeline tracker", "Weekly photos", "2-way messaging", "Document storage"],
        value: "80% reduction in status calls"
      }
    ]
  },
  marketing: {
    title: "Marketing Services (Professional + Elite)",
    color: "from-purple-500 to-pink-500",
    items: [
      {
        icon: Globe,
        name: "Custom Website Design",
        description: "Mobile-responsive, conversion-optimized website with Genesis Dossier integration",
        deliverables: ["Custom design", "Mobile responsive", "Hosting included", "SSL certificate", "Monthly updates"],
        timeline: "4-6 weeks initial build",
        value: "$15k-$30k one-time value"
      },
      {
        icon: Search,
        name: "SEO Optimization",
        description: "Local and national SEO to dominate 'pool builder near me' searches",
        deliverables: ["Keyword research", "On-page optimization", "Local listings (GMB)", "Monthly reporting"],
        timeline: "Ongoing",
        value: "Top 3 rankings in 90 days"
      },
      {
        icon: MousePointer,
        name: "Google Ads Management",
        description: "High-converting PPC campaigns targeting ready-to-buy homeowners",
        deliverables: ["Campaign setup", "Ad copywriting", "Landing pages", "Bid optimization", "Weekly reports"],
        timeline: "Ongoing",
        value: "$3-$8 cost per lead"
      },
      {
        icon: Facebook,
        name: "Social Media Management",
        description: "Consistent posting across Facebook, Instagram, and LinkedIn",
        deliverables: ["3 platforms", "5 posts/week", "Community management", "Story content", "Hashtag strategy"],
        timeline: "Ongoing",
        value: "Build brand authority"
      },
      {
        icon: FileText,
        name: "Content Creation",
        description: "SEO-optimized blog posts, case studies, and educational content",
        deliverables: ["4 blog posts/month", "1 case study/month", "Email newsletters", "Downloadable guides"],
        timeline: "Ongoing",
        value: "Establish thought leadership"
      },
      {
        icon: Mail,
        name: "Email Marketing",
        description: "Automated nurture sequences and monthly newsletters",
        deliverables: ["Welcome sequence", "Abandoned lead recovery", "Monthly newsletter", "Segmentation"],
        timeline: "Ongoing",
        value: "30% lead recovery rate"
      }
    ]
  },
  premium: {
    title: "Premium Services (Elite Only)",
    color: "from-amber-500 to-orange-500",
    items: [
      {
        icon: Camera,
        name: "Professional Photography",
        description: "Monthly project shoots with professional photographer",
        deliverables: ["Monthly shoot", "50+ edited photos", "Drone shots", "Before/after", "Usage rights"],
        timeline: "Monthly",
        value: "Portfolio that sells"
      },
      {
        icon: Video,
        name: "Video Production",
        description: "2 professionally produced videos per month (customer testimonials, project tours)",
        deliverables: ["2 videos/month", "Scripting", "Professional editing", "Captioning", "Social cuts"],
        timeline: "Monthly",
        value: "Video leads convert 80% higher"
      },
      {
        icon: Award,
        name: "PR & Media Placements",
        description: "Secure features in local magazines, newspapers, and TV",
        deliverables: ["Press releases", "Media outreach", "Interview coordination", "Quarterly placements"],
        timeline: "Quarterly",
        value: "Instant credibility"
      },
      {
        icon: Megaphone,
        name: "Trade Show Support",
        description: "Booth design, promotional materials, lead capture strategy",
        deliverables: ["Booth design", "Print collateral", "Lead scanner setup", "Follow-up automation"],
        timeline: "Per event",
        value: "100+ qualified leads per show"
      }
    ]
  }
};

const OPERATIONAL_SERVICES = [
  {
    category: "Creative Services",
    items: [
      "Logo design & branding",
      "Business card design",
      "Brochure & flyer design",
      "Vehicle wrap design",
      "Yard sign design",
      "Trade show banners"
    ]
  },
  {
    category: "Technical Services",
    items: [
      "Domain registration & management",
      "Email hosting setup",
      "Website hosting & backups",
      "SSL certificate management",
      "CDN configuration",
      "Performance optimization"
    ]
  },
  {
    category: "Ongoing Management",
    items: [
      "Monthly analytics reporting",
      "Reputation monitoring",
      "Competitor analysis",
      "Strategy sessions",
      "A/B testing",
      "Conversion rate optimization"
    ]
  }
];

export default function ServicesCatalog() {
  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
            Complete Service Catalog
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Everything You Need to Dominate
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From AI-powered SaaS tools to full-service marketing. We handle everything so you can focus on building pools.
          </p>
        </div>

        {/* SaaS Products */}
        <ServiceSection
          title={SERVICES.saas.title}
          color={SERVICES.saas.color}
          items={SERVICES.saas.items}
        />

        {/* Marketing Services */}
        <ServiceSection
          title={SERVICES.marketing.title}
          color={SERVICES.marketing.color}
          items={SERVICES.marketing.items}
        />

        {/* Premium Services */}
        <ServiceSection
          title={SERVICES.premium.title}
          color={SERVICES.premium.color}
          items={SERVICES.premium.items}
        />

        {/* Operational Services */}
        <Card className="shadow-elevated mb-16">
          <CardHeader>
            <CardTitle className="text-3xl">Operational Services (All Tiers)</CardTitle>
            <p className="text-slate-600 mt-2">Behind-the-scenes work that keeps everything running</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {OPERATIONAL_SERVICES.map((category, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-slate-900 mb-4">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-green-600 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-3xl">Onboarding Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <TimelineStep
                week="Week 1"
                title="Discovery & Strategy"
                items={[
                  "Kickoff call with your team",
                  "Brand audit & competitive analysis",
                  "Target audience definition",
                  "Strategy document delivery"
                ]}
              />
              <TimelineStep
                week="Week 2-3"
                title="Website Design"
                items={[
                  "Wireframes & mockups",
                  "Content gathering",
                  "Design revision rounds",
                  "Copywriting"
                ]}
              />
              <TimelineStep
                week="Week 4-5"
                title="Development & Launch"
                items={[
                  "Website development",
                  "Genesis Dossier integration",
                  "QA testing",
                  "DNS migration & launch"
                ]}
              />
              <TimelineStep
                week="Week 6+"
                title="Ongoing Optimization"
                items={[
                  "Google Ads campaigns live",
                  "SEO implementation",
                  "Content publishing starts",
                  "Weekly performance reports"
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ServiceSection({ title, color, items }) {
  return (
    <Card className="mb-16 shadow-elevated">
      <CardHeader>
        <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${color} text-white font-bold mb-4`}>
          {title}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {items.map((service, idx) => (
            <ServiceCard key={idx} service={service} color={color} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceCard({ service, color }) {
  const Icon = service.icon;

  return (
    <div className="p-6 glass rounded-xl border-2 border-slate-200 hover:border-purple-300 transition-all">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h4>
      <p className="text-slate-700 mb-4">{service.description}</p>
      
      {service.deliverables && (
        <div className="mb-4">
          <strong className="text-sm text-slate-600 block mb-2">Deliverables:</strong>
          <ul className="space-y-1">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.timeline && (
        <div className="mb-3">
          <Badge variant="outline" className="text-xs">{service.timeline}</Badge>
        </div>
      )}

      {service.value && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm font-semibold text-green-800">💰 {service.value}</p>
        </div>
      )}
    </div>
  );
}

function TimelineStep({ week, title, items }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
          {week.split(' ')[1]}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-sm text-slate-600 mb-3">{week}</p>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}