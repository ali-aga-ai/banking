import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCustomer from "./Components/createCustomer";
import CreateAccount from "./Components/createAccount";
import CreateCard from "./Components/createCard";
import LoanApply from "./Components/loanApply";
import Transaction from "./Components/transaction";
import Dashboard from "./Components/welcomePage";
import AmountOwed from "./Components/amountOwed";
import TransactionFinal from "./Components/transaction_final";

function App() {
  return (
    <Router>
      <div className="my-3">
        <Routes>
          {/* <Route path="/" element={<div> Hello World</div>} /> */}
          <Route
            path="/createCustomer"
            element={<CreateCustomer />}
          />
          <Route path="/createAccount/:username" element={<CreateAccount />} />
          <Route path="/createCard/:username" element={<CreateCard />} />
          <Route path="/loanApply/:username" element={<LoanApply />} />
          {/* <Route path="/transaction/:username" element={<Transaction />} /> */}
          <Route path="/transaction/:username" element={<TransactionFinal />} />

          <Route path="/welcomePage/:username" element={<Dashboard />} />
          <Route path="/amountOwed/:username" element={<AmountOwed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
