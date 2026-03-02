const aS = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.regCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || password == null) {
      const error = new Error("Email and password required!");
      error.status = 400;
      throw error;
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const data = await aS.createCred(email, hashedPass);
    res.status(201).json(data);
  } catch (err) {
    if (err.code === "23505") {
      const error = new Error("Email already registered!");
      error.status = 409;
      throw error;
    }
    next(err);
  }
};

exports.getCreds = async (req, res, next) => {
  try {
    const data = await aS.usersCredential();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCred = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await aS.userCredId(id);

    if (!data) {
      const error = new Error("User can't be found!");
      error.status = 404;
      throw error;
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.delCred = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await aS.deleteCred(id);

    if (!data) {
      const error = new Error("user not found!");
      error.status = 404;
      throw error;
    }

    res.json({ Message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.loginCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and Password required!");
      error.status = 400;
      throw error;
    }

    const user = await aS.findUserByEmail(email);

    if (!user) {
      const error = new Error("Invalid Credetial!");
      error.status = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid Credetial!");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
