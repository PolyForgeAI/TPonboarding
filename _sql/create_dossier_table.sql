-- TABLE: DossierAnalysis
-- Stores AI-generated insights, strategy, and analysis for a submission.

CREATE TABLE IF NOT EXISTS "DossierAnalysis" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    submission_id   UUID NOT NULL REFERENCES "OnboardingSubmission"(id) ON DELETE CASCADE,
    
    -- Analysis Data
    executive_summary   TEXT,
    key_insights        JSONB, -- Array of strings or objects
    suggested_strategy  TEXT,
    red_flags           TEXT, -- Critical issues to address
    upsell_opportunities JSONB, -- Array of potential upgrades based on preferences
    
    -- AI Metadata
    model_used          TEXT,
    analysis_version    TEXT,
    confidence_score    NUMERIC,
    
    -- Status
    status              TEXT DEFAULT 'draft' -- draft, final, archived
);

-- Enable RLS
ALTER TABLE "DossierAnalysis" ENABLE ROW LEVEL SECURITY;

-- Allow Public Read (for now, or restricted to Admin in real app)
-- For this demo, we'll allow anon to read/insert so the 'engine' can work without auth if needed
CREATE POLICY "Enable all access for all users" ON "DossierAnalysis"
USING (true)
WITH CHECK (true);
