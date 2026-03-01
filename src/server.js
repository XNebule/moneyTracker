require("dotenv").config()
const express = require("express")
const client = require("./config/db")
const eR = require("./modules/expenses/expenses.routes")
const aR = require("./modules/auth/auth.routes")
const cR = require("./modules/categories/categories.routes")
const errMid = require("../middleware/error.middleware")
const authMid = require("../middleware/auth.middleware")

const app = express()
const port = 3000

app.use(express.json())
app.use("/api/expenses",authMid, eR)
app.use("/api/categories",authMid, cR)
app.use("/api/auth", aR)
app.use(errMid)

app.use(express.static("public"))

async function startServer() {
  try {
    await client.connect()
    console.log('Database and Server launched')

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (err) {
    console.error("Error starting server: ", err)
  }
}

startServer()