import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testNewSchema() {
    console.log('Testing connection to "OnboardingSubmission"...');

    const testCode = 'TEST' + Math.floor(Math.random() * 10000);

    // Try to insert a row
    const { data, error } = await supabase
        .from('OnboardingSubmission') // Note the casing
        .insert([
            {
                status: 'in_progress',
                current_step: 1,
                access_code: testCode,
                contact_name: 'Schema Test User',
                contact_email: `test-${testCode}@example.com`
            }
        ])
        .select();

    if (error) {
        console.error('Insert Error:', error);

        // Try lowercase if mixed case fails
        if (error.code === '42P01') { // undefined_table
            console.log('Retrying with lowercase "onboardingsubmission"...');
            const { data: data2, error: error2 } = await supabase
                .from('onboardingsubmission')
                .insert([
                    {
                        status: 'in_progress',
                        current_step: 1,
                        access_code: testCode,
                        contact_name: 'Schema Test User',
                        contact_email: `test-${testCode}@example.com`
                    }
                ])
                .select();

            if (error2) {
                console.error('Lowercase Insert Error:', error2);
            } else {
                console.log('Lowercase Insert Success:', data2);
            }
        }
    } else {
        console.log('Insert Success:', data);
    }
}

testNewSchema();
