import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

function CustomerForm() {
  const navigate = useNavigate();// nacigate is done to go to different locations/ urls (around line 62)

  const [customer, setCustomer] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    creditScore: "",
    address: "",
    contactNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/createCustomer", customer);
      alert("Customer added successfully!");
      navigate(`/welcomePage/${customer.firstName}`);
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={customer.firstName}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="middleName"
        placeholder="Middle Name"
        value={customer.middleName}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={customer.lastName}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="creditScore"
        placeholder="Credit Score"
        value={customer.creditScore}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="address"
        placeholder="Address"
        value={customer.address}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={customer.contactNumber}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={customer.password}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Add Customer</Button>
    </FormContainer>
  );
}

export default CustomerForm;

/*

When you interact with elements on a webpage, such as clicking a link or submitting a form, certain default behaviors are triggered by the browser.
 For example, clicking a link typically navigates to the URL specified in the link's href attribute, and submitting a form typically sends the form data to the server.
 
 
 When you call e.preventDefault() within an event handler, it tells the browser not to perform its default action for that event.
 
 */