const us = require("../services/usersServices");
const bcrypt = require("bcrypt")

exports.getCreds = async (req, res, next) => {
  try {
    const data = await us.usersCredential();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCred = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await us.userCredId(id);

    if (!data) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.regCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || password == null) {
      return res.status(400).json({
        Error: "Email and Password required",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const data = await us.createCred(email, hashedPass);
    res.status(201).json(data);
  } catch (err) {
    if (err.code === "23505") {
        return res.status(409).json({
            error: "Email already registered!"
        })
    }
    next(err);
  }
};

exports.delCred = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await us.deleteCred(id);

    if (!data) {
      return res.status(404).json({
        Error: "User not found!",
      });
    }

    res.json({ Message: "Deleted successfully"})
  } catch (err) {
    next(err)
  }
};
