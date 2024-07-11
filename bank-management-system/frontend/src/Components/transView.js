import React, { useState, useEffect } from "react";
import axios from "axios";

function TransactionViewer() {
  const [acctype, setAccType] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.post("http://localhost:8000/transactions/fetchTransactions", {
        acctype: acctype,
      });
      const data = response.data;
      if (response.status === 200) {
        setTransactions(data.transactions); // Assuming the API returns data in { transactions: [...] } format
      } else {
        setError(data.error || 'Failed to fetch transactions');
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(`Failed to fetch transactions: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (acctype) {
      fetchTransactions();
    }
  }, [acctype]);

  return (
    <div>
      <input
        type="text"
        value={acctype}
        onChange={(e) => setAccType(e.target.value)}
        placeholder="Enter account type"
      />
      <button onClick={fetchTransactions}>Fetch Transactions</button>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : transactions.length > 0 ? (
          <div>
            {transactions.map((transaction, index) => (
              <div key={index}>
                <p>From Account: {transaction.acc_from}</p>
                <p>To Account: {transaction.acc_to}</p>
                <p>Transaction Date: {transaction.transaction_date}</p>
                <p>Amount: {transaction.amount}</p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions found</p>
        )}
      </div>
    </div>
  );
}

export default TransactionViewer;
