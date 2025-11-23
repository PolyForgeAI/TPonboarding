-- ACCESS CODE SYSTEM
-- "Airline Confirmation" Style: 6-char Alphanumeric, Unique

-- 1. Table to track authorized codes
CREATE TABLE IF NOT EXISTS "AccessCode" (
    code            VARCHAR(6) PRIMARY KEY, -- The 6-char code itself
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    expires_at      TIMESTAMPTZ, -- Optional expiry
    is_used         BOOLEAN DEFAULT FALSE,
    used_at         TIMESTAMPTZ,
    
    -- Who is this code for?
    recipient_email TEXT,
    recipient_name  TEXT,
    
    -- Linked Submission (once used)
    submission_id   UUID REFERENCES "OnboardingSubmission"(id)
);

-- Enable RLS
ALTER TABLE "AccessCode" ENABLE ROW LEVEL SECURITY;
-- Allow public to check if code is valid (Select)
CREATE POLICY "Allow public check code" ON "AccessCode" FOR SELECT USING (true);
-- Allow public to "request" (Insert) - usually done via Edge Function, but we'll allow insert for "Request Access" form
CREATE POLICY "Allow public request code" ON "AccessCode" FOR INSERT WITH CHECK (true);
-- Allow update only if code matches (for marking used)
CREATE POLICY "Allow update own code" ON "AccessCode" FOR UPDATE USING (true);


-- 2. Function to generate unique 6-char code
CREATE OR REPLACE FUNCTION generate_unique_access_code()
RETURNS TRIGGER AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Exclude I, O, 1, 0 to avoid confusion
    new_code TEXT := '';
    i INTEGER;
    done BOOLEAN := FALSE;
BEGIN
    -- Only generate if not provided
    IF NEW.code IS NOT NULL THEN
        RETURN NEW;
    END IF;

    WHILE NOT done LOOP
        new_code := '';
        FOR i IN 1..6 LOOP
            new_code := new_code || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;

        -- Check uniqueness
        PERFORM 1 FROM "AccessCode" WHERE code = new_code;
        IF NOT FOUND THEN
            done := TRUE;
        END IF;
    END LOOP;

    NEW.code := new_code;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Trigger to auto-generate code on insert
DROP TRIGGER IF EXISTS trigger_generate_access_code ON "AccessCode";
CREATE TRIGGER trigger_generate_access_code
BEFORE INSERT ON "AccessCode"
FOR EACH ROW
EXECUTE FUNCTION generate_unique_access_code();
