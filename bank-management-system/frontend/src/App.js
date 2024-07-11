import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCustomer from "./Components/createCustomer";
import CreateAccount from "./Components/createAccount";
import CreateCard from "./Components/createCard";
import LoanApply from "./Components/loanApply";
import Dashboard from "./Components/welcomePage";
import AmountOwed from "./Components/amountOwed";
import Admin from "./Components/admin";
import TransactionFinal from "./Components/transaction_final";
import axios from "axios";
import ApproveLoans from "./Components/ApproveLoans";
import LoanStatus from "./Components/LoanStatus";
import TransView from "./Components/transView";

axios.defaults.withCredentials = true; //allows cookies to be sent by default in axios req body

function App() {
  return (
    <Router>
      <div className="my-3">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/approveLoans" element={<ApproveLoans />} />

          <Route path="/createCustomer" element={<CreateCustomer />} />
          <Route path="/createAccount/:username" element={<CreateAccount />} />
          <Route path="/createCard/:username" element={<CreateCard />} />
          <Route path="/loanApply/:username" element={<LoanApply />} />
          {/* <Route path="/transaction/:username" element={<Transaction />} /> */}
          <Route path="/transaction/:username" element={<TransactionFinal />} />
          <Route path="/loanStatus/:username" element={<LoanStatus />} />
          <Route path="/welcomePage/:username" element={<Dashboard />} />
          <Route path="/amountOwed/:username" element={<AmountOwed />} />
          <Route path="/viewTransactions/" element={<TransView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
