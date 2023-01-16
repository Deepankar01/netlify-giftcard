"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();
router.post("/card-info", (req, res) => {
  res.json({
    IsSuccess: true,
    Balance: 10.0,
    CurrencyID: "EUR",
  });
});

router.post("/activate", (req, res) => {
  res.json({
    IsSuccess: true,
    Balance: 10.0,
    TransactionID: "TR2849839789",
    TransactionDate: "2021-10-30 12:00:22",
  });
});

router.post("/issue", (req, res) => {
  res.json({
    CardIdentifier: "MYFIRSTCARD", // BackendID of the Eva Product
    CurrencyID: "EUR",
    Amount: 10.0,
  });
});

router.post("/cancel", (req, res) => {
  res.json({
    IsSuccess: true,
    TransactionID: req.body.TransactionID,
    TransactionDate: "2021-10-30 12:00:22",
  });
});

router.post("/purchase", (req, res) => {
  res.json({
    IsSuccess: true,
    Balance: 0.0,
    TransactionID: "TR2849839789",
    TransactionDate: "2021-10-30 12:00:22",
  });
});

router.post("/refund", (req, res) => {
  res.json({
    IsSuccess: true,
    Balance: 5.0,
    TransactionID: req.body.TransactionID,
    TransactionDate: "2021-10-30 12:00:22",
  });
});
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
