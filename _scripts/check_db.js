import pg from 'pg';

const connectionString = 'postgresql://postgres.hinxpvkjunymuotrtlbg:htKgRgJraj5T0Qng@aws-0-us-east-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({
    connectionString,
});

async function checkDb() {
    try {
        await client.connect();
        console.log('Connected to database.');

        const res = await client.query('SELECT * FROM public.onboarding_submissions ORDER BY created_at DESC LIMIT 1');

        if (res.rows.length > 0) {
            console.log('Latest submission:', res.rows[0]);
        } else {
            console.log('No submissions found.');
        }

    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        await client.end();
    }
}

checkDb();
