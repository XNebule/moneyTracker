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
    balance: revenue - expense,
  };
};

exports.getMonthlyExpenses = async (userId) => {
  const result = await client.query(
    `
    SELECT
      DATE_TRUNC('month', date) AS month,
      SUM(amount) AS total
    FROM transactions
    WHERE user_id = $1
      AND type = 'expense'
    GROUP BY month
    ORDER BY month
    `,
    [userId],
  );

  return result.rows;
};

exports.getCatBreakdown = async (userId) => {
  const result = await client.query(
    `
    SELECT
      c.name AS category,
      SUM(t.amount) AS total
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    WHERE t.user_id = $1
      AND t.type = 'expense'
    GROUP by c.name
    ORDER by total DESC
    `,
    [userId],
  );

  return result.rows;
};