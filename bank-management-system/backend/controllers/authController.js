const { setUser2 } = require("../services/userServiceToken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const pool = req.pool; // Assuming req.pool is set up correctly
  const { contactNumber, password } = req.body;

  try {
    const checkAccountQuery = "SELECT * FROM customer WHERE contact_number = ?";

    pool.query(checkAccountQuery, [contactNumber], async (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Error checking existing customer:", checkErr);
        return res.status(500).json({ error: "Failed to check existing customer" });
      }

      console.log("checkResult:", checkResult);
      if (!checkResult[0]) {
        return res.status(409).json({ error: "No customer registered with this number" });
      }

      const user = checkResult[0];
      console.log("User retrieved:", user);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log("Invalid Username or Password");
        return res.status(401).json({ error: "Invalid Username or Password" });
      }

      const token = setUser2(user);
      console.log("Generated token:", token);
      if (!token) {
        console.log("Token generation failed");
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.cookie("uid", token);
      console.log("Login successful, token set in cookie");
      return res.redirect("/home");
    });
  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginUser,
};
