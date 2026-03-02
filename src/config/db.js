const { Pool } = require("pg")

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required")
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Unexpected DB pool error: ", err)
  process.exit(-1)
})

module.exports = pool