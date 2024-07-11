const { getUser } = require("../services/userServiceToken");

const applyForLoan = (req, res) => {
  const { amount, interest, timeMonths } = req.body;
  const pool = req.pool;
  const user = req.user; // Access the authenticated user directly from middleware

  // Example usage of req.user
  const customerId = user.id;

  const query =
    "INSERT INTO loan (customer_id, amount, interest, time_months) VALUES (?, ?, ?, ?)";
  pool.query(
    query,
    [customerId, amount, interest, timeMonths],
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
};

const fetchLoanedAmount = (req, res) => {
  const pool = req.pool;

  const user = req.user; // Access the authenticated user directly from middleware

  // Example usage of req.user
  const customerId = user.id;
  const query = "CALL CalculateLoanAmount(?, @total_amount)";
  pool.query(query, [customerId], (err) => {
    if (err) {
      console.error("Error calling stored procedure:", err);
      return res.status(500).json({ error: "Failed to calculate loan amount" });
    }

    const selectQuery = "SELECT @total_amount AS total_amount";
    pool.query(selectQuery, (selectErr, selectResult) => {
      if (selectErr) {
        console.error("Error retrieving loan amount:", selectErr);
        return res
          .status(500)
          .json({ error: "Failed to retrieve loan amount" });
      }
      console.log(selectResult)
      const loanAmount = selectResult[0].total_amount;
      console.log("Fetched Loan Amount:", loanAmount);
      res.status(200).json({ loan_amount: loanAmount });
    });
  });
};

const viewLoanStatus = async (req, res) => {
  try {
    const pool = req.pool;
    const token = req.cookies?.uid;

    const user = req.user; // Access the authenticated user directly from middleware

    // Example usage of req.user
    const customerId = user.id;

    const viewQuery =
      "SELECT loan_no, bank_response_date, application_date, loan_amount, remark, approval_status FROM loanApproval WHERE customer_id = ?";
    pool.query(viewQuery, [customerId], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to retrieve loan status" });
      }

      return res.status(200).json({ result });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  applyForLoan,
  fetchLoanedAmount,
  viewLoanStatus,
};
