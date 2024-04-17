import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LoanForm() {
  const [loan, setLoan] = useState({ username: '', password: '', amount: '', collateral: '', interest: '', timeMonths: '' });
  const { username } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the provided username matches the username in the URL
    if (username === loan.username) {
      try {
        await axios.post('http://localhost:5000/api/loans', loan);
        alert('Loan application submitted successfully!');
      } catch (error) {
        console.error('Error submitting loan application:', error);
        alert('Failed to submit loan application!');
      }
    } else {
      // If the provided username doesn't match the one in the URL, show an error
      alert('Username does not match the URL.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={loan.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loan.password}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Loan Amount"
        value={loan.amount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="collateral"
        placeholder="Collateral"
        value={loan.collateral}
        onChange={handleChange}
      />
      <input
        type="number"
        name="interest"
        placeholder="Interest Rate"
        value={loan.interest}
        onChange={handleChange}
      />
      <input
        type="number"
        name="timeMonths"
        placeholder="Loan Term (Months)"
        value={loan.timeMonths}
        onChange={handleChange}
      />
      <button type="submit">Apply for Loan</button>
    </form>
  );
}

export default LoanForm;
