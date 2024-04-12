import React, { useState } from 'react';
import axios from 'axios';

function CustomerForm() {
  const [customer, setCustomer] = useState({ firstName: '', middleName: '', lastName: '', creditScore: '', address: '', contactNumber: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customers', customer);
      alert('Customer added successfully!');
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
      <button type="submit">Add Customer</button>
    </form>
  );
}

export default CustomerForm;
