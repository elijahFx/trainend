import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for the fade-in effect
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Keyframe animation for the bounce effect
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// Styled container for the NotFound component
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
  color: white;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// Styled heading for the message
const Message = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: ${bounce} 1s infinite;
`;

// Styled paragraph for the additional message
const AdditionalInfo = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
`;

export default function NotFound() {
  return (
    <Container className='not-found'>
      <Message>404 - Страница не найдена</Message>
      <AdditionalInfo>К сожалению, страницы с таким названием сейчас еще нет.</AdditionalInfo>
    </Container>
  );
}
