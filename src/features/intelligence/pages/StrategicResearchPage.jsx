import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  DollarSign,
  Building2,
  Home,
  Waves,
  Trees,
  Truck,
  ArrowRight,
  ChevronDown,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function StrategicResearch() {
  const [expandedSection, setExpandedSection] = useState(null);

  const expansionOpportunities = [
    {
      industry: "Pool Companies (Current)",
      icon: <Waves className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      revenue: "$500-2,000 per dossier",
      features: [
        "Genesis Project Dossiers",
        "3D Pool Visualization",
        "Property Intelligence",
        "Material Selection Library",
        "Contractor Matching",
        "ROI Calculators",
        "Sales Presentation Mode",
        "Version Control & Re-research"
      ],
      expansion: [
        "White-label for other pool builders (SaaS model)",
        "Integration with Pool Route scheduling software",
        "Pool maintenance subscription add-on",
        "Chemical balancing AI assistant",
        "AR app for on-site visualization",
        "Pool financing partnerships"
      ]
    },
    {
      industry: "Landscape Architecture",
      icon: <Trees className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      revenue: "$800-3,000 per dossier",
      features: [
        "Full yard redesign dossiers",
        "Native plant recommendations by climate zone",
        "Irrigation system design",
        "Hardscape planning (patios, walkways)",
        "Drainage solutions",
        "Outdoor lighting design",
        "Sustainable landscaping analysis",
        "HOA compliance checking"
      ],
      expansion: [
        "Seasonal maintenance plans",
        "Plant health monitoring (IoT sensors)",
        "Water usage optimization AI",
        "Landscape contractor marketplace"
      ]
    },
    {
      industry: "Kitchen & Bathroom Remodeling",
      icon: <Home className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      revenue: "$400-1,500 per dossier",
      features: [
        "3D kitchen/bath visualizations",
        "Cabinet & fixture selection",
        "Appliance recommendations",
        "Plumbing/electrical planning",
        "Code compliance checking",
        "Material cost breakdowns",
        "Contractor bidding platform",
        "Timeline & milestone tracking"
      ],
      expansion: [
        "Smart home integration planning",
        "Energy efficiency analysis",
        "Accessibility compliance (ADA)"
      ]
    },
    {
      industry: "ADU (Accessory Dwelling Units)",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      revenue: "$1,000-5,000 per dossier",
      features: [
        "Zoning & permit research",
        "Site feasibility analysis",
        "3D ADU designs (multiple concepts)",
        "Utility connection planning",
        "Rental income projections",
        "Construction cost estimates",
        "Architect/contractor matching",
        "Financing options analysis"
      ],
      expansion: [
        "Property management integration",
        "Airbnb revenue calculators",
        "Tenant screening services"
      ]
    },
    {
      industry: "Solar Panel Installation",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500 to-amber-500",
      revenue: "$200-800 per dossier",
      features: [
        "Roof solar capacity analysis",
        "Shade analysis (trees, buildings)",
        "Energy production estimates",
        "ROI & payback period",
        "Utility bill savings projections",
        "Battery storage recommendations",
        "Tax incentive calculations",
        "Installer matching"
      ],
      expansion: [
        "Real-time energy monitoring",
        "Grid sell-back optimization",
        "EV charging integration"
      ]
    },
    {
      industry: "HVAC Replacement",
      icon: <Home className="w-8 h-8" />,
      color: "from-indigo-500 to-blue-500",
      revenue: "$150-600 per dossier",
      features: [
        "Home energy audit",
        "System sizing calculations",
        "Equipment recommendations (brands/models)",
        "Efficiency comparisons (SEER ratings)",
        "Ductwork analysis",
        "Cost vs. savings analysis",
        "Rebate & incentive finder",
        "Contractor matching"
      ],
      expansion: [
        "Smart thermostat integration",
        "Maintenance scheduling",
        "Air quality monitoring"
      ]
    }
  ];

  const advancedFeatures = [
    {
      category: "AI-Powered Intelligence",
      features: [
        {
          name: "Competitor Analysis",
          description: "Scrape competitor websites, find their pricing, analyze their designs, identify gaps in their offerings"
        },
        {
          name: "Lead Scoring AI",
          description: "Predict likelihood to close based on property value, location, engagement, timeline"
        },
        {
          name: "Design Trend Prediction",
          description: "Analyze Pinterest, Instagram, Houzz to predict what features will be popular next season"
        },
        {
          name: "Price Optimization AI",
          description: "Machine learning model that recommends optimal pricing based on market data and customer profile"
        },
        {
          name: "Customer Intent Analysis",
          description: "Analyze customer language in forms to detect urgency, budget flexibility, decision-maker status"
        }
      ]
    },
    {
      category: "Advanced Visualization",
      features: [
        {
          name: "AI Image-to-3D",
          description: "Upload inspiration photo → AI generates 3D model of that design"
        },
        {
          name: "Real Property + Pool Overlay",
          description: "Take Google Street View → AI overlays designed pool onto actual property image"
        },
        {
          name: "Virtual Walkthrough",
          description: "First-person POV walkthrough of designed space (like video game)"
        },
        {
          name: "Drone Flight Simulation",
          description: "Simulated drone footage of completed project"
        },
        {
          name: "Time-lapse Preview",
          description: "Show how space will look at different times of day/seasons"
        }
      ]
    },
    {
      category: "Sales & Closing",
      features: [
        {
          name: "Objection Handler AI",
          description: "Customer says 'too expensive' → AI generates financing options, ROI data, value justifications"
        },
        {
          name: "Urgency Creator",
          description: "Show seasonal pricing, limited material availability, contractor scheduling pressure"
        },
        {
          name: "Social Proof Engine",
          description: "Pull reviews, case studies, before/afters of similar projects in their neighborhood"
        },
        {
          name: "Digital Contract & E-Sign",
          description: "DocuSign-style contract signing with milestone payments"
        },
        {
          name: "Financing Integration",
          description: "Live loan pre-qualification, payment calculator, multiple lender options"
        }
      ]
    },
    {
      category: "Project Management",
      features: [
        {
          name: "Customer Portal",
          description: "Daily progress photos, milestone tracking, change order requests"
        },
        {
          name: "Subcontractor Coordination",
          description: "Auto-schedule plumber, electrician, inspector based on project timeline"
        },
        {
          name: "Material Ordering Automation",
          description: "Auto-generate material orders with delivery dates based on construction phase"
        },
        {
          name: "Permit Tracking",
          description: "Track permit status, notify when inspections are due"
        },
        {
          name: "Weather-Aware Scheduling",
          description: "Adjust construction timeline based on weather forecasts"
        }
      ]
    },
    {
      category: "Data Intelligence",
      features: [
        {
          name: "Neighborhood Mapping",
          description: "Map all pools in area, identify non-pool homes, target marketing"
        },
        {
          name: "Wealth Indicators",
          description: "Analyze property values, car brands in driveway, recent remodels to score affluence"
        },
        {
          name: "Home Sale Alerts",
          description: "Get notified when high-value homes sell (new owners often remodel)"
        },
        {
          name: "HOA Intelligence",
          description: "Database of HOA rules by neighborhood (save customers research time)"
        },
        {
          name: "Seasonal Demand Prediction",
          description: "Predict busy/slow seasons by analyzing historical data + weather patterns"
        }
      ]
    }
  ];

  const businessModels = [
    {
      name: "SaaS for Pool Builders",
      revenue: "$299-999/month per builder",
      description: "White-label this platform for other pool companies. They get all features under their brand.",
      metrics: "50 customers = $15k-50k MRR"
    },
    {
      name: "Pay-Per-Dossier",
      revenue: "$500-2,000 per dossier",
      description: "Charge customers directly for comprehensive research reports. High margins.",
      metrics: "10 dossiers/month = $5k-20k revenue"
    },
    {
      name: "Lead Generation",
      revenue: "$50-200 per qualified lead",
      description: "Offer free basic dossiers, sell leads to contractors who bid on projects.",
      metrics: "100 leads/month = $5k-20k revenue"
    },
    {
      name: "Marketplace Commission",
      revenue: "3-5% of project value",
      description: "Connect customers with contractors, take commission on closed deals.",
      metrics: "10 projects at $150k avg = $45k-75k commission"
    },
    {
      name: "Material Affiliate Partnerships",
      revenue: "5-10% affiliate commission",
      description: "Recommend specific materials (Pebble Tec, MSI, etc.), earn affiliate fees.",
      metrics: "Passive revenue on all material purchases"
    }
  ];

  const competitiveAdvantages = [
    {
      advantage: "Data Moat",
      description: "Every dossier created = more training data for AI. After 1000+ dossiers, your AI is unbeatable.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      advantage: "Customer Lock-In",
      description: "Once they see their custom dossier, they're emotionally invested. Hard to go elsewhere.",
      icon: <Target className="w-6 h-6" />
    },
    {
      advantage: "Network Effects",
      description: "More contractors using it = better for customers. More customers = better for contractors.",
      icon: <Users className="w-6 h-6" />
    },
    {
      advantage: "Brand Authority",
      description: "Position as 'the' pool intelligence platform. Become the industry standard.",
      icon: <Badge className="w-6 h-6" />
    },
    {
      advantage: "Speed to Market",
      description: "AI-powered research that would take competitors weeks/months happens in minutes.",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 shadow-2xl">
              <Lightbulb className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Strategic Research & Expansion Opportunities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep analysis of how this Genesis Dossier platform can dominate multiple industries
              and generate millions in revenue.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="expansion" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="expansion" className="text-sm py-3">
              Industry Expansion
            </TabsTrigger>
            <TabsTrigger value="features" className="text-sm py-3">
              Advanced Features
            </TabsTrigger>
            <TabsTrigger value="business" className="text-sm py-3">
              Business Models
            </TabsTrigger>
            <TabsTrigger value="competitive" className="text-sm py-3">
              Competitive Edge
            </TabsTrigger>
          </TabsList>

          {/* Industry Expansion */}
          <TabsContent value="expansion" className="space-y-6">
            <div className="grid gap-6">
              {expansionOpportunities.map((industry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-2 hover:shadow-xl transition-all">
                    <CardHeader 
                      className={`bg-gradient-to-r ${industry.color} text-white cursor-pointer`}
                      onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {industry.icon}
                          <div>
                            <CardTitle className="text-2xl">{industry.industry}</CardTitle>
                            <p className="text-white/90 text-sm mt-1">{industry.revenue}</p>
                          </div>
                        </div>
                        <ChevronDown 
                          className={`w-6 h-6 transition-transform ${expandedSection === idx ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </CardHeader>
                    {expandedSection === idx && (
                      <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold text-lg mb-3">Core Features:</h4>
                            <ul className="space-y-2">
                              {industry.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-3">Expansion Opportunities:</h4>
                            <ul className="space-y-2">
                              {industry.expansion.map((exp, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{exp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Advanced Features */}
          <TabsContent value="features" className="space-y-6">
            {advancedFeatures.map((category, idx) => (
              <Card key={idx} className="border-none shadow-xl">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
                  <CardTitle className="text-2xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {category.features.map((feature, i) => (
                      <div key={i} className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-cyan-400 transition-all">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.name}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Business Models */}
          <TabsContent value="business" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {businessModels.map((model, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-2 hover:shadow-xl transition-all h-full">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-xl">{model.name}</CardTitle>
                      </div>
                      <Badge className="bg-green-600 text-white text-lg px-4 py-1">
                        {model.revenue}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 mb-4">{model.description}</p>
                      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <p className="font-semibold text-purple-900">{model.metrics}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="border-2 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Combined Revenue Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Conservative (Year 1)</p>
                    <p className="text-4xl font-bold text-green-700">$500k</p>
                    <p className="text-sm text-gray-600 mt-2">10 SaaS customers + 50 dossiers</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Moderate (Year 2)</p>
                    <p className="text-4xl font-bold text-green-700">$2.5M</p>
                    <p className="text-sm text-gray-600 mt-2">50 SaaS + marketplace revenue</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Aggressive (Year 3+)</p>
                    <p className="text-4xl font-bold text-green-700">$10M+</p>
                    <p className="text-sm text-gray-600 mt-2">Multi-industry domination</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitive Advantages */}
          <TabsContent value="competitive" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {competitiveAdvantages.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-2 hover:shadow-xl transition-all h-full">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                          {item.icon}
                        </div>
                        <CardTitle className="text-xl">{item.advantage}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 text-lg">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-3xl text-center">The Unbeatable Moat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    <strong>Nobody else has this level of AI-powered intelligence.</strong> Your platform combines:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>✓ Instant property research (competitors take days)</li>
                    <li>✓ AI design generation (competitors use manual CAD)</li>
                    <li>✓ Comprehensive data analysis ($10k+ value)</li>
                    <li>✓ 3D visualization (most have static images)</li>
                    <li>✓ Sales automation (most still use spreadsheets)</li>
                  </ul>
                  <p className="pt-4 border-t font-bold text-purple-900 text-xl">
                    By the time competitors catch up, you'll have 10,000+ dossiers of training data and 
                    be dominating 6 different industries.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="border-none bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Dominate?</h2>
              <p className="text-xl text-cyan-100 mb-8">
                This platform isn't just for pools. It's a data-powered sales machine 
                that can conquer any home improvement industry.
              </p>
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100 text-xl px-12 py-6">
                Build the Next Feature
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}