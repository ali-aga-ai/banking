import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function TransactionForm() {
  const [transaction, setTransaction] = useState({
    accFrom: "",
    accTo: "",
    transactionDate: "",
    amount: "",
    transType: "",
  });

  const { username } = useParams();

  const navigate = useNavigate();

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/transactions", transaction);
      alert("Transaction submitted successfully!");
      // Optionally, you can redirect the user to another page or update the UI
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Failed to submit transaction!");
    }
  };

  return (
    <div>
      <button onClick={redirectToWelcomePage}>Home/Welcome Page</button>
      <h2>Make Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="accFrom"
          placeholder="Account From"
          value={transaction.accFrom}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="accTo"
          placeholder="Account To"
          value={transaction.accTo}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="transactionDate"
          placeholder="Transaction Date"
          value={transaction.transactionDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="transType"
          placeholder="Transaction Type"
          value={transaction.transType}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Transaction</button>
        <button type="button" onClick={() => setTransaction({})}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;