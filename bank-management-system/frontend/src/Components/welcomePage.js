import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const redirectToCreateAccount = () => {
    navigate(`/createAccount/${username}`); // Use template literals to include the actual username
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

  return (
    <div>
      <h2>Welcome {username}</h2>
      <div>
        <button onClick={redirectToCreateAccount}>Create Account</button>
        <button onClick={redirectToCreateCard}>Create Card</button>
        <button onClick={redirectToApplyLoan}>Apply Loan</button>
        <button onClick={redirectToSendMoney}>Send Money</button>
      </div>
    </div>
  );
};

export default Dashboard;
