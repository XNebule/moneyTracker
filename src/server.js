require("dotenv").config();

const client = require("./config/db");
const app = require("./app");

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await client.connect();
    console.log("Database Connected!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting server: ", err);
    process.exit(1);
  }
};

startServer();
