const ApiError = require("../../utils/ApiError");
const cS = require("./categories.service");

exports.createCat = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      throw new ApiError("Field cannot be empty!", 400);
    }

    const data = await cS.createCategory(name, userId);

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
    const data = await cS.getCategories(userId);

    if (data.lenth === 0) {
      throw new ApiError("Category not found!", 404);
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    next(err);
  }
};

exports.getCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const data = await cS.getCatById(id, userId);

    if (!data) {
      throw new ApiError("Category not found!", 404);
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    next(err);
  }
};

exports.deleteCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const data = await cS.deleteCategories(id, userId);

    if (!data) {
      throw new ApiError("Result can't be found", 404);
    }

    res.status(200).json({
      success: true,
      Message: "Deleted Successfully!"
    });

  } catch (err) {
    next(err);
  }
};

exports.updateCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      throw new ApiError("Category name is required", 400);
    }

    const data = await cS.updateCategory(id, name, userId);

    if (!data) {
      throw new ApiError("Category not found", 404);
    }

    res.status(200).json({
      success: true,
      data
    });
    
  } catch (err) {
    next(err);
  }
};