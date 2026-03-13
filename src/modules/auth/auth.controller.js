const aS = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/ApiError");

exports.regCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || password == null) {
      throw new ApiError("Email and password required!", 400);
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const data = await aS.createCred(email, hashedPass);

    res.status(201).json(data);

  } catch (err) {
    if (err.code === "23505") {
      throw new ApiError("Email already registered!", 409);
    }
    next(err);
  }
};

exports.getCreds = async (req, res, next) => {
  try {
    const data = await aS.usersCredential();

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    next(err);
  }
};

exports.getCred = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await aS.userCredId(id);

    if (!data) {
      throw new ApiError("User can't be found!", 404);
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    next(err);
  }
};

exports.delCred = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await aS.deleteCred(id);

    if (!data) {
      throw new ApiError("User not found!", 404);
    }

    res.status(200).json({
      success: true,
      Message: "Deleted successfully"
    });

  } catch (err) {
    next(err);
  }
};

exports.loginCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError("Email and password required!", 400);
    }

    const user = await aS.findUserByEmail(email);

    if (!user) {
      throw new ApiError("Invalid credential!", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError("Invalid credential", 401);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token
    });
    
  } catch (err) {
    next(err);
  }
};
