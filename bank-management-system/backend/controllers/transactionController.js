const { pool } = require("../db");
const express = require("express");
const router = express.Router();

// Function to get account number based on customer's contact number
const getAccount = (pool, number) => {
  return new Promise((resolve, reject) => {
    const getQuery =
      "SELECT customer_id FROM customer WHERE contact_number = ?";
    pool.query(getQuery, [number], (err, result) => {
      if (err) {
        console.error("Error retrieving customer ID:", err);
        return reject(err);
      }
      if (result.length === 0) {
        console.error("Customer with contact number not found.");
        return reject("Customer not found");
      }
      const customerId = result[0].customer_id;

      const accountQuery =
        "SELECT account_no FROM account WHERE customer_id = ? AND acc_type ='Checking'";
      pool.query(accountQuery, [customerId], (err, result) => {
        if (err) {
          console.error("Error retrieving checking account:", err);
          return reject(err);
        }
        if (result.length === 0) {
          console.error("Customer does not have a checking account.");
          return reject("No checking account found");
        }
        const accountNo = result[0].account_no;
        resolve(accountNo);
      });
    });
  });
};

const performTrans = async (req, res) => {
  const { numberTo, amount } = req.body;
  const pool = req.pool; // Assuming req.pool is set up correctly
  const customer = req.user; // Access the authenticated user directly from middleware
  const fromNum = customer.num;

  try {
    const accFrom = await getAccount(pool, fromNum);

    if (!accFrom) {
      return res
        .status(500)
        .json({ message: "You do not have a checking account" });
    }
    let accTo;
    try {
       accTo = await getAccount(pool, numberTo);
    } catch (error) {
      return res
      .status(508)
      .json({ message: "Number does not have a checking account registered with us" });    }

    const transactionDate = new Date();

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(501).json({ error: "Database error" });
      }

      connection.beginTransaction(async (beginTransactionErr) => {
        if (beginTransactionErr) {
          console.error("Error beginning transaction:", beginTransactionErr);
          connection.release();
          return res.status(502).json({ error: "Database error" });
        }

        try {
          // Check sender's balance
          const checkBalanceQuery =
            "SELECT balance FROM account WHERE account_no = ?";
          const [checkBalanceResult] = await connection
            .promise()
            .query(checkBalanceQuery, [accFrom]);
          const senderBalance = checkBalanceResult[0].balance;

          if (senderBalance < amount) {
            console.log("Insufficient balance in sender's account.");
            connection.rollback(() => {
              connection.release();
              return res.status(400).json({ error: "Insufficient balance" });
            });
            return;
          }

          // Insert transaction record
          const insertTransactionQuery =
            "INSERT INTO transactions (acc_from, acc_to, transaction_date, amount, trans_type) VALUES (?, ?, ?, ?, 'Transfer')";
          await connection
            .promise()
            .query(insertTransactionQuery, [
              accFrom,
              accTo,
              transactionDate,
              amount,
            ]);

          console.log("Transaction inserted successfully.");

          // Update sender account balance
          const updateSenderBalanceQuery =
            "UPDATE account SET balance = balance - ? WHERE account_no = ?";
          await connection
            .promise()
            .query(updateSenderBalanceQuery, [amount, accFrom]);

          console.log("Sender account balance updated successfully.");

          // Update receiver account balance
          const updateReceiverBalanceQuery =
            "UPDATE account SET balance = balance + ? WHERE account_no = ?";
          await connection
            .promise()
            .query(updateReceiverBalanceQuery, [amount, accTo]);

          console.log("Receiver account balance updated successfully.");

          // Commit transaction
          await connection.promise().commit();

          console.log("Transaction committed successfully.");
          connection.release();
          return res
            .status(201)
            .json({ message: "Transaction submitted successfully" });
        } catch (error) {
          console.error("Error during transaction process:", error);
          connection.rollback(() => {
            console.log("Transaction rolled back due to error.");
            connection.release();
            return res
              .status(505)
              .json({ error: "Failed to perform transaction" });
          });
        }
      });
    });
  } catch (error) {
    console.error("Error performing transaction:", error);
    return res.status(500).json({ error: "Failed to perform transaction" });
  }
}

const fetchTransactions =async (req, res) => {
  const { accTyp } = req.body; // Assuming accTyp is passed as a query parameter
  const pool = req.pool; // Assuming req.pool is set up correctly
  const customer = req.user; // Access the authenticated user directly from middleware

  // Example usage of req.user
  const customerId = customer.id;
  const getAccQuery =
    "SELECT account_no FROM account WHERE customer_id = ? AND acc_type = ?";
  pool.query(getAccQuery, [customerId, accTyp], (error, result1) => {
    if (error) {
      console.error("Error checking existing account:", error);
      return res
        .status(500)
        .json({ error: "Failed to check existing account" });
    }
    if (result1.length == 0) {
      return res.status(409).json({ error: "No such account exists" });
    }
    const acc_no = result1[0].account_no;

    const transactionQuery = "CALL GetLast10Transactions(?)";
    pool.query(transactionQuery, [acc_no], (err, results) => {
      if (err) {
        console.error("Error fetching transactions:", err);
        return res.status(500).json({ error: "Failed to fetch transactions" });
      }

      // Extract the transactions from the results
      const transactions = results[0];

      // Send the retrieved transactions as JSON response
      res.json({ transactions });
    });
  });
}

module.exports = {fetchTransactions,performTrans};
