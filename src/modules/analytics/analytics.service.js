const client = require("../../config/db");

exports.getCashflow = async (userId) => {
  const result = await client.query(
    `
        SELECT
            SUM(CASE WHEN type='revenue' THEN amount ELSE 0 END) AS revenue,
            SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
        FROM transactions
        WHERE user_id = $1
        `,
    [userId],
  );

  const revenue = Number(result.rows[0].revenue) || 0;
  const expense = Number(result.rows[0].expense) || 0;

  return {
    revenue,
    expense,
    balance: revenue - expense
  }
};