const express = require("express");
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")

const expensesRoutes = require("./modules/expenses/expenses.routes");
const authRoutes = require("./modules/auth/auth.routes");
const categoriesRoutes = require("./modules/categories/categories.routes");

const authMiddleware = require("../middleware/auth.middleware");
const errorMiddleware = require("../middleware/error.middleware");

const app = express();
app.use(helmet())
app.use(cors())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
})
app.use(limiter)


app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", authMiddleware, expensesRoutes);
app.use("/api/categories", authMiddleware, categoriesRoutes);

app.use(errorMiddleware);

module.exports = app;
