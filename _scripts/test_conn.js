import pg from 'pg';

const connectionString = 'postgresql://postgres.hinxpvkjunymuotrtlbg:htKgRgJraj5T0Qng@aws-0-us-east-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    try {
        await client.connect();
        console.log('Connected!');
        const res = await client.query('SELECT 1');
        console.log('Query result:', res.rows[0]);
    } catch (err) {
        console.error('Connection error:', err);
    } finally {
        await client.end();
    }
}

test();
