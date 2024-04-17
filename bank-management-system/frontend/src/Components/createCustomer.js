import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';


function CustomerForm() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({ firstName: '', middleName: '', lastName: '', creditScore: '', address: '', contactNumber: '' , password:''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customers', customer);
      alert('Customer added successfully!');
      navigate(`/welcomePage/${customer.firstName}`)

    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={customer.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="middleName"
        placeholder="Middle Name"
        value={customer.middleName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={customer.lastName}
        onChange={handleChange}
      />
      <input
        type="number"
        name="creditScore"
        placeholder="Credit Score"
        value={customer.creditScore}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={customer.address}
        onChange={handleChange}
      />
      <input
        type="number"
        name="contactNumber"
        placeholder="Contact Number"
        value={customer.contactNumber}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={customer.password}
        onChange={handleChange}
      />
      <button type="submit">Add Customer</button>
    </form>
  );
}

export default CustomerForm;
