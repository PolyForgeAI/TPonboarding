
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import LeadScoringSystem from "../components/LeadScoringSystem";
import FollowUpAutomation from "../components/FollowUpAutomation";
import ObjectionHandler from "../components/ObjectionHandler";
import PriceOptimizer from "@/features/intelligence/components/PriceOptimizer";
import SocialProofEngine from "../components/SocialProofEngine";
import CompetitorAnalysis from "@/features/intelligence/components/CompetitorAnalysis";
import CustomerIntentAnalyzer from "@/features/intelligence/components/CustomerIntentAnalyzer";
import WealthIndicators from "@/features/intelligence/components/WealthIndicators";
import ContentLibrary from "@/features/admin/components/ContentLibrary";

export default function SalesHub() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { data: submission, isLoading } = useQuery({
    queryKey: ["submission-for-sales", token || id],
    queryFn: async () => {
      if (token) {
        const submissions = await base44.entities.OnboardingSubmission.filter({ access_token: token });
        return submissions[0];
      } else if (id) {
        const submissions = await base44.entities.OnboardingSubmission.filter({ id });
        return submissions[0];
      }
      return null;
    },
    enabled: !!(token || id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-600" />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Submission Not Found</h2>
            <p className="text-slate-600">Invalid access token or submission ID</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sales Intelligence Hub</h1>
              <p className="text-slate-600">Complete lead intelligence for {submission.contact_name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={
                submission.lead_temperature === "HOT" ? "bg-red-600" :
                  submission.lead_temperature === "WARM" ? "bg-amber-600" :
                    "bg-blue-600"
              }>
                {submission.lead_temperature || "UNSCORED"} Lead
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="score" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto">
            <TabsTrigger value="score">Score</TabsTrigger>
            <TabsTrigger value="intent">Intent</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="wealth">Wealth</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="objections">Objections</TabsTrigger>
            <TabsTrigger value="social">Social Proof</TabsTrigger>
            <TabsTrigger value="competitor">Competitors</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="score">
            <LeadScoringSystem submission={submission} />
          </TabsContent>

          <TabsContent value="intent">
            <CustomerIntentAnalyzer submission={submission} />
          </TabsContent>

          {/* NEW: Content Library Tab */}
          <TabsContent value="content">
            <ContentLibrary submission={submission} />
          </TabsContent>

          <TabsContent value="wealth">
            <WealthIndicators submission={submission} />
          </TabsContent>

          <TabsContent value="pricing">
            <PriceOptimizer submission={submission} />
          </TabsContent>

          <TabsContent value="objections">
            <ObjectionHandler submission={submission} />
          </TabsContent>

          <TabsContent value="social">
            <SocialProofEngine submission={submission} />
          </TabsContent>

          <TabsContent value="competitor">
            <CompetitorAnalysis submission={submission} />
          </TabsContent>

          <TabsContent value="automation">
            <FollowUpAutomation submission={submission} />
          </TabsContent>

          <TabsContent value="strategy">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Strategic recommendations based on lead score, intent, and profile will appear here.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
