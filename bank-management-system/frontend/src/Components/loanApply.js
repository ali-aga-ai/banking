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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
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

function LoanForm() {
  const [loan, setLoan] = useState({
    
    amount: "",
    interest: "",
    timeMonths: "",
  });
  const { username } = useParams();
  const navigate = useNavigate();

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        await axios.post("http://localhost:8000/loan/loanApply", loan);
        alert("Loan application submitted successfully!");
      } catch (error) {
        console.error("Error submitting loan application:", error);
        alert("Failed to submit loan application!");
      }
      
  };

  return (
    <div>
      <Button onClick={redirectToWelcomePage}>Home/Welcome Page</Button>
      <FormContainer>
        <Title>Apply for Loan</Title>
        <form onSubmit={handleSubmit}>
          
          <Input
            type="number"
            name="amount"
            placeholder="Loan Amount"
            value={loan.amount}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="interest"
            placeholder="Interest Rate"
            value={loan.interest}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="timeMonths"
            placeholder="Loan Term (Months)"
            value={loan.timeMonths}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Apply for Loan</Button>
        </form>
      </FormContainer>
    </div>
  );
}

export default LoanForm;
