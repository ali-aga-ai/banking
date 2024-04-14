import React, { useState } from 'react';
import axios from 'axios';

function AccountForm() {
  const [account, setAccount] = useState({ accountNo: '', customerID: '', balance: '', accType: '', interestRate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/accounts', account);
      alert('Account added successfully!');
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Failed to add account!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="accountNo"
        placeholder="Account No"
        value={account.accountNo}
        onChange={handleChange}
      />
      <input
        type="number"
        name="customerID"
        placeholder="Customer ID"
        value={account.customerID}
        onChange={handleChange}
      />
      <input
        type="number"
        name="balance"
        placeholder="Balance"
        value={account.balance}
        onChange={handleChange}
      />
        <select
    name="accType"
    value={account.accType}
    onChange={handleChange}
  >
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
      <button type="submit">Add Account</button>
    </form>
  );
}

export default AccountForm;
