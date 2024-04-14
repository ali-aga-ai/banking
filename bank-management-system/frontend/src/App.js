import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCustomer from './Components/createCustomer';
import CreateAccount from './Components/createAccount';
import CreateCard from './Components/createCard';
import LoanApply from './Components/loanApply';
import Transaction from './Components/transaction';
import Dashboard from './Components/welcomePage';

function App() {
  return (
    <Router>
      <div className='my-3'>
        <Routes>
          <Route path='/createCustomer' element={<CreateCustomer />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/createCard' element={<CreateCard />} />
          <Route path='/loanApply' element={<LoanApply />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path="/welcomePage/:username" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
