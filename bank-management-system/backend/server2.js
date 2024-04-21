const express = require("express");
const cors = require("cors");
const { createPool } = require("mysql");

// var connection = require("./database");

const app = express();
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "$entropics110",
  database: "banking",
  connectionLimit: 10,
});

app.use(cors());
app.use(express.json());



app.post("/api/loanAmount", (req, res) => {
    const { username, password } = req.body;
  
    // Check customer credentials
    const validateQuery =
      "SELECT customer_id FROM customer WHERE f_name = ? AND password = ?";
    pool.query(validateQuery, [username, password], (validateErr, validateResult) => {
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
  
      // If credentials are valid, proceed to call the stored procedure
      const customerId = validateResult[0].customer_id;
      console.log("Customer ID:", customerId);
  
      // Call the stored procedure to calculate the loan amount
      const query = "CALL CalculateLoanAmount(?, @total_amount)";
      pool.query(query, [customerId], (err) => {
        if (err) {
          console.error("Error calling stored procedure:", err);
          return res.status(500).json({ error: "Failed to calculate loan amount" });
        }
  
        // Retrieve the calculated loan amount from the session variable
        const selectQuery = "SELECT @total_amount AS total_amount";
        pool.query(selectQuery, (selectErr, selectResult) => {
          if (selectErr) {
            console.error("Error retrieving loan amount:", selectErr);
            return res.status(500).json({ error: "Failed to retrieve loan amount" });
          }
  
          const loanAmount = selectResult[0].total_amount;
          console.log("Fetched Loan Amount:", loanAmount);
          res.status(200).json({ loan_amount: loanAmount });
        });
      });
    });
  });
  
  // GET route for fetching the last 10 transactions
  app.get("/api/transactions/:username", (req, res) => {
    const username = req.params.username;
    
    // Query to fetch the customer ID based on the username
    const customerIdQuery = "SELECT customer_id FROM customer WHERE f_name = ?";
    
    // Execute the query to get the customer ID
    pool.query(customerIdQuery, [username], (err, results) => {
      if (err) {
        console.error("Error fetching customer ID:", err);
        return res.status(500).json({ error: "Failed to fetch customer ID" });
      }
      
      // Extract the customer ID from the results
      const customerId = results[0].customer_id;
      
      // Call the stored procedure to fetch the last 10 transactions
      const transactionQuery = "CALL GetLast10Transactions(?)";
      pool.query(transactionQuery, [customerId], (err, results) => {
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
  });
  const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



  





