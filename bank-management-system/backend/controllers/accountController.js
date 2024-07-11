const express = require("express");
const { getUser } = require("../services/userServiceToken");

const generateRandomCardNumber = () => {
  const accountNo = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return accountNo;
};

const createAccount = async (req, res) => {
  const pool = req.pool; // Assuming req.pool is set up correctly

  const customer = req.user; // Access the authenticated user directly from middleware

  // Example usage of req.user
  const customerId = customer.id;
  const accountNo = generateRandomCardNumber();

  const { balance, accType, interestRate } = req.body;

  const checkAccountQuery =
    "SELECT * FROM account WHERE customer_id = ? AND acc_type = ?";

  pool.query(
    checkAccountQuery,
    [customerId, accType],
    (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Error checking existing account:", checkErr);
        return res
          .status(500)
          .json({ error: "Failed to check existing account" });
      }

      if (checkResult.length > 0) {
        return res
          .status(409)
          .json({ error: "Account of the same type already exists" });
      }

      const insertAccountQuery =
        "INSERT INTO account (account_no, customer_id, balance, acc_type, interest_rate) VALUES (?, ?, ?, ?, ?)";
      pool.query(
        insertAccountQuery,
        [accountNo, customerId, balance, accType, interestRate],
        (err, result) => {
          if (err) {
            console.error("Error inserting account:", err);
            return res
              .status(500)
              .json({ error: "Failed to insert account" });
          }
          console.log("Account added successfully:", result);

          res.status(200).json({
            message: "Account added successfully",
            accountNo: accountNo,
          });
        }
      );
    }
  );
};

module.exports = {
  createAccount,
};
