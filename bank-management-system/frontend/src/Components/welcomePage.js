import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const DashboardContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const redirectToCreateAccount = () => {
    navigate(`/createAccount/${username}`);
  };

  const redirectToCreateCard = () => {
    navigate(`/createCard/${username}`);
  };

  const redirectToApplyLoan = () => {
    navigate(`/loanApply/${username}`);
  };

  const redirectToSendMoney = () => {
    navigate(`/transaction/${username}`);
  };

  const redirectToOwedMoney = () => {
    navigate(`/amountOwed/${username}`);
  };

  const redirectToLoanStatus = () =>{
    navigate(`/loanStatus/${username}`);

  }

  return (
    <DashboardContainer>
      <Heading>Welcome {username}</Heading>
      <ButtonContainer>
        <Button onClick={redirectToCreateAccount}>Create Account</Button>
        <Button onClick={redirectToCreateCard}>Create Card</Button>
        <Button onClick={redirectToApplyLoan}>Apply Loan</Button>
        <Button onClick={redirectToSendMoney}>Send Money</Button>
        <Button onClick={redirectToOwedMoney}>How much I owe?</Button>
        <Button onClick={redirectToLoanStatus}>Loan Status</Button>
      </ButtonContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
