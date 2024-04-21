import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MoneyTransferForm() {
  const [transferInfo, setTransferInfo] = useState({
    amount: "",
    receiverAccount: "",
  });
  const [transactions, setTransactions] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferInfo({ ...transferInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the provided username matches the username in the URL
    if (username === username) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/transfer",
          transferInfo
        );
        alert(response.data.message);
      } catch (error) {
        console.error("Error sending money:", error);
        alert("Failed to send money!");
      }
    } else {
      // If the provided username doesn't match the one in the URL, show an error
      alert("Username does not match the URL.");
    }
  };

  const handleViewTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/${username}`
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("Failed to fetch transactions.");
    }
  };

  return (
    <div>
      <button onClick={redirectToWelcomePage}>Home/Welcome Page</button>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transferInfo.amount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="receiverAccount"
          placeholder="Receiver Account Number"
          value={transferInfo.receiverAccount}
          onChange={handleChange}
        />
        <button type="submit">Send Money</button>
      </form>
      <div>
        <button onClick={handleViewTransactions}>View Last 10 Transactions</button>
        {transactions.length > 0 && (
          <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              Transaction No: {transaction.transaction_no}, 
              Transaction Date: {transaction.transaction_date}, 
              Amount: {transaction.amount},
              From Account: {transaction.acc_from},
              To Account: {transaction.acc_to},
              Transaction Type: {transaction.trans_type}
            </li>
          ))}
        </ul>
        
        )}
      </div>
    </div>
  );
}

export default MoneyTransferForm;
