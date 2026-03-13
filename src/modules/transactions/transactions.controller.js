const tS = require("./transactions.service");

exports.createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, categoryId, date } = req.body;
    const userId = req.user.userId;

    if (!title || amount == null || !type) {
      const error = new Error("Title, Amount and Type are required");
      error.status = 400;
      throw error;
    }

    if (!["expense", "revenue"].includes(type)) {
      const error = new Error("Invalid transaction type");
      error.status = 400;
      throw error;
    }

    const data = await tS.createTransaction({
      title,
      amount,
      userId,
      type,
      categoryId, 
      date,
    });

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const { data, totalDocuments, totalPages, page, limit } =
      await tS.getAllTransactions(userId, req.query);

    res.status(200).json({
      success: true,
      count: data.length,
      pagination: {
        page,
        limit,
        totalPages,
        totalDocuments,
      },
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const data = await tS.getTransactionById(id, userId);

    if (!data) {
      const error = new Error("Transaction not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const data = await tS.deleteTransaction(id, userId);

    if (!data) {
      const error = new Error("Transaction not found");
      error.status = 404;
      throw error;
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, amount, type, categoryId, date } = req.body;
    const userId = req.user.userId;

    if (!title || amount == null || !type) {
      const error = new Error("Title, amount and type are required");
      error.status = 400;
      throw error;
    }

    const data = await tS.updateTransaction(
      id,
      title,
      amount,
      type,
      date || new Date(),
      categoryId,
      userId,
    );

    if (!data) {
      const error = new Error("Transaction not found");
      error.status = 404;
      throw error;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};