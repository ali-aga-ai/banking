const { setUser, getUser } = require("../services/userServiceToken");
const bcrypt = require("bcrypt");

const addCustomer = async (req, res) => {
  try {
    const pool = req.pool;
    const {
      firstName,
      middleName,
      lastName,
      creditScore,
      address,
      contactNumber,
      password,
    } = req.body;

    const existsQuery = "SELECT * FROM customer where contact_number = ?";
    const existsResult = await executeQuery(pool, existsQuery, [contactNumber]);

    if (existsResult.length > 0) {
      console.error("contactNumber in use");
      return res.status(500).json({ error: "contactNumber in use" });
    }

    const insertQuery =
      "INSERT INTO customer (f_name, m_name, l_name, credit_score, address, contact_number, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const hashedPassword = await bcrypt.hash(password, 10); //10 is salt

    await executeQuery(pool, insertQuery, [
      firstName,
      middleName,
      lastName,
      creditScore,
      address,
      contactNumber,
      hashedPassword,
    ]);

    const customerIdQuery =
      "SELECT * FROM customer WHERE f_name = ? AND l_name = ?";
    const selectResult = await executeQuery(pool, customerIdQuery, [
      firstName,
      lastName,
    ]);

    if (!selectResult || selectResult.length === 0) {
      console.error("Customer ID not found");
      return res.status(500).json({ error: "Customer ID not found" });
    }
    
    const token = setUser(selectResult);
    if (!token) {
      console.log("Token generation failed");
      return res.render("login", { error: "Internal Server Error" });
    }

    res.cookie("uid", token);
    console.log("Login successful, token set in cookie");

    console.log("Customer added successfully");
    console.log("Customer ID:", selectResult);
    res.status(201).json({
      message: "Customer added successfully",
      customerId: selectResult[0].customer_id,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to execute a database query and return a promise
function executeQuery(pool, query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  addCustomer,
};

