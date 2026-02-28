const eS = require("../services/expensesServices");

exports.getExps = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const data = await eS.getAllExpenses(userId);
    res.json(data);
  } catch (err) {
    next(err)
  }
};

exports.getExp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await eS.getExpensesById(id);

    if (!data) {
      return res.status(404).json({ Error: "Expenses not found" });
    }
    res.json(data);
  } catch (err) {
    next(err)
  }
};

exports.inputExp = async (req, res, next) => {
  try {
    const { title, amount } = req.body;
    const userId = req.user.userId

    if (!title || amount == null) {
      return res.status(400).json({
        Error: "Title and Amount required",
      });
    }

    const data = await eS.createExpense(title, amount, userId);
    res.status(201).json(data);
  } catch (err) {
    next(err)
  }
};

exports.deleteExp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await eS.deleteExpense(id);

    if (!data) {
      return res.status(404).json({
        Error: "Result can't be found",
      });
    }

    res.json({ Message: "Deleted Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.updateExp = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, amount } = req.body
    const userId = req.user.userId

    if (!title || amount == null) {
      return res.status(400).json({
        error: "Title and amount required!"
      })
    }

    const data = await eS.updateExpense(id, title, amount, userId)

    if (!data) {
      return res.status(400).json({
        error: "Expenses not found"
      })
    }

    res.json(data)
  } catch (err) {
    next(err)
  }
}
