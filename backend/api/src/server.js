import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Lazy DB Connection Helper ---- //
let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
  }
  return pool;
}

// ---- Middleware ---- //
app.use(cors());
app.use(express.json());

// ---- Health (ECS / ALB Health Check) ---- //
// MUST return instantly, no DB or external calls
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// ---- Root ---- //
app.get('/', (req, res) => {
  res.json({
    message: 'Flex Wellness API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ---- Example status ---- //
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ---- Database check endpoint ---- //
// NOTE: DB outage testing is manual – won't affect ALB
app.get('/db-check', async (req, res) => {
  const pool = getPool();
  let connection;

  try {
    connection = await pool.getConnection();

    // Optional slow-mode for resiliency testing WITHOUT breaking app
    const slowTest = req.query.slow === '1';
    const sql = slowTest
      ? 'SELECT NOW() as now, SLEEP(2) as sleep'
      : 'SELECT NOW() as now';

    const [rows] = await connection.query(sql);

    res.status(200).json({
      status: 'ok',
      database: 'connected',
      time: rows[0].now,
      slowMode: slowTest
    });
  } catch (error) {
    console.error('DB CHECK FAILED:', error.message);
    res.status(500).json({
      status: 'error',
      database: 'not connected',
      message: error.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// ---- 404 + Error Handling ---- //
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ---- Start Server ---- //
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
