"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();
router.post("/card-info", (req, res) => {
  console.log("/card-info", JSON.stringify(req.body));
  res.json({
    IsSuccess: true,
    Balance: 10.0,
    CurrencyID: "EUR",
  });
});

router.post("/activate", (req, res) => {
  console.log("/activate", JSON.stringify(req.body));
  res.json({
    IsSuccess: true,
    Balance: 10.0,
    TransactionID: "TR2849839789",
    TransactionDate: "2021-10-30 12:00:22",
  });
});

router.post("/issue", (req, res) => {
  console.log("/issue", JSON.stringify(req.body));
  res.json({
    CardIdentifier: "MYFIRSTCARD", // BackendID of the Eva Product
    CurrencyID: "EUR",
    Amount: 10.0,
  });
});

router.post("/cancel", (req, res) => {
  console.log("/cancel", JSON.stringify(req.body));
  res.json({
    IsSuccess: true,
    TransactionID: req.body.TransactionID,
    TransactionDate: "2021-10-30 12:00:22",
  });
});

router.post("/purchase", (req, res) => {
  console.log("/purchase", JSON.stringify(req.body));
  res.json({
    IsSuccess: true,
    Balance: 0.0,
    TransactionID: "TR2849839789",
    TransactionDate: "2021-10-30 12:00:22",
  });
});

router.post("/refund", (req, res) => {
  console.log("/refund", JSON.stringify(req.body));
  res.json({
    IsSuccess: true,
    Balance: 5.0,
    TransactionID: req.body.TransactionID,
    TransactionDate: "2021-10-30 12:00:22",
  });
});
router.post("/", (req, res) => {
  console.log("/", JSON.stringify(req.body));
  res.json({ postBody: req.body });
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
