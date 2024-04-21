import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AmountOwed() {
  const [password, setPassword] = useState("");
  const [owedAmount, setOwedAmount] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const redirectToWelcomePage = () => {
    navigate(`/welcomePage/${username}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send username and password to the server to fetch the owed amount
      const response = await axios.post("http://localhost:8080/api/loanAmount", {
        username: username,
        password: password
      });
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
      <button onClick={redirectToWelcomePage}>Home/Welcome Page</button>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Fetch Owed Amount</button>
      </form>
      {owedAmount !== null && <p>Owed Amount: {owedAmount}</p>}
    </div>
  );
}

export default AmountOwed;
