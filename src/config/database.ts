import { Pool } from "pg";

import { ENV } from "./env";

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

pool.connect(() => {
  console.log("Connected to the database");
})

pool.on('error', (err) => {
  console.error('Database connection error:', err);
})

