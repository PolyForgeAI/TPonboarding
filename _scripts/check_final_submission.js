import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkFinalSubmission() {
    const email = 'auto2@test.com';
    console.log(`Checking submission for email: ${email}`);

    // We need to query by the JSONB field or just scan recent submissions if email is not a top-level column?
    // Wait, contact_email IS a top-level column in the new schema.

    const { data, error } = await supabase
        .from('OnboardingSubmission')
        .select('*')
        .eq('contact_email', email)
        .single();

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Submission found:');
        console.log('ID:', data.id);
        console.log('Status:', data.status);
        console.log('Contact Name:', data.contact_name);
        console.log('Budget Range:', data.budget_range);
        console.log('Vision:', data.pool_vision);
        console.log('Desired Features:', data.desired_features);
    }
}

checkFinalSubmission();
