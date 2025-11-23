import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  TrendingUp, 
  Target, 
  Flame, 
  DollarSign, 
  Users,
  ArrowRight,
  Sparkles,
  Award,
  Brain,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function StrategyDashboard() {
  const { data: submissions } = useQuery({
    queryKey: ['all-submissions'],
    queryFn: () => base44.entities.OnboardingSubmission.list('-created_date', 100),
    initialData: [],
  });

  const stats = {
    total_leads: submissions.length,
    hot_leads: submissions.filter(s => s.lead_temperature === "HOT").length,
    warm_leads: submissions.filter(s => s.lead_temperature === "WARM").length,
    cold_leads: submissions.filter(s => s.lead_temperature === "COLD").length,
    completed: submissions.filter(s => s.status === "completed").length,
    avg_score: submissions.filter(s => s.lead_score).length > 0 
      ? Math.round(submissions.filter(s => s.lead_score).reduce((sum, s) => sum + s.lead_score, 0) / submissions.filter(s => s.lead_score).length)
      : 0,
    this_week: submissions.filter(s => {
      const created = new Date(s.created_date);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return created > weekAgo;
    }).length,
    estimated_value: submissions.filter(s => s.design_concepts?.length > 0).reduce((sum, s) => {
      const cost = s.design_concepts[0]?.estimated_cost || "$0";
      const num = parseFloat(cost.replace(/[^0-9]/g, '')) || 0;
      return sum + num;
    }, 0),
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const topLeads = submissions
    .filter(s => s.lead_score)
    .sort((a, b) => b.lead_score - a.lead_score)
    .slice(0, 5);

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass p-8 rounded-3xl border-2 border-white/30 shadow-floating">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-4 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  Executive Strategy Dashboard
                </h1>
                <p className="text-slate-600 mt-1">
                  Real-time sales intelligence and market domination metrics
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="bento-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bento-card border-none shadow-elevated card-lift">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                  <Badge className="bg-blue-600 text-lg px-3 py-1">{stats.total_leads}</Badge>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.total_leads}</h3>
                <p className="text-sm text-slate-600">Total Pipeline</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bento-card border-none shadow-elevated card-lift bg-gradient-to-br from-red-50 to-rose-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Flame className="w-8 h-8 text-red-600" />
                  <Badge className="bg-red-600 text-lg px-3 py-1">{stats.hot_leads}</Badge>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">🔥 {stats.hot_leads}</h3>
                <p className="text-sm text-slate-600">Hot Leads (80-100)</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bento-card border-none shadow-elevated card-lift bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <Badge className="bg-green-600 text-lg px-3 py-1">{formatCurrency(stats.estimated_value)}</Badge>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(stats.estimated_value)}</h3>
                <p className="text-sm text-slate-600">Pipeline Value</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bento-card border-none shadow-elevated card-lift bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                  <Badge className="bg-purple-600 text-lg px-3 py-1">{stats.this_week}</Badge>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.this_week}</h3>
                <p className="text-sm text-slate-600">New This Week</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Lead Temperature Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bento-card border-none shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-cyan-600" />
                Lead Temperature Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-red-200 text-center">
                  <Flame className="w-12 h-12 text-red-600 mx-auto mb-3" />
                  <p className="text-5xl font-bold text-red-700 mb-2">{stats.hot_leads}</p>
                  <p className="text-sm text-slate-600">🔥 HOT (80-100)</p>
                  <p className="text-xs text-slate-500 mt-2">Immediate follow-up required</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 text-center">
                  <div className="text-5xl mb-3">☀️</div>
                  <p className="text-5xl font-bold text-amber-700 mb-2">{stats.warm_leads}</p>
                  <p className="text-sm text-slate-600">WARM (50-79)</p>
                  <p className="text-xs text-slate-500 mt-2">Regular nurturing needed</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 text-center">
                  <div className="text-5xl mb-3">❄️</div>
                  <p className="text-5xl font-bold text-blue-700 mb-2">{stats.cold_leads}</p>
                  <p className="text-sm text-slate-600">COLD (0-49)</p>
                  <p className="text-xs text-slate-500 mt-2">Drip campaign</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Priority Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bento-card border-none shadow-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  Top Priority Leads
                </CardTitle>
                <Link to={createPageUrl("AdminDashboard")}>
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topLeads.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No scored leads yet. Score leads from Admin Dashboard.</p>
                ) : (
                  topLeads.map((lead, idx) => (
                    <div key={lead.id} className="p-4 glass rounded-xl border-2 border-white/30 hover:border-cyan-300/50 transition-all card-lift">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-slate-400">#{idx + 1}</div>
                          <div>
                            <h4 className="font-bold text-slate-900">{lead.contact_name}</h4>
                            <p className="text-sm text-slate-600">{lead.property_city}, {lead.property_state}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-3xl font-bold text-slate-900">{lead.lead_score}</p>
                            <Badge className={
                              lead.lead_temperature === "HOT" ? "bg-red-600" :
                              lead.lead_temperature === "WARM" ? "bg-amber-600" :
                              "bg-blue-600"
                            }>
                              {lead.lead_temperature}
                            </Badge>
                          </div>
                          <Link to={createPageUrl("SalesHub") + `?token=${lead.access_token}`}>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                              <Target className="w-4 h-4 mr-2" />
                              Sales Hub
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Link to={createPageUrl("IntelligenceCenter")}>
              <Card className="bento-card border-none shadow-elevated card-lift h-full cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="p-4 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl inline-flex mb-4 shadow-lg group-hover:shadow-xl transition-all">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Market Intelligence</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Design trends, neighborhood mapping, weather insights
                  </p>
                  <div className="flex items-center text-cyan-600 font-semibold">
                    Explore Tools
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Link to={createPageUrl("AdminDashboard")}>
              <Card className="bento-card border-none shadow-elevated card-lift h-full cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl inline-flex mb-4 shadow-lg group-hover:shadow-xl transition-all">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Project Management</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Manage all customer projects, access codes, versions
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold">
                    Open Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Link to={createPageUrl("StrategicResearch")}>
              <Card className="bento-card border-none shadow-elevated card-lift h-full cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl inline-flex mb-4 shadow-lg group-hover:shadow-xl transition-all">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Growth Opportunities</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Industry expansion plans, business models, competitive edge
                  </p>
                  <div className="flex items-center text-emerald-600 font-semibold">
                    View Research
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* AI Capabilities Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="bento-card border-none shadow-elevated">
            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Award className="w-6 h-6" />
                AI-Powered Competitive Advantages
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <AICapability
                  icon={<Brain className="w-6 h-6" />}
                  title="Lead Scoring AI"
                  description="Predict close probability with 85%+ accuracy"
                  color="purple"
                />
                <AICapability
                  icon={<Sparkles className="w-6 h-6" />}
                  title="Design Trend Prediction"
                  description="Stay ahead with Pinterest/Instagram insights"
                  color="pink"
                />
                <AICapability
                  icon={<DollarSign className="w-6 h-6" />}
                  title="Price Optimization"
                  description="Maximize profit without losing deals"
                  color="green"
                />
                <AICapability
                  icon={<Target className="w-6 h-6" />}
                  title="Neighborhood Targeting"
                  description="Find every prospect in any area"
                  color="blue"
                />
                <AICapability
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Competitor Intelligence"
                  description="Know their weaknesses, exploit gaps"
                  color="red"
                />
                <AICapability
                  icon={<Zap className="w-6 h-6" />}
                  title="Objection Handler"
                  description="Never be caught off-guard again"
                  color="amber"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Card className="bento-card border-none shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                8-10x Growth Capacity Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Current Pipeline</span>
                    <span className="text-sm text-slate-600">{stats.completed} closed / {stats.total_leads} total</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500"
                      style={{ width: `${(stats.completed / stats.total_leads) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 neu">
                    <p className="text-sm text-slate-600 mb-1">Current</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.completed}</p>
                  </div>
                  <div className="text-center p-4 neu">
                    <p className="text-sm text-slate-600 mb-1">5x Target</p>
                    <p className="text-2xl font-bold text-amber-700">{stats.completed * 5}</p>
                  </div>
                  <div className="text-center p-4 neu">
                    <p className="text-sm text-slate-600 mb-1">8x Target</p>
                    <p className="text-2xl font-bold text-purple-700">{stats.completed * 8}</p>
                  </div>
                  <div className="text-center p-4 neu">
                    <p className="text-sm text-slate-600 mb-1">10x Target</p>
                    <p className="text-2xl font-bold text-green-700">{stats.completed * 10}</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">With AI Tools: 8-10x is Achievable</h3>
                  <p className="text-cyan-100">
                    Lead scoring, automated follow-ups, objection handling, and competitive intelligence
                    give you the edge to close faster and scale faster.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function AICapability({ icon, title, description, color }) {
  const colorMap = {
    purple: "from-purple-500 to-fuchsia-500",
    pink: "from-pink-500 to-rose-500",
    green: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-cyan-500",
    red: "from-red-500 to-rose-500",
    amber: "from-amber-500 to-orange-500"
  };

  return (
    <div className="p-4 glass rounded-xl border-2 border-white/20 hover:border-white/40 transition-all card-lift">
      <div className={`p-3 bg-gradient-to-r ${colorMap[color]} rounded-xl inline-flex mb-3 shadow-lg text-white`}>
        {icon}
      </div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}