const eS = require("./expenses.service");

exports.inputExp = async (req, res, next) => {
  try {
    const { title, amount, categoryId } = req.body;
    const userId = req.user.userId;

    if (!title || amount == null) {
      const error = new Error("Title and Amount can't be empty!");
      error.status = 400;
      throw error;
    }

    const data = await eS.createExpense(title, amount, userId, categoryId);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getExps = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await eS.getAllExpenses(userId);

    if (!data) {
      const error = new Error("Expenses can't be found!");
      error.status = 404;
      throw error;
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getExp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id) {
      const error = new Error("Expense can't be found!");
      error.status = 404;
      throw error;
    }

    const data = await eS.getExpensesById(id, userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteExp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const data = await eS.deleteExpense(id, userId);

    if (!data) {
      const error = new Error("Result can't be found!");
      error.status = 404;
      throw error;
    }

    res.json({ Message: "Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateExp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, amount, categoryId } = req.body;
    const userId = req.user.userId;

    if (!title || amount == null) {
      const error = new Error("Title and Amount can't be empty!");
      error.status = 400;
      throw error;
    }

    const data = await eS.updateExpense(id, title, amount, categoryId, userId);

    if (!data) {
      const error = new Error("Expense cannot be found!");
      error.status = 400;
      throw error;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};
