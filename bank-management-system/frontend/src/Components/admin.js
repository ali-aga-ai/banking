import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [owedAmount, setOwedAmount] = useState(null);

  const handleView = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/viewUsers");
      setUsers(response.data); // Assuming response.data is an array of user objects
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const approveLoans = async ()=>{
    navigate(`/admin/approveLoans`);
  }
  const handleDepositButton = () => {
    const depoField = document.getElementById("depositField");
    depoField.style.display = "block";
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/admin/depositMoney", {
        amount: amount,
        userId: userId,
      });
      const data = response.data;
      if (response.status === 200) {
        alert("Deposit successful");
      } else {
        alert(data.error || "Failed to deposit money");
      }
    } catch (error) {
      console.error("Error depositing money:", error);
      alert(`Failed to deposit money: ${error.message}`);
    }
  };

  return (
    <div>
      <Button onClick={handleView}>View Users</Button>
      {users && <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Credit Score</th>
            <th>Address</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.customer_id}>
              <td>{user.customer_id}</td>
              <td>{`${user.f_name} ${user.m_name} ${user.l_name}`}</td>
              <td>{user.credit_score}</td>
              <td>{user.address}</td>
              <td>{user.contact_number}</td>
            </tr>
          ))}
        </tbody>
      </table>}
      <Button onClick={handleDepositButton}>Deposit Money</Button>
      <FormContainer id="depositField" style={{ display: 'none' }}>
        <Input
          type="text"
          placeholder="UserId"
          value={userId}
          onChange={handleUserIdChange}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <Button onClick={handleDeposit}>Deposit</Button>
      </FormContainer>
      <Button onClick={approveLoans}>Approve Loans</Button>
    </div>
  );
}

export default Admin;
