import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCustomer from './Components/createCustomer';


function App() {

  return (
    <Router>
      <div className='my-3'>

        <Routes>
          <Route path='/createCustomer' element={<CreateCustomer/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
