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
    

    
    const query = 'INSERT INTO customer (f_name, m_name, l_name, credit_score, address, contact_number) VALUES (?, ?, ?, ?, ?, ?)';
    pool.query(query, [firstName, middleName, lastName, creditScore, address, contactNumber], (err, result) => {
      if (err) {
        console.error('Error inserting customer:', err);
        return res.status(500).json({ error: 'Failed to insert customer' });
      }
      console.log('Customer added successfully:', result);
      res.status(201).json({ message: 'Customer added successfully' });
    });
  });

// Define API routes for handling account information
app.post('/api/accounts', (req, res) => {
  const { accountNo, balance, accType, interestRate } = req.body;
  const query = 'INSERT INTO accounts (account_no, balance, acc_type, interest_rate) VALUES (?, ?, ?, ?)';
  pool.query(query, [accountNo, balance, accType, interestRate], (err, result) => {
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
