const express = require("express");
const path = require("path");

require("dotenv").config({ path: `${path.join(__dirname, ".env")}` });

const app = express();
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send(`Healthy ${__dirname}`);
});

app.get("/auth", (req, res) => {
  const header = req.headers.authorization;
  if (!header || header?.length < 3 || header?.length > 6) {
    res.status(401).send("Invalid Token");
  } else {
    res.status(200).send("Valid");
  }
});

const server = app.listen(port, () => {
  console.log(`Auth service is listening on port ${port}`);
});

module.exports = server;
