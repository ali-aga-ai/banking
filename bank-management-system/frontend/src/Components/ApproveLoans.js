import React, { useState } from "react";
import axios from "axios";

function ApproveLoans() {
  const [data, setData] = useState(null);
  const handleView = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/pendingLoans"
      );
      setData(response.data);
      if (response.status === 200) {
        console.log(data);
      } else {
        alert(data.error || "Failed to deposit money");
      }
    } catch (error) {
      console.error("Error depositing money:", error);
      alert(`Failed to deposit money: ${error.message}`);
    }
  };

  const handleApprove = async (loanId, status) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post(
        "http://localhost:8000/admin/approveLoan",
        { loanId: loanId, status: status }
      );
      if (response.status === 200) {
        alert("Loan status updated successfully!");

        // Remove the approved loan from the list
        setData((prevData) =>
          prevData.filter((loan) => loan.loan_no !== loanId)
        );

        // Optionally, you can update the UI or state here
      }
    } catch (error) {
      console.error("Error updating loan status:", error);
      alert("Failed to status update loan.");
    }
  };
  return (
    <>
      <button onClick={handleView}> view Pending Loans</button>
      {data && (
        <div>
          <h3>Pending Loans:</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Borrower ID</th>
                <th>Borrower Occupation</th>
                <th>Loan Per Balance</th>
                <th>Borrower ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((loan) => (
                <tr key={loan.loan_no}>
                  <td>{loan.loan_no}</td>
                  <td>{loan.loan_amount}</td>
                  <td>{loan.customer_id}</td>
                  <td>{loan.occupartion}</td>
                  <td>{loan.loan_per_balance}</td>
                  <td>{loan.application_date}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(loan.loan_no, "Approve")}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprove(loan.loan_no, "Reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Set Interest Rate"
        />
        <button type="submit">Set Interest Rate</button>
      </form> */}
    </>
  );
}

export default ApproveLoans;
