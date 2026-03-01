const express = require("express");

const expensesRoutes = require("./modules/expenses/expenses.routes");
const authRoutes = require("./modules/auth/auth.routes");
const categoriesRoutes = require("./modules/categories/categories.routes");

const authMiddleware = require("../middleware/auth.middleware");
const errorMiddleware = require("../middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", authMiddleware, expensesRoutes);
app.use("/api/categories", authMiddleware, categoriesRoutes);

app.use(errorMiddleware);

module.exports = app;
