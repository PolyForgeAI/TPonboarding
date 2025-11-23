import 'dotenv/config';
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

console.log('Checking environment variables...');
const dbUrl = process.env.DATABASE_URL;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('DATABASE_URL present:', !!dbUrl);
console.log('VITE_SUPABASE_URL:', supabaseUrl);
console.log('VITE_SUPABASE_ANON_KEY present:', !!supabaseKey);

async function testSupabaseSDK() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Missing Supabase URL or Key');
        return;
    }

    console.log('\nTesting Supabase SDK connection...');
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Try to fetch something public or just check health
        const { data, error } = await supabase.from('Material').select('count').limit(1);

        if (error) {
            console.error('❌ Supabase SDK Error:', error.message);
        } else {
            console.log('✅ Supabase SDK Connected! (Material table accessible)');
        }
    } catch (err) {
        console.error('❌ Supabase SDK Exception:', err.message);
    }
}

async function testDirectDB() {
    if (!dbUrl) {
        console.log('\n⚠️ Skipping Direct DB Test (DATABASE_URL missing)');
        return;
    }

    console.log('\nTesting Direct DB connection...');
    const client = new pg.Client({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('✅ Direct DB Connected!');
        await client.end();
    } catch (err) {
        console.error('❌ Direct DB Connection error:', err.message);
    }
}

async function run() {
    await testSupabaseSDK();
    await testDirectDB();
}

run();
