import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for current route
import styled from "styled-components"; // Import styled-components for styling

const HeaderWrapper = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 20vh;
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

export default function Header() {
  const location = useLocation(); // Get the current location

  return (
    <HeaderWrapper>
      Trainend - сайт для отслеживания тренировок, воздержания от зависимостей,
      крутых цитаток и журнал планов и дел!
      <ButtonGroup>
        {/* Show all links, except the one that matches the current pathname */}
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
      </ButtonGroup>
    </HeaderWrapper>
  );
}
