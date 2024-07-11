const express = require("express");
const { depositMoney,viewUsers,pendingLoans,approveLoan} = require("../controllers/adminController");
const router = express.Router();

router.post("/depositMoney", depositMoney);
router.post("/viewUsers", viewUsers);
router.get("/pendingLoans", pendingLoans);
router.post("/approveLoan", approveLoan);

module.exports = router;
