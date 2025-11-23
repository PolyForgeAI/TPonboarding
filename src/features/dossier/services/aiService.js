import { supabase } from "@/shared/lib/supabaseClient";

// Mock AI response generator if no API key is present
const generateMockAnalysis = (submission) => {
    const vision = submission.pool_vision || "a beautiful backyard oasis";
    const features = submission.desired_features || [];

    return {
        executive_summary: `Based on the client's vision for "${vision}", we recommend a design that emphasizes natural aesthetics and functional entertainment spaces. The inclusion of ${features.join(', ')} aligns well with a high-end lifestyle upgrade.`,
        key_insights: [
            "Client values aesthetics but needs practical functionality.",
            "Budget range suggests potential for premium material upgrades.",
            "Timeline indicates a desire for summer readiness."
        ],
        suggested_strategy: "Focus on the 'Resort at Home' concept. Propose the 'Blue Surf' PebbleTec finish to match their desire for a tropical look. Highlight the low-maintenance benefits of the Jandy automation system.",
        red_flags: "Site access might be tight based on the property address (needs verification).",
        upsell_opportunities: [
            { item: "OmniLogic Smart Control", reason: "Matches tech-savvy profile" },
            { item: "Travertine Coping", reason: "Elevates the natural aesthetic" }
        ],
        confidence_score: 0.85
    };
};

export const AIService = {
    analyzeSubmission: async (submission) => {
        console.log("Analyzing submission:", submission.id);

        // TODO: Integrate real OpenAI/Gemini call here if API key exists
        // const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        return generateMockAnalysis(submission);
    }
};
