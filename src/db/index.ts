// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.NEXT_DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//     // ca: Buffer.from(process.env.NEXT_AZURE_CA_CERTS!, 'base64').toString('utf-8'),
//   },
//   max: 5,
//   idleTimeoutMillis: 10000,
//   connectionTimeoutMillis:5000,
// });

// // Check if a connection is already established
// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) {
//     console.log('Database connection already established!');
//     return;
//   }

//   try {
//     await pool.connect();
//     isConnected = true;
//     console.log('Connected to the database with SSL verification!');
//   } catch (err) {
//     console.error('Database connection error:', err);
//   }
// };

// connectDB();

// export const db = drizzle(pool);



import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const DATABASE_URL = process.env.NEXT_DATABASE_URL as string;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

declare global {
    var dbPool: Pool | undefined;
}

const pool = global.dbPool || new Pool({
    connectionString: DATABASE_URL,
      ssl: {
    rejectUnauthorized: false,
    // ca: Buffer.from(process.env.NEXT_AZURE_CA_CERTS!, 'base64').toString('utf-8'),
  },
    max: 5,
    idleTimeoutMillis: 10000,
    // connectionTimeoutMillis: 5000,
});

if (process.env.NODE_ENV !== "production") {
    global.dbPool = pool;
}

export const db = drizzle(pool);

// Log when connected
pool.connect()
    .then(() => console.log("✅ Successfully connected to PostgreSQL"))
    .catch((err) => console.error("❌ Database connection error:", err));
