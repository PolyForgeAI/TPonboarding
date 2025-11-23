import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Using Anon key might not be enough to change RLS if not admin, but let's try. 
// Actually, to change RLS we usually need the SERVICE_ROLE key or direct SQL connection.
// Since I don't have the service role key in env (usually), I should try the direct postgres connection again with the fixed string if possible, 
// OR just try to run it via the client if the anon key has high privileges (unlikely).

// Let's try the direct connection first as that is 'admin' level.
import pg from 'pg';
const { Client } = pg;

// Connection string from setup_db.js (which worked previously for schema setup)
const connectionString = 'postgresql://postgres.hinxpvkjunymuotrtlbg:htKgRgJraj5T0Qng@aws-0-us-east-1.pooler.supabase.com:5432/postgres';

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function applyRLS() {
    try {
        await client.connect();
        console.log('Connected to Supabase via Postgres.');

        const sql = fs.readFileSync('./fix_rls.sql', 'utf8');
        console.log('Applying RLS policies...');

        await client.query(sql);

        console.log('RLS policies applied successfully.');
    } catch (err) {
        console.error('Error applying RLS:', err);
    } finally {
        await client.end();
    }
}

applyRLS();
