import { supabase } from "@/shared/lib/supabaseClient";
import { AIService } from "./aiService";

export const DossierService = {
    // Get or Create a Dossier for a Submission
    getDossier: async (submissionId) => {
        const { data, error } = await supabase
            .from('DossierAnalysis')
            .select('*')
            .eq('submission_id', submissionId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            console.error("Error fetching dossier:", error);
            return null;
        }

        return data;
    },

    // Trigger a new analysis
    generateDossier: async (submissionId) => {
        try {
            // 1. Fetch the submission data
            const { data: submission, error: subError } = await supabase
                .from('OnboardingSubmission')
                .select('*')
                .eq('id', submissionId)
                .single();

            if (subError) throw subError;

            // 2. Run AI Analysis
            const analysis = await AIService.analyzeSubmission(submission);

            // 3. Save to DossierAnalysis table
            const dossierData = {
                submission_id: submissionId,
                executive_summary: analysis.executive_summary,
                key_insights: analysis.key_insights,
                suggested_strategy: analysis.suggested_strategy,
                red_flags: analysis.red_flags,
                upsell_opportunities: analysis.upsell_opportunities,
                confidence_score: analysis.confidence_score,
                model_used: 'Mock-v1', // or 'GPT-4'
                analysis_version: '1.0',
                status: 'final'
            };

            // Check if exists to update or insert
            const existing = await DossierService.getDossier(submissionId);

            let result;
            if (existing) {
                const { data, error } = await supabase
                    .from('DossierAnalysis')
                    .update(dossierData)
                    .eq('id', existing.id)
                    .select()
                    .single();
                if (error) throw error;
                result = data;
            } else {
                const { data, error } = await supabase
                    .from('DossierAnalysis')
                    .insert([dossierData])
                    .select()
                    .single();
                if (error) throw error;
                result = data;
            }

            return result;

        } catch (error) {
            console.error("Error generating dossier:", error);
            throw error;
        }
    }
};
