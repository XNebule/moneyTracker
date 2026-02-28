const client = require("../db");

exports.getAllExpenses = async (userId) => {
  const result = await client.query(
    "SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );
  return result.rows;
};

exports.getExpensesById = async (id) => {
  const result = await client.query("SELECT * FROM expenses WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

exports.createExpense = async (title, amount, userId) => {
  const result = await client.query(
    "INSERT INTO expenses (title, amount, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, amount, userId],
  );
  return result.rows[0];
};

exports.deleteExpense = async (id) => {
  const result = await client.query(
    "DELETE FROM expenses WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

exports.updateExpense = async (id, title, amount, userId) => {
  const result = await client.query(
    "UPDATE expenses SET title = $1, amount = $2 WHERE id = $3 AND user_id = $4 RETURNING *", [title, amount, id, userId]
  );

  return result.rows[0]
};
