-- PRE-FLIGHT CHECK: Create remaining tables for autonomous run

-- 1. System Settings (Global configurations for the app)
CREATE TABLE IF NOT EXISTS "SystemSettings" (
    key             TEXT PRIMARY KEY,
    value           JSONB NOT NULL,
    description     TEXT,
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_by      UUID REFERENCES "User"(id)
);

-- Enable RLS and allow public read (for frontend config)
ALTER TABLE "SystemSettings" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read settings" ON "SystemSettings" FOR SELECT USING (true);
-- Only admin can update (we'll assume manual updates for now or future admin tool)

-- 2. Email/Notification Logs (To track what the system sends)
CREATE TABLE IF NOT EXISTS "NotificationLog" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    recipient       TEXT NOT NULL,
    subject         TEXT,
    body            TEXT,
    status          TEXT, -- 'sent', 'failed', 'queued'
    error_message   TEXT,
    submission_id   UUID REFERENCES "OnboardingSubmission"(id)
);

-- Enable RLS
ALTER TABLE "NotificationLog" ENABLE ROW LEVEL SECURITY;
-- Allow anon to insert (if the edge function runs as anon) or service role
CREATE POLICY "Allow anon insert logs" ON "NotificationLog" FOR INSERT WITH CHECK (true);

-- 3. Ensure DossierAnalysis exists (Just in case)
CREATE TABLE IF NOT EXISTS "DossierAnalysis" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submission_id   UUID NOT NULL REFERENCES "OnboardingSubmission"(id) ON DELETE CASCADE,
    executive_summary   TEXT,
    key_insights        JSONB,
    suggested_strategy  TEXT,
    red_flags           TEXT,
    upsell_opportunities JSONB,
    model_used          TEXT,
    analysis_version    TEXT,
    confidence_score    NUMERIC,
    status              TEXT DEFAULT 'draft'
);
ALTER TABLE "DossierAnalysis" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for all users" ON "DossierAnalysis";
CREATE POLICY "Enable all access for all users" ON "DossierAnalysis" USING (true) WITH CHECK (true);
