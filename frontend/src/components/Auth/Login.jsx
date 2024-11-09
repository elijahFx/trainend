import React, { useState } from "react";
import styled from "styled-components"; // Import styled-components
import { useLoginMutation } from "../../apis/userApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../slices/authSlice";

// Styled components
const LoginContainer = styled.div`
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
  gap: 10px;
  height: 65vh;
  min-height: 65vh
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
  display: inline-block;
  margin-top: 20px;
  text-align: center;
  color: #61dafb;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #21a1f1;
    text-decoration: underline;
  }
`;

const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        email: formData.username,
        password: formData.password,
      }).unwrap();
      // Handle successful login, e.g., redirect to dashboard
      console.log("Login successful!");
      dispatch(loginUser(result));
      navigate("/");
    } catch (error) {
      // Handle login error
      console.error("Login failed: ", error);
    }
  };

  return (
    <LoginContainer>
      <Title>Войти</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Почта или имя:</Label>
          <Input
            type="text"
            name="username"
            required
            value={formData.username}
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Входим ;)" : "Войти"}
        </Button>
      </Form>
      {isError && (
        <ErrorMessage>
          Error: {error.data?.message || "Login failed"}
        </ErrorMessage>
      )}
      <StyledLink to="/signup">Зарегистрироваться</StyledLink>
    </LoginContainer>
  );
};

export default Login;
