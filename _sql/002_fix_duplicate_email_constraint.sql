-- Migration: 002_fix_duplicate_email_constraint
-- Description: Remove unique constraint on contact_email to allow multiple submissions with empty emails during onboarding

-- Drop the unique index on contact_email
DROP INDEX IF EXISTS idx_submission_contact_email;

-- Add a comment explaining why we removed it
COMMENT ON COLUMN "OnboardingSubmission"."contact_email" IS 'Contact email (not unique to allow multiple in-progress submissions)';
