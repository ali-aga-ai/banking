import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function CardForm() {
  const [card, setCard] = useState({ f_name: "", password: "", cardType: "" });
  const { username } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const navigate = useNavigate();

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the provided f_name matches the username
    if (card.f_name === username) {
      try {
        await axios.post("http://localhost:8080/api/cards", card);
        alert("Card added successfully!");
      } catch (error) {
        console.error("Error adding card:", error);
        alert(`Failed to add card: ${error.message}`);
      }
    } else {
      // If the provided f_name does not match the username, show an error
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
          value={card.f_name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={card.password}
          onChange={handleChange}
        />
        <select name="cardType" value={card.cardType} onChange={handleChange}>
          <option value="">Select Card Type</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
          <option value="Prepaid">Prepaid</option>
        </select>
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}

export default CardForm;
