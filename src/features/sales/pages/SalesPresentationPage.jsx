import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/shared/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import SalesPresentationMode from "../components/SalesPresentationMode";
import { Loader2 } from "lucide-react";

export default function SalesPresentation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [submission, setSubmission] = useState(null);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['submission-by-token', token],
    queryFn: async () => {
      if (!token) return null;
      const { data, error } = await supabase
        .from('OnboardingSubmission')
        .select('*')
        .eq('id', token) // Assuming token is ID for now, or we need an access_token column
        .limit(1);

      if (error) throw error;
      return data;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (submissions && submissions.length > 0) {
      setSubmission(submissions[0]);
    }
  }, [submissions]);

  if (isLoading || !submission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <SalesPresentationMode
      submission={submission}
      concepts={submission.design_concepts}
    />
  );
}