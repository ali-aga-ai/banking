import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

function AccountForm() {
  const [account, setAccount] = useState({
    balance: "",
    accType: "",
    interestRate: "",
  });
  const [accountNo,setAccountNo] = useState("")
  const { username } = useParams();
  const navigate = useNavigate();

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8000/createAccount", account);
      setAccountNo(response.accountNo)
      alert("Account added successfully!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("An account of this type already exists for the customer.");
      } else {
        console.error("Error adding account:", error);
        alert("Failed to add account!");
      }
    }
  };
  

  return (
    <div>
      <Button onClick={redirectToWelcomePage}>Home/Welcome Page</Button>
      <FormContainer onSubmit={handleSubmit}>
        
        <Input
          type="number"
          name="balance"
          placeholder="Balance"
          value={account.balance}
          onChange={handleChange}
        />
        <Select name="accType" value={account.accType} onChange={handleChange}>
          <option value="">Select Account Type</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
          <option value="Investment">Investment</option>
        </Select>
        <Input
          type="number"
          name="interestRate"
          placeholder="Interest Rate"
          value={account.interestRate}
          onChange={handleChange}
        />
    
        <Button onClick={handleSubmit}>Add Account</Button>
        {accountNo && <div>{accountNo}</div>}
      </FormContainer>
    </div>
  );
}

export default AccountForm;
