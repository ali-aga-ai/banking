import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function AccountForm() {
  const [account, setAccount] = useState({
    f_name: "",
    balance: "",
    accType: "",
    interestRate: "",
    password: "",
  });
  const { username } = useParams();

  const navigate = useNavigate();

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = async (e) => {
    // console.log("Username:", username);
    // console.log("Account First Name:", account.f_name);

    e.preventDefault();
    // Check if the first name matches the username
    if (username === account.f_name) {
      try {
        await axios.post("http://localhost:8080/api/accounts", account);
        alert("Account added successfully!");
      } catch (error) {
        console.error("Error adding account:", error);
        alert("Failed to add account!");
      }
    } else {
      // If the first name doesn't match the username, show an alert
      alert("First name does not match the username.");
    }
  };

  return (
    <div>
      <button onClick={redirectToWelcomePage}>Home/Welcome Page</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="f_name"
          placeholder="First Name"
          value={account.f_name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="balance"
          placeholder="Balance"
          value={account.balance}
          onChange={handleChange}
        />
        <select name="accType" value={account.accType} onChange={handleChange}>
          <option value="">Select Account Type</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
          <option value="Investment">Investment</option>
        </select>
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate"
          value={account.interestRate}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={account.password}
          onChange={handleChange}
        />
        <button type="submit">Add Account</button>
      </form>
    </div>
  );
}

export default AccountForm;
