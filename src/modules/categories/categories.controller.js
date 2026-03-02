const cs = require("./categories.service");

exports.createCat = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      const error = new Error("Field cannot be empty!");
      error.status = 400;
      throw error;
    }

    const data = await cs.createCategory(name, userId);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCats = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await cs.getCategories(userId);

    if (data.lenth === 0) {
      const error = new Error("Category not found!");
      error.status = 404;
      throw error;
    }

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const data = await cs.getCatById(id, userId);
    
    if (!data) {
      const error = new Error("Category not found!")
      error.status = 404
      throw error
    }

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
      const error = new Error("Result can't be found!")
      error.status = 404
      throw error
    }

    res.json({ Message: "Deleted Successfully!" });
  } catch (err) {
    next(err);
  }
};
