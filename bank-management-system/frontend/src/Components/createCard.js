import React, { useState } from 'react';
import axios from 'axios';

function CardForm() {
  const [card, setCard] = useState({ cardNo: '', customerId: '', accountNo: '', cardType: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cards', card);
      alert('Card added successfully!');
    } catch (error) {
      console.error('Error adding card:', error);
      alert('Failed to add card!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="cardNo"
        placeholder="Card Number"
        value={card.cardNo}
        onChange={handleChange}
      />
      <input
        type="number"
        name="customerId"
        placeholder="Customer ID"
        value={card.customerId}
        onChange={handleChange}
      />
      <input
        type="number"
        name="accountNo"
        placeholder="Account Number"
        value={card.accountNo}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cardType"
        placeholder="Card Type"
        value={card.cardType}
        onChange={handleChange}
      />
      <button type="submit">Add Card</button>
    </form>
  );
}

export default CardForm;
