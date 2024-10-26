import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled components
const FooterWrapper = styled.footer`
  background-color: #282c34;
  color: #ffffff;
  padding: 15px;
  text-align: center;
  font-size: 1rem;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  min-height: 15vh;
`;

const FooterText = styled.p`
  margin: 0;
  font-weight: bold;
`;

const AuthorText = styled.p`
  margin: 5px 0 0 0;
  font-size: 0.9rem;
  color: #b0b0b0;
`;

// Styled Link component
const StyledLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-bottom 0.3s;

  &:hover {
    color: #21a1f1;
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <FooterWrapper>
      <FooterText>Сделано ООО "Кафка". 2024 - {currentYear}</FooterText>
      <AuthorText>220024, г. Минск, ул. Асаналиева, д. 44, 2 этаж</AuthorText>
      <AuthorText>УНП: 913678471</AuthorText>
      <AuthorText>
        info@kafka.by <StyledLink to="https://kafka.by">kafka.by</StyledLink>
      </AuthorText>
      <AuthorText>
        BY Колесников Глеб Константинович & Смоляков Максим Дмитриевич
      </AuthorText>
    </FooterWrapper>
  );
}
