const client = require("../../config/db");

exports.createTransaction = async ({
  title,
  amount,
  userId,
  type,
  categoryId,
  date,
}) => {
  // ✅ Validate category ONLY if provided
  if (categoryId != null) {
    const catCheck = await client.query(
      "SELECT id FROM categories WHERE id = $1 AND user_id = $2",
      [categoryId, userId],
    );

    if (catCheck.rows.length === 0) {
      const error = new Error("Invalid category for this user");
      error.status = 403;
      throw error;
    }
  }

  const result = await client.query(
    `INSERT INTO transactions
     (title, amount, user_id, category_id, type, date)
     VALUES ($1, $2, $3, $4, $5, COALESCE($6, CURRENT_DATE))
     RETURNING *`,
    [
      title,
      amount,
      userId,
      categoryId ?? null, // ensure null if undefined
      type,
      date,
    ],
  );

  return result.rows[0];
};

exports.getAllTransactions = async (userId, queryParams) => {
  let {
    page = 1,
    limit = 10,
    category,
    type,
    minAmount,
    maxAmount,
    startDate,
    endDate,
    sort = "created_at",
    order = "desc",
  } = queryParams;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  const conditions = ["t.user_id = $1"];
  const values = [userId];
  let index = 2;

  if (type) {
    conditions.push(`t.type = $${index++}`);
    values.push(type);
  }

  if (category) {
    conditions.push(`t.category_id = $${index++}`);
    values.push(parseInt(category));
  }

  if (minAmount) {
    conditions.push(`t.amount >= $${index++}`);
    values.push(parseInt(minAmount));
  }

  if (maxAmount) {
    conditions.push(`t.amount <= $${index++}`);
    values.push(parseInt(maxAmount));
  }

  if (startDate) {
    conditions.push(`t.date >= $${index++}`);
    values.push(startDate);
  }

  if (endDate) {
    conditions.push(`t.date <= $${index++}`);
    values.push(endDate);
  }

  const whereClause = `WHERE ${conditions.join(" AND ")}`;

  const allowedSort = ["amount", "date", "created_at"];
  const sortField = allowedSort.includes(sort) ? `t.${sort}` : "t.created_at";
  const sortOrder = order?.toLowerCase() === "asc" ? "ASC" : "DESC";

  const countQuery = `
    SELECT COUNT(*)
    FROM transactions t
    ${whereClause}
  `;

  const totalResult = await client.query(countQuery, values);
  const totalDocuments = Number(totalResult.rows[0].count);

  const dataQuery = `
    SELECT
      t.id,
      t.title,
      t.amount,
      t.type,
      t.date,
      t.created_at,
      t.category_id,
      c.name AS category
    FROM transactions t
    LEFT JOIN categories c ON c.id = t.category_id
    ${whereClause}
    ORDER BY ${sortField} ${sortOrder}
    LIMIT $${index++}
    OFFSET $${index}
  `;

  const dataValues = [...values, limitNum, offset];
  const result = await client.query(dataQuery, dataValues);

  return {
    data: result.rows,
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / limitNum),
    page: pageNum,
    limit: limitNum,
  };
};

exports.getTransactionById = async (id, userId) => {
  const result = await client.query(
    "SELECT * FROM transactions WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  return result.rows[0];
};

exports.deleteTransaction = async (id, userId) => {
  const result = await client.query(
    "DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId],
  );

  return result.rows[0];
};

exports.updateTransaction = async (
  id,
  title,
  amount,
  type,
  date,
  categoryId,
  userId,
) => {
  if (categoryId) {
    const categoryCheck = await client.query(
      "SELECT id FROM categories WHERE id = $1 AND user_id = $2",
      [categoryId, userId],
    );

    if (categoryCheck.rows.length === 0) {
      const error = new Error("Invalid category for this user");
      error.status = 403;
      throw error;
    }
  }

  const result = await client.query(
    `UPDATE transactions
     SET title = $1,
         amount = $2,
         type = $3,
         date = $4,
         category_id = $5
     WHERE id = $6
       AND user_id = $7
     RETURNING *`,
    [title, amount, type, date, categoryId || null, id, userId],
  );

  return result.rows[0];
};
