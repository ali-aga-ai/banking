import React, { useState } from 'react';
import axios from 'axios';

function LoanForm() {
  const [loan, setLoan] = useState({ customerId: '', amount: '', collateral: '', interest: '', timeMonths: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/loans', loan);
      alert('Loan application submitted successfully!');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      alert('Failed to submit loan application!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="customerId"
        placeholder="Customer ID"
        value={loan.customerId}
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
