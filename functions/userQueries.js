const pool = require('./db');

// Example user query function
async function getUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  } finally {
    client.release();
  }
}

module.exports = {
  getUsers,
};