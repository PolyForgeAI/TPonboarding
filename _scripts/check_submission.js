import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkSubmission() {
    const code = '7T5RHHNY'; // Code from browser session
    console.log(`Checking submission for code: ${code}`);

    const { data, error } = await supabase
        .from('OnboardingSubmission')
        .select('*')
        .eq('access_code', code)
        .single();

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Submission found:');
        console.log('ID:', data.id);
        console.log('Status:', data.status);
        console.log('Contact Name:', data.contact_name); // Should be 'Schema Test'
        console.log('Property Data:', JSON.stringify(data.property_data, null, 2));
        console.log('Usage Intent:', JSON.stringify(data.usage_intent, null, 2));
    }
}

checkSubmission();
