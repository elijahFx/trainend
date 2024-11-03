import React, { useState } from "react";
import styled from "styled-components"; // Import styled-components
import { useSignupMutation } from "../../apis/userApi"; // Ensure this hook matches your API
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

// Styled components
const SignupContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px; // Increased gap for better spacing between elements
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; // Ensure the form takes full width of the container
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center; // Center the items vertically
  margin-bottom: 15px; // Space between each form group
`;

const Label = styled.label`
  flex: 0 0 120px; // Fixed width for the label
  margin-right: 10px; // Space between the label and input
  color: #555;
  text-align: right; // Align text to the right
`;

const Input = styled.input`
  flex: 1; // Allow the input to take up remaining space
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  height: 40px; // Fixed height for consistent input sizes

  &:focus {
    border-color: #61dafb;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 40px; // Same height as input for consistency

  &:hover {
    background-color: #21a1f1;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #61dafb;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    color: #21a1f1;
  }
`;

const Signup = () => {
  const [signup, { isLoading, isError, error }] = useSignupMutation();
  const [formData, setFormData] = useState({
    name: "",
    id: "", // You might want to generate or manage this appropriately
    date: new Date().toISOString().slice(0, 10), // Assuming you want the current date
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword state
  });

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      await signup({
        name: formData?.name,
        email: formData.email,
        date: formData.date,
        password: formData.password,
        id: nanoid(),
        role: "user"
      }).unwrap();
      // Handle successful signup, e.g., redirect to login or dashboard
      console.log("Signup successful!");
    } catch (error) {
      // Handle signup error
      console.error("Signup failed: ", error);
    }
  };

  return (
    <SignupContainer>
      <Title>Зарегистрироваться</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Имя (опционально):</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email" // Changed to "email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Пароль:</Label>
          <Input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Повторите пароль:</Label>
          <Input
            type="password"
            name="confirmPassword" // New input for confirm password
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Регистрируемся" : "Зарегистрироваться"}
        </Button>
      </Form>
      {isError && (
        <ErrorMessage>
          Error: {error.data?.message || "Signup failed"}
        </ErrorMessage>
      )}
      <StyledLink to="/login">Уже есть аккаунт? Войди здесь.</StyledLink>
    </SignupContainer>
  );
};

export default Signup;
