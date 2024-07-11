const { getUser } = require("../services/userServiceToken");

const generateRandomCardNumber = () => {
  const cardNumber = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return cardNumber;
};

const createCard = async (req, res) => {
  const pool = req.pool;
  const { cardType } = req.body;
  const cardNo = generateRandomCardNumber();

  const user = req.user; // Access the authenticated user directly from middleware

  // Example usage of req.user
  const customerId = user.id;

  const checkExistingCardQuery =
    "SELECT * FROM card WHERE customer_id = ? AND card_type = ? LIMIT 1";

  pool.query(checkExistingCardQuery, [customerId, cardType], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing card:", checkErr);
      return res.status(500).json({ error: "Failed to check existing card" });
    }

    if (checkResult.length > 0) {
      console.log(`Customer already has a ${cardType} card.`);
      return res.status(400).json({ error: `You already have a ${cardType} card.` });
    }

    const accountNoQuery =
      "SELECT account_no FROM account WHERE customer_id = ? AND acc_type = 'savings' LIMIT 1";
    pool.query(accountNoQuery, [customerId], (accountNoErr, accountNoResult) => {
      if (accountNoErr) {
        console.error("Error finding savings account number:", accountNoErr);
        return res.status(500).json({ error: "Failed to find savings account number" });
      }

      if (accountNoResult.length === 0) {
        return res.status(404).json({ error: "No savings account found for the customer" });
      }

      const { account_no } = accountNoResult[0];

      const insertQuery =
        "INSERT INTO card (card_no, customer_id, acc_no, card_type) VALUES (?, ?, ?, ?)";
      pool.query(insertQuery, [cardNo, customerId, account_no, cardType], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting card:", insertErr);
          return res.status(500).json({ error: "Failed to insert card" });
        }

        console.log("Card added successfully:", insertResult);
        res.status(201).json({ message: "Card added successfully" });
      });
    });
  });
};

module.exports = {
  createCard,
};
