-- Migration: 001_referral_system
-- Description: Adds support for referral tracking and "Golden Ticket" access codes.

-- 1. Add referrer_id to AccessCode table
-- This links an access code to the customer who generated it (the "Ambassador")
ALTER TABLE "AccessCode" 
ADD COLUMN "referrer_id" UUID REFERENCES "OnboardingSubmission"("id");

-- 2. Add referral_code to AccessCode table
-- This is the human-readable code (e.g., "THOMAS-VIP")
ALTER TABLE "AccessCode" 
ADD COLUMN "referral_code" TEXT UNIQUE;

-- 3. Add referrer_id to OnboardingSubmission table
-- This tracks who referred the new customer
ALTER TABLE "OnboardingSubmission" 
ADD COLUMN "referrer_id" UUID REFERENCES "OnboardingSubmission"("id");

-- 4. Create index for faster lookups
CREATE INDEX "idx_access_code_referrer" ON "AccessCode"("referrer_id");
CREATE INDEX "idx_submission_referrer" ON "OnboardingSubmission"("referrer_id");

-- 5. Comment
COMMENT ON COLUMN "AccessCode"."referrer_id" IS 'The ID of the customer who owns this referral code';
COMMENT ON COLUMN "OnboardingSubmission"."referrer_id" IS 'The ID of the customer who referred this submission';
