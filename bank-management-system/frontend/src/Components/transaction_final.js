import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TransactionForm() {
  const [transaction, setTransaction] = useState({
    numberTo: "",
    amount: "",
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
      await axios.post("http://localhost:8000/transaction/performTrans", transaction);
      alert("Transaction submitted successfully!");
      // Optionally, you can redirect the user to another page or update the UI
    } catch (error) {
      console.error("Error submitting transaction:", error);
      if (error.response && error.response.status === 400) {
        alert("You have insufficient balance for this transaction in you checking account");
      } 
      else if (error.response && error.response.status === 505) {
        alert("Error during transaction process");
      } 
      else if (error.response && error.response.status === 508) {
        alert("Phone Number does not have a checking account registered with us");
      } else {
        console.error("Error completing transaction:", error);
        alert("Failed to complete transaction!");
      
    }
  }};

  return (
    <div>
      <button onClick={redirectToWelcomePage}>Home/Welcome Page</button>
      <h2>Make Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="numberTo"
          placeholder="Account To"
          value={transaction.numberTo}
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
        <button type="submit">Submit Transaction</button>
        <button type="button" onClick={() => setTransaction({})}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
