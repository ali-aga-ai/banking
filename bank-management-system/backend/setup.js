const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./db"); // Assuming this correctly initializes your database pool
const { checkAuth } = require("./middleware/auth");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const cardRoutes = require("./routes/cardRoutes");
const loanRouter = require("./routes/loanRouter");
const transactionsRoutes = require("./routes/transactions");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000; // Use environment variable for port or default to 8000

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Enable CORS credentials (cookies, authorization headers)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Custom Middleware to provide database pool to routes
app.use((req, res, next) => {
  req.pool = pool; // Attach database pool to request object
  next();
});

// Routes
app.use("/admin", adminRoutes);
app.use("/createCustomer", customerRoutes);
app.use("/login", authRoutes);

// Apply global authentication middleware
app.use(checkAuth);

app.use("/createAccount", accountRoutes);
app.use("/createCard", cardRoutes);
app.use("/loan", loanRouter);
app.use("/transaction", require("./routes/transactions"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
