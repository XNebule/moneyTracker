const client = require("../../config/db");

exports.createExpense = async (title, amount, userId, categoryId) => {
  const catCheck = await client.query(
    "SELECT id FROM categories WHERE id = $1 AND user_id = $2",
    [categoryId, userId],
  );

  if (catCheck.rows.length === 0) {
    const error = new Error("Invalid category for this user");
    error.status = 403;
    throw error;
  }

  const result = await client.query(
    "INSERT INTO expenses (title, amount, user_id, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, amount, userId, categoryId],
  );
  return result.rows[0];
};

exports.getAllExpenses = async (userId) => {
  const result = await client.query(
    "SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );
  return result.rows;
};

exports.getExpensesById = async (id, userId) => {
  const result = await client.query(
    "SELECT * FROM expenses WHERE id = $1 AND user_id = $2",
    [id, userId],
  );
  return result.rows[0];
};

exports.deleteExpense = async (id, userId) => {
  const result = await client.query(
    "DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId],
  );
  return result.rows[0];
};

exports.updateExpense = async (id, title, amount, categoryId, userId) => {
  const categoryCheck = await client.query(
    "SELECT id FROM categories WHERE id = $1 AND user_id = $2",
    [categoryId, userId],
  );

  if (categoryCheck.rows.length === 0) {
    const error = new Error("Invalid category for this user");
    error.status = 403;
    throw error;
  }

  const result = await client.query(
    `UPDATE expenses
     SET title = $1,
         amount = $2,
         category_id = $3
     WHERE id = $4
       AND user_id = $5
     RETURNING *`,
    [title, amount, categoryId, id, userId],
  );

  return result.rows[0];
};
