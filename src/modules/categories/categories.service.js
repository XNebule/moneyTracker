const client = require("../../config/db");

exports.createCategory = async (name, userId) => {
  const result = await client.query(
    `INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *`,
    [name, userId],
  );
  return result.rows[0];
};

exports.getCategories = async (userId) => {
  const result = await client.query(
    `SELECT * FROM categories WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId],
  );
  return result.rows;
};

exports.getCatById = async (id, userId) => {
  const result = await client.query(
    `SELECT * FROM categories WHERE id = $1 AND user_id = $2`,
    [id, userId],
  );
  return result.rows[0];
};

exports.deleteCategories = async (id, userId) => {
  const result = await client.query(
    `DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId],
  );
  return result.rows[0];
};

exports.updateCategory = async (name, id, userId) => {
  const result = await client.query(
    `
    UPDATE categories
    SET name = $1
    WHERE id = $2
    AND user_id = $3
    RETURNING *
    `,
    [name, id, userId]
  )

  return result.rows[0]
}
