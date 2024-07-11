const express = require("express");
const router = express.Router();
const {performTrans,fetchTransactions} = require("../controllers/transactionController");

router.post("/performTrans", performTrans);
router.get("/fetchTransactions", fetchTransactions);

module.exports = router;
