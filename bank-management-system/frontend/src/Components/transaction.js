import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MoneyTransferForm() {
  const [transferInfo, setTransferInfo] = useState({ amount: '', receiverAccount: '' });
  const { username } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferInfo({ ...transferInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the provided username matches the username in the URL
    if (username === transferInfo.username) {
      try {
        const response = await axios.post('http://localhost:5000/api/transfer', transferInfo);
        alert(response.data.message);
      } catch (error) {
        console.error('Error sending money:', error);
        alert('Failed to send money!');
      }
    } else {
      // If the provided username doesn't match the one in the URL, show an error
      alert('Username does not match the URL.');
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
