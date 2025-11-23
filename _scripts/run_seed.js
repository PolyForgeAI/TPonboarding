import fs from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

// Corrected connection string
const connectionString = 'postgresql://postgres.hinxpvkjunymuotrtlbg:htKgRgJraj5T0Qng@aws-0-us-east-1.pooler.supabase.com:5432/postgres';

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function seedMaterials() {
    try {
        await client.connect();
        console.log('Connected to Supabase.');

        const sql = fs.readFileSync('./seed_premium_materials.sql', 'utf8');
        console.log('Executing seed script...');

        await client.query(sql);

        console.log('Seed completed successfully.');
    } catch (err) {
        console.error('Error seeding materials:', err);
    } finally {
        await client.end();
    }
}

seedMaterials();
