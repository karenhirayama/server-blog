const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  console.log('Starting migration...');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // Neon requires SSL
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to Neon database');

    // Read SQL file
    const sqlPath = path.join(__dirname, '..', 'migrations', 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Running migration script...');

    // Run SQL commands
    await client.query(sql);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();