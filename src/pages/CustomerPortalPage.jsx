import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { createPageUrl } from "@/utils";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import CustomerPortal from "../components/customer/CustomerPortal";

export default function CustomerPortalPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [accessCode, setAccessCode] = useState("");
  const [submission, setSubmission] = useState(null);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['submission-by-token', token],
    queryFn: async () => {
      if (!token) return null;
      const results = await base44.entities.OnboardingSubmission.filter(
        { access_token: token },
        "-created_date",
        1
      );
      return results;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (submissions && submissions.length > 0) {
      setSubmission(submissions[0]);
    }
  }, [submissions]);

  const handleCodeSubmit = async () => {
    const results = await base44.entities.OnboardingSubmission.filter({
      access_code: accessCode.toUpperCase()
    });
    
    if (results && results.length > 0) {
      navigate(createPageUrl("CustomerPortalPage") + `?token=${results[0].access_token}`);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-cyan-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full glass">
          <CardContent className="p-12">
            <Lock className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-white text-center mb-4">
              Customer Portal Access
            </h1>
            <p className="text-slate-300 text-center mb-6">
              Enter your access code to view your project
            </p>
            <div className="space-y-4">
              <Input
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="ABC-123"
                className="text-center text-lg tracking-wider bg-white/90"
                maxLength={7}
                onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
              />
              <Button
                onClick={handleCodeSubmit}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600"
                size="lg"
              >
                Access Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !submission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <CustomerPortal submission={submission} />
      </div>
    </div>
  );
}