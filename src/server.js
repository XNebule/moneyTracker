require("dotenv").config()
const express = require("express")
const client = require("./db")
const eR = require("./routes/expenses")
const eP = require("./routes/users")
const eMw = require("./middleware/errMW")
const authMW = require("./middleware/authMW")

const app = express()
const port = 3000

app.use(express.json())
app.use("/api/expenses",authMW, eR)
app.use("/api/auth", eP)
app.use(eMw)

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