import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateCustomer from './Components/createCustomer';
import CreateAccount from './Components/createAccount';


function App() {

  return (
    <Router>
      <div className='my-3'>

        <Routes>
          <Route path='/createCustomer' element={<CreateCustomer/>}/>
          <Route path='/createAccount' element={<CreateAccount/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
