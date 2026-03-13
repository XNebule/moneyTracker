const express = require("express");
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")

const authRoutes = require("./modules/auth/auth.routes");
const dashboardRoutes = require("./modules/dashboards/dashboards.routes")
const transactionRoutes = require("./modules/transactions/transactions.routes")
const categoryRoutes = require('./modules/categories/categories.routes')

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

app.use("/api/dashboard", authMiddleware, dashboardRoutes)
app.use("/api/transactions", authMiddleware, transactionRoutes)
app.use("/api/categories", authMiddleware, categoryRoutes)

app.use(errorMiddleware);

module.exports = app;
