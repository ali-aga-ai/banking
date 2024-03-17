import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, // environment variables hide informaiton
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

app.use(express.json()); // Parse JSON request bodies

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { fName, mName, lName, creditScore, address, contactNumber } = req.body;

    const sql = `INSERT INTO customers (f_name, m_name, l_name, credit_score, address, contact_number) VALUES (?, ?, ?, ?, ?, ?)`;

    pool.query(sql, [fName, mName, lName, creditScore, address, contactNumber], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Data inserted successfully.");
        res.status(200).json({ message: "Data inserted successfully" });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
