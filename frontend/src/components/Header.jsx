import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice"; // Import your logout action

const HeaderWrapper = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  background-color: #61dafb;
  color: #282c34;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const WelcomeMessage = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #61dafb;
`;

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user); // Get user info from state
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <HeaderWrapper>
      Trainend - сайт для отслеживания тренировок, воздержания от зависимостей,
      крутых цитаток и журнал планов и дел!
      {isLogged && (
        <WelcomeMessage>Добро пожаловать, {user.name || user.email}</WelcomeMessage>
      )}
      <ButtonGroup>
        {location.pathname !== "/addictions" && (
          <StyledLink to="/addictions">Зависимости</StyledLink>
        )}
        {location.pathname !== "/" && (
          <StyledLink to="/">Упражнения</StyledLink>
        )}
        {location.pathname !== "/journal" && (
          <StyledLink to="/journal">Журнал</StyledLink>
        )}
        {location.pathname !== "/calendar" && (
          <StyledLink to="/calendar">Календарь</StyledLink>
        )}
        {isLogged && <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>}
      </ButtonGroup>
    </HeaderWrapper>
  );
}
