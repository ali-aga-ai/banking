import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

function AmountOwed() {
  const [owedAmount, setOwedAmount] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

 
  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/loan/loanedAmountFetch");
      const data = response.data;
      if (response.status === 200) {
        setOwedAmount(data.loan_amount);
        alert(`Owed Amount: ${data.loan_amount}`);
      } else {
        alert(data.error || 'Failed to fetch owed amount');
      }
    } catch (error) {
      console.error("Error fetching owed amount:", error);
      alert(`Failed to fetch owed amount: ${error.message}`);
    }
  };

  return (
    <div>
      <Button onClick={redirectToWelcomePage}>Home/Welcome Page</Button>
      <FormContainer onSubmit={handleSubmit}>
        
        <Button onClick={handleSubmit}>Fetch Owed Amount</Button>
      </FormContainer>
      {owedAmount !== null && <p>Owed Amount: {owedAmount}</p>}
    </div>
  );
}

export default AmountOwed;
