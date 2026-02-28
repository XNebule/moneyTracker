const us = require("../services/usersServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and Password required!",
      });
    }

    const user = await us.findUserByEmail(email);

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
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
