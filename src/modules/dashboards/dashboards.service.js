const client = require("../../config/db")

exports.getDashboardSummary = async (userId) => {
  const result = await client.query(
    `
    SELECT type, SUM(amount) AS total
    FROM transactions
    WHERE user_id = $1
    GROUP BY type
    `,
    [userId],
  );

  let revenue = 0;
  let expense = 0;

  result.rows.forEach((row) => {
    if (row.type === "revenue") revenue = Number(row.total);
    if (row.type === "expense") expense = Number(row.total);
  });

  return {
    revenue,
    expense,
    balance: (revenue = expense),
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

exports.getDashboard = async (userId) => {
  const [summary, monthly, categories] = await Promise.all([
    exports.getDashboardSummary(userId),
    exports.getMonthlyExpenses(userId),
    exports.getCatBreakdown(userId),
  ]);

  return {
    summary,
    monthly,
    categories,
  };
};
