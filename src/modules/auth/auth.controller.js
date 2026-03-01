const aS = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.regCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || password == null) {
      return res.status(400).json({
        Error: "Email and Password required",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const data = await aS.createCred(email, hashedPass);
    res.status(201).json(data);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        error: "Email already registered!",
      });
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
      return res.status(404).json({ error: "User not found!" });
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
      return res.status(404).json({
        Error: "User not found!",
      });
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
      return res.status(400).json({
        error: "Email and Password required!",
      });
    }

    const user = await aS.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: "Invalid Credentials!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid Credentials!",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
