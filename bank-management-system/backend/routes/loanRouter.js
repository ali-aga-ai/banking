const express = require("express");
const router = express.Router();
const {applyForLoan,fetchLoanedAmount,viewLoanStatus} = require("../controllers/loanController");

router.post("/loanApply", applyForLoan);
router.post("/loanedAmountFetch", fetchLoanedAmount);
router.post("/viewLoanStatus", viewLoanStatus);

module.exports = router;
