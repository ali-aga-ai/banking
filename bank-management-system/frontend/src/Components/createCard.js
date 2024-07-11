import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function CardForm() {
  const [card, setCard] = useState({ cardType: "" });
  const { username } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      try {
        await axios.post("http://localhost:8000/createCard", card);
        alert("Card added successfully!");
      } catch (error) {
        console.error("Error adding card:", error);
        if (error.response && error.response.status === 400) {
          // Assuming error.response.data contains the error message from the backend
          alert(`Error: ${error.response.data.error}`);
        } else {
          console.error("Generic error:", error);
          alert("Failed to add card!");
        }  }
    
  };

  return (
    <div>
      <Button onClick={redirectToWelcomePage}>Home/Welcome Page</Button>
      <FormContainer onSubmit={handleSubmit}>
        
        <Select name="cardType" value={card.cardType} onChange={handleChange}>
          <option value="">Select Card Type</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
          <option value="Prepaid">Prepaid</option>
        </Select>
        <Button onClick={handleSubmit}>Add Card</Button>
      </FormContainer>
    </div>
  );
}

export default CardForm;
