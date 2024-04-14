import React, { useState } from 'react';
import axios from 'axios';

function MoneyTransferForm() {
  const [transferInfo, setTransferInfo] = useState({ amount: '', senderAccount: '', receiverAccount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferInfo({ ...transferInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/transfer', transferInfo);
      alert(response.data.message);
    } catch (error) {
      console.error('Error sending money:', error);
      alert('Failed to send money!');
    }
  };

  return (
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
        name="senderAccount"
        placeholder="Sender Account Number"
        value={transferInfo.senderAccount}
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
  );
}

export default MoneyTransferForm;
