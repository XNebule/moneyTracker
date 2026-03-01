const cs = require("./categories.service");

exports.createCat = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      return res.status(400).json({
        Error: "Field cannot be empty!",
      });
    }

    const data = await cs.createCategory(name, userId);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCats = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await cs.getCategories(userId);

    if (!data) {
      return res.status(404).json({
        Error: "Category not found!",
      });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id) {
      return res.status(404).json({
        Error: "Category not found!",
      });
    }

    const data = await cs.getCatById(id, userId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const data = await cs.deleteCategories(id, userId);

    if (!data) {
      return res.status(404).json({
        Error: "Result can't be found",
      });
    }

    res.json({ Message: "Deleted Successfully!" });
  } catch (err) {
    next(err);
  }
};
