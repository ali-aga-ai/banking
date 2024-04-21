const express = require("express");
const cors = require("cors");
const { createPool } = require("mysql");

// var connection = require("./database");

const app = express();
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "sqlsqlsql",
  database: "banking",
  connectionLimit: 10,
});

app.use(cors());
app.use(express.json());

// // Root route handler
// app.get("/", (req, res) => {
//   res.send("Welcome to the banking API");
// });

app.get("/", function (req, res) {
  let sql = "SELECT * FROM account";
  pool.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
  //   res.send("Hey there you");
});

app.post("/api/customers", (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    creditScore,
    address,
    contactNumber,
    password,
  } = req.body;

  const insertQuery =
    "INSERT INTO customer (f_name, m_name, l_name, credit_score, address, contact_number, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
  pool.query(
    insertQuery,
    [
      firstName,
      middleName,
      lastName,
      creditScore,
      address,
      contactNumber,
      password,
    ],
    (err, insertResult) => {
      if (err) {
        console.error("Error inserting customer:", err);
        return res.status(500).json({ error: "Failed to insert customer" });
      }

      const customerIdQuery =
        "SELECT customer_id FROM customer WHERE f_name = ? AND l_name = ?";
      pool.query(
        customerIdQuery,
        [firstName, lastName],
        (err, selectResult) => {
          if (err) {
            console.error("Error selecting customer:", err);
            return res.status(500).json({ error: "Failed to select customer" });
          }

          console.log("Customer added successfully:", insertResult);
          console.log("Customer ID:", selectResult);
          res.status(201).json({
            message: "Customer added successfully",
            customerId: selectResult[0].customer_id,
          });
        }
      );
    }
  );
});
app.post("/api/accounts", (req, res) => {
  const { f_name, password, accountNo, balance, accType, interestRate } =
    req.body;

  // Query to validate customer credentials
  const validateQuery =
    "SELECT customer_id FROM customer WHERE f_name = ? AND password = ?";
  pool.query(
    validateQuery,
    [f_name, password],
    (validateErr, validateResult) => {
      if (validateErr) {
        console.error("Error validating customer credentials:", validateErr);
        return res
          .status(500)
          .json({ error: "Failed to validate customer credentials" });
      }

      if (validateResult.length === 0) {
        // If no matching customer found
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const customerId = validateResult[0].customer_id;

      // Check if an account of the same type already exists for the customer
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
            // If an account of the same type already exists
            return res
              .status(409)
              .json({ error: "Account of the same type already exists" });
          }

          // If no existing account of the same type, proceed to insert into the account table
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

              res.status(201).json({ message: "Account added successfully" });
            }
          );
        }
      );
    }
  );
});

const generateRandomCardNumber = () => {
  // Generate a random 16-digit card number
  const cardNumber = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return cardNumber;
};
app.post("/api/cards", (req, res) => {
  const { f_name, cardType } = req.body;

  // Generate a random 16-digit card number
  const cardNo = generateRandomCardNumber();

  // Find customer ID based on the provided first name
  const customerIdQuery = "SELECT customer_id FROM customer WHERE f_name = ?";
  pool.query(customerIdQuery, [f_name], (customerIdErr, customerIdResult) => {
    if (customerIdErr) {
      console.error("Error finding customer ID:", customerIdErr);
      return res.status(500).json({ error: "Failed to find customer ID" });
    }

    if (customerIdResult.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const customerId = customerIdResult[0].customer_id;

    // Find any account number associated with the customer
    const accountNoQuery =
      "SELECT account_no, acc_type FROM account WHERE customer_id = ? LIMIT 1";
    pool.query(
      accountNoQuery,
      [customerId],
      (accountNoErr, accountNoResult) => {
        if (accountNoErr) {
          console.error("Error finding account number:", accountNoErr);
          return res
            .status(500)
            .json({ error: "Failed to find account number" });
        }

        if (accountNoResult.length === 0) {
          return res
            .status(404)
            .json({ error: "No account found for the customer" });
        }

        const { acc_no, acc_type } = accountNoResult[0];

        // Insert the card details into the database
        const insertQuery =
          "INSERT INTO card (card_no, customer_id, acc_no, card_type) VALUES (?, ?, ?, ?)";
        pool.query(
          insertQuery,
          [cardNo, customerId, acc_no, cardType],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error inserting card:", insertErr);
              return res.status(500).json({ error: "Failed to insert card" });
            }

            console.log("Card added successfully:", insertResult);
            res.status(201).json({ message: "Card added successfully" });
          }
        );
      }
    );
  });
});

// Define API route for handling loan applications
app.post("/api/loans", (req, res) => {
  const { username, password, amount, collateral, interest, timeMonths } =
    req.body;

  // Check customer credentials
  const validateQuery =
    "SELECT customer_id FROM customer WHERE f_name = ? AND password = ?";
  pool.query(
    validateQuery,
    [username, password],
    (validateErr, validateResult) => {
      if (validateErr) {
        console.error("Error validating customer credentials:", validateErr);
        return res
          .status(500)
          .json({ error: "Failed to validate customer credentials" });
      }

      if (validateResult.length === 0) {
        // If no matching customer found
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // If credentials are valid, proceed to insert into the loan table
      const customerId = validateResult[0].customer_id;
      const query =
        "INSERT INTO loan (customer_id, amount, collateral, interest, time_months) VALUES (?, ?, ?, ?, ?)";
      pool.query(
        query,
        [customerId, amount, collateral, interest, timeMonths],
        (err, result) => {
          if (err) {
            console.error("Error inserting loan:", err);
            return res.status(500).json({ error: "Failed to insert loan" });
          }
          console.log("Loan application submitted successfully:", result);

          res
            .status(201)
            .json({ message: "Loan application submitted successfully" });
        }
      );
    }
  );
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
