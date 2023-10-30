const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios").default;

require("dotenv").config({ path: `${path.join(__dirname, ".env")}` });

const app = express();
const port = process.env.PORT || 9002;
const AUTHURL = process.env.AUTHURL || "http://localhost:9000";
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  const authURL = new URL(AUTHURL);
  authURL.pathname = "auth";
  try {
    const res = await axios
      .get(authURL.toString(), {
        headers: { ...req.headers },
      })
      .catch((res) => {
        throw res.response.data;
      });
    if (res.status === 200) {
      next();
    } else {
      throw res.data;
    }
  } catch (error) {
    res.status(axios.HttpStatusCode.Unauthorized).send(error);
  }
});

app.get("/", (req, res) => {
  res.send(`Healthy ${__dirname}`);
});

app.post("/", async (req, res) => {
  const body = req.body;
  if (!body?.product) {
    res.status(400).send("Invalid Product");
  } else {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/search?q=" + body.product
      );
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.status).send(error.statusText);
    }
  }
});

app.listen(port, () => {
  console.log(`Auth service is listening on port ${port}`);
});
