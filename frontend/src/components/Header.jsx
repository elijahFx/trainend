import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice"; // Import your logout action

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(31, 38, 41);
  min-height: 10vh;
  padding: 0 20px;
  height: 10vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-right: 25px
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

const LoginLink = styled(Link)`
  margin: 20px;
  padding: 6px 15px;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 153, 255);
  border-radius: 5px;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    background-color: rgb(0, 95, 158);
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

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 32px;
  color: rgb(255, 255, 255);
  font-family: "Mulish", sans-serif;
  text-decoration: none;
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
      <Logo to="/">
        Trainend
        {isLogged && (user.name ? `/${user.name}` : `@${user.email}`)}
      </Logo>
      {isLogged ? (
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
          <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
        </ButtonGroup>
      ) : (
        <LoginLink to="/login">Войти</LoginLink>
      )}
    </HeaderWrapper>
  );
}
