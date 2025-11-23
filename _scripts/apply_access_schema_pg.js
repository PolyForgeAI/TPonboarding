import fs from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

// Use the DATABASE_URL from .env if available, otherwise fallback (which might fail if not updated)
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.hinxpvkjunymuotrtlbg:htKgRgJraj5T0Qng@aws-0-us-east-1.pooler.supabase.com:5432/postgres';

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function apply() {
    try {
        await client.connect();
        console.log('Connected to Supabase via Postgres.');

        const sql = fs.readFileSync('./access_code_schema.sql', 'utf8');
        console.log('Applying Access Code Schema...');

        await client.query(sql);

        console.log('Schema applied successfully.');
    } catch (err) {
        console.error('Error applying schema:', err);
        console.log('Please run ./access_code_schema.sql manually in Supabase Dashboard.');
    } finally {
        await client.end();
    }
}

apply();
