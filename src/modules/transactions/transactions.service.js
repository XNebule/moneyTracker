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
  const {
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

  const offset = (page - 1) * limit;

  let values = [userId];
  let conditions = ["user_id = $1"];
  let index = 2;

  if (type) {
    conditions.push(`type = $${index++}`);
    values.push(type);
  }

  if (category) {
    conditions.push(`category_id = $${index++}`);
    values.push(category);
  }

  if (minAmount) {
    conditions.push(`amount >= $${index++}`);
    values.push(minAmount);
  }

  if (maxAmount) {
    conditions.push(`amount <= $${index++}`);
    values.push(maxAmount);
  }

  if (startDate) {
    conditions.push(`date >= $${index++}`);
    values.push(startDate);
  }

  if (endDate) {
    conditions.push(`date <= $${index++}`);
    values.push(endDate);
  }

  const whereClause = `WHERE ${conditions.join(" AND ")}`;

  const allowedSortFields = ["amount", "date", "created_at"];
  const sortField = allowedSortFields.includes(sort) ? sort : "created_at";

  const sortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

  const countQuery = `
    SELECT COUNT(*)
    FROM transactions
    ${whereClause}
  `;

  const totalResult = await client.query(countQuery, values);
  const totalDocuments = parseInt(totalResult.rows[0].count);

  const dataQuery = `
    SELECT *
    FROM transactions
    ${whereClause}
    ORDER BY ${sortField} ${sortOrder}
    LIMIT $${index++}
    OFFSET $${index}
  `;

  values.push(limit, offset);

  const result = await client.query(dataQuery, values);

  return {
    data: result.rows,
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / limit),
    page: Number(page),
    limit: Number(limit),
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
