import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { username } = useParams(); // Extract the username parameter from the URL

  const redirectToCreateAccount = () => {
    navigate('/createAccount/:username'); // Use navigate instead of history.push
  };

  const redirectToCreateCard = () => {
    navigate('/createCard/:username'); // Use navigate instead of history.push
  };

  const redirectToApplyLoan = () => {
    navigate('/loanApply/:username'); // Use navigate instead of history.push
  };

  const redirectToSendMoney = () => {
    navigate('/transaction/:username'); // Use navigate instead of history.push
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
