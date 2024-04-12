const express = require('express');
const cors = require('cors');
const { createPool } = require('mysql');

const app = express();
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '$entropics110',
  database: 'banking',
  connectionLimit: 10
});

app.use(cors());
app.use(express.json());

// Define API routes for handling customer information
app.post('/api/customers', (req, res) => {
    const { firstName, middleName, lastName, creditScore, address, contactNumber } = req.body;
    

const insertQuery = 'INSERT INTO customer (f_name, m_name, l_name, credit_score, address, contact_number) VALUES (?, ?, ?, ?, ?, ?)';
pool.query(insertQuery, [firstName, middleName, lastName, creditScore, address, contactNumber], (err, insertResult) => {
  if (err) {
    console.error('Error inserting customer:', err);
    return res.status(500).json({ error: 'Failed to insert customer' });
  }
  
  const customerIdQuery = 'SELECT customer_id FROM customer WHERE f_name = ? AND l_name = ?';
  pool.query(customerIdQuery, [firstName, lastName], (err, selectResult) => {
    if (err) {
      console.error('Error selecting customer:', err);
      return res.status(500).json({ error: 'Failed to select customer' });
    }
    
    console.log('Customer added successfully:', insertResult);
    console.log('Customer ID:', selectResult);
    res.status(201).json({ message: 'Customer added successfully', customerId: selectResult[0].customer_id });
  });
});
  });

// Define API routes for handling account information
app.post('/api/accounts', (req, res) => {
    const { accountNo, customerID, balance, accType, interestRate } = req.body;
    const query = 'INSERT INTO account (account_no, customer_id, balance, acc_type, interest_rate) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [accountNo, customerID, balance, accType, interestRate], (err, result) => {
      if (err) {
        console.error('Error inserting account:', err);
        return res.status(500).json({ error: 'Failed to insert account' });
      }
      console.log('Account added successfully:', result);
  
      res.status(201).json({ message: 'Account added successfully' });
    });
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
