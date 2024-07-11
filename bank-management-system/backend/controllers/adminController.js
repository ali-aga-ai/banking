const depositMoney = async (req, res) => {
    try {
        const pool = req.pool;
        const { amount, userId } = req.body;

        const depositQuery = "UPDATE account SET balance = balance + ? WHERE account_no = ?";

        pool.query(depositQuery, [amount, userId], (err, result) => {
            if (err) {
                console.error("Error adding money to account:", err);
                return res.status(500).json({ error: "Failed to add money to account" });
            }
            console.log("Money added successfully:", result);
            return res.status(200).json({ message: "Money added successfully" });
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
const viewUsers = async (req, res) => {
    try {
        const pool = req.pool;

        const viewQuery = "SELECT * FROM customer";

        pool.query(viewQuery, (err, result) => {
            if (err) {
                console.error("Error finding users:", err);
                return res.status(500).json({ error: "Failed to find users" });
            }
            console.log("Users found:", result);
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

const pendingLoans = async (req, res) => {
    try {
        const pool = req.pool;

        const viewQuery = "SELECT loan_no, loan_amount, loan_per_balance, occupation, customer_id, application_date FROM loanApproval where approval_status = ? order by application_date";

        pool.query(viewQuery, ["pending"], (err, result) => {
            if (err) {
                console.error("Error finding loans:", err);
                return res.status(500).json({ error: "Failed to find loans" });
            }
            console.log("Loans found:", result);
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

const approveLoan = async (req, res) => {
    try {
        const pool = req.pool;

        const { loanId, status } = req.body;

        const approveQuery = `UPDATE loanApproval SET approval_status = ?, bank_response_date = CURDATE() WHERE loan_no = ?`;
        const approveQuery2 = `UPDATE loan SET status = ? WHERE loan_no = ?`;

        pool.query(approveQuery, [status, loanId], (err, result) => {
            if (err) {
                console.error("Error approving loan:", err);
                return res.status(500).json({ error: "Failed to approve loan" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No loan found with the provided ID." });
            }
            pool.query(approveQuery2, [status, loanId], (err, result) => {
                if (err) {
                    console.error("Error updating loan status:", err);
                    return res.status(500).json({ error: "Failed to approve loan" });
                }
                console.log("Loan approved:", result);
                res.status(200).json({ message: "Loan approved successfully" });
            });
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};



module.exports = {
    depositMoney,
    viewUsers,
    pendingLoans,
    approveLoan
};
