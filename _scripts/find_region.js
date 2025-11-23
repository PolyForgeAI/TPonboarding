import pg from 'pg';
const { Client } = pg;

const password = 'HMy9zE3rUD8ISxkB';
const projectRef = 'hinxpvkjunymuotrtlbg';

const regions = [
    'aws-0-us-east-1',
    'aws-0-us-west-1',
    'aws-0-eu-central-1',
    'aws-0-ap-southeast-1',
    'aws-0-sa-east-1',
    'aws-0-ca-central-1',
    'aws-0-ap-northeast-1',
    'aws-0-ap-northeast-2',
    'aws-0-ap-south-1',
    'aws-0-eu-west-1',
    'aws-0-eu-west-2',
    'aws-0-eu-west-3'
];

async function checkRegion(region) {
    const host = `${region}.pooler.supabase.com`;
    const connectionString = `postgres://postgres.${projectRef}:${password}@${host}:6543/postgres`;

    console.log(`Testing ${region}...`);

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
    });

    try {
        await client.connect();
        console.log(`✅ SUCCESS: Connected to ${region}`);
        await client.end();
        return connectionString;
    } catch (err) {
        console.log(`❌ FAILED ${region}: ${err.message}`);
        // Don't await client.end() here as it might hang if connection failed
        try { client.end(); } catch (e) { }
        return null;
    }
}

async function findWorkingRegion() {
    console.log("Starting Region Discovery...");

    // Run sequentially to avoid rate limits or confusion
    for (const region of regions) {
        const successUrl = await checkRegion(region);
        if (successUrl) {
            console.log("\n🎉 FOUND WORKING CONNECTION STRING:");
            console.log(successUrl);
            process.exit(0);
        }
    }

    console.log("\n❌ Could not connect to any common region.");
    process.exit(1);
}

findWorkingRegion();
