import React, { useState, useEffect } from "react";
import { supabase } from "@/shared/lib/supabaseClient";
import AdminLayout from "../components/AdminLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, DollarSign, FileText, TrendingUp, ArrowRight, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeDossiers: 0,
    pipelineValue: 0,
    conversionRate: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent submissions
      const { data: submissions, error } = await supabase
        .from('OnboardingSubmission')
        .select('*')
        .order('created_date', { ascending: false })
        .limit(5);

      if (error) throw error;

      // Mock stats for demo (in real app, calculate from DB)
      setStats({
        totalLeads: 124,
        activeDossiers: 12,
        pipelineValue: 2500000,
        conversionRate: 18
      });

      setRecentLeads(submissions || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendUp }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-serif font-bold text-foreground">{value}</div>
        <p className={`text-xs mt-1 ${trendUp ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
          {trend}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Mission Control</h1>
          <p className="text-muted-foreground">Overview of your design pipeline and active dossiers.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Dossier
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatCard
          title="Active Dossiers"
          value={stats.activeDossiers}
          icon={FileText}
          trend="+4 new this week"
          trendUp={true}
        />
        <StatCard
          title="Pipeline Value"
          value={`$${(stats.pipelineValue / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          trend="+8% vs target"
          trendUp={true}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          trend="-2% from last month"
          trendUp={false}
        />
      </div>

      {/* Recent Leads Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-3 rounded-l-lg">Contact</th>
                  <th className="px-6 py-3">Vision</th>
                  <th className="px-6 py-3">Budget</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      <div>{lead.contact_name || 'Anonymous'}</div>
                      <div className="text-xs text-muted-foreground">{lead.contact_email}</div>
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate text-muted-foreground">
                      {lead.pool_vision || 'No vision provided'}
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {lead.budget_range || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={lead.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/dossier/${lead.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View Dossier <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {recentLeads.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Clock className="w-8 h-8 opacity-50" />
                        No submissions found yet.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}