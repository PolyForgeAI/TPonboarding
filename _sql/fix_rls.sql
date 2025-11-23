-- Enable RLS on tables (good practice, even if we open them up)
ALTER TABLE "OnboardingSubmission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Material" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Feature" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON "OnboardingSubmission";
DROP POLICY IF EXISTS "Enable insert access for all users" ON "OnboardingSubmission";
DROP POLICY IF EXISTS "Enable update access for all users" ON "OnboardingSubmission";

DROP POLICY IF EXISTS "Enable read access for all users" ON "Material";
DROP POLICY IF EXISTS "Enable read access for all users" ON "Feature";

-- Create permissive policies for the Onboarding App (Public/Anon access)

-- OnboardingSubmission: Allow Anon to Insert, Select, and Update
CREATE POLICY "Enable read access for all users" ON "OnboardingSubmission"
FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON "OnboardingSubmission"
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON "OnboardingSubmission"
FOR UPDATE USING (true);

-- Material & Feature: Allow Anon to Select (Read-only catalog)
CREATE POLICY "Enable read access for all users" ON "Material"
FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "Feature"
FOR SELECT USING (true);
