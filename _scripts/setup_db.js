import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = 'postgresql://postgres.hinxpvkjunymuotrtlbg:htKgRgJraj5T0Qng@aws-0-us-east-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({
    connectionString,
});

async function runSchema() {
    try {
        await client.connect();
        console.log('Connected to database.');

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema.sql...');
        await client.query(schemaSql);
        console.log('Schema executed successfully.');

    } catch (err) {
        console.error('Error executing schema:', err);
    } finally {
        await client.end();
    }
}

runSchema();
