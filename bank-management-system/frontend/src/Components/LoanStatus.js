//i dont quite understand this yet
import React, { useState, useEffect } from "react";
import axios from "axios";

function LoanStatus() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const response = await axios.post("http://localhost:8000/loan/viewLoanStatus");
        const data = response.data;
        if (response.status === 200) {
          setLoans(data.result); // Assuming the API returns data in { result: [...] } format
        } else {
          setError(data.error || 'Failed to fetch loan status');
        }
      } catch (error) {
        console.error("Error fetching loan status:", error);
        setError(`Failed to fetch loan status: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanStatus();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : loans.length > 0 ? (
        <div>
          {loans.map((loan, index) => (
            <div key={loan.loan_no || index}>
              <p>Loan No: {loan.loan_no}</p>
              <p>Bank Response Date: {loan.bank_response_date}</p>
              <p>Application Date: {loan.application_date}</p>
              <p>Loan Amount: {loan.loan_amount}</p>
              <p>Remark: {loan.remark}</p>
              <p>Approval Status: {loan.approval_status}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No loans found</p>
      )}
    </div>
  );
}

export default LoanStatus;
