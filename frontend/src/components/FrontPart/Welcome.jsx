import React from "react";
import styled from "styled-components";
import heroImg from "../../imgs/chad.png";
import calImg from "../../imgs/cal.png";
import upImg from "../../imgs/up.png";
import trainImg from "../../imgs/train.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-family: 'Mulish', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  margin-bottom: 25px;
`;

const LoginLink = styled(Link)`
  margin: 10px;
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

const Hero = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const HeroImage = styled.img`
  margin: 20px;
  width: 200px;
  height: auto;
`;

const CTA = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(31, 38, 41);
  color: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const CTAHeading = styled.h2`
  margin-bottom: 0;
`;

const CTAButton = styled(LoginLink)`
  font-size: 32px;
  padding: 15px;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 30vh;
  align-items: flex-start;
  padding: 20px 0;
`;

const FeatureEntry = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  text-align: center;
  font-size: 20px;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  transition: transform 1.5s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

export default function Welcome() {
  return (
    <Container>
      <Hero>
        <div>
          <h1>Trainend &mdash; это набор инструментов для улучшения жизни.</h1>
          <p>
          «Мы являемся тем, чем мы постоянно делаем. Совершенство, следовательно, не действие, а привычка».
            <br />
            &mdash; Аристотель
          </p>
        </div>
        <HeroImage src={heroImg} alt="chad" />
      </Hero>

      {/* Call to Action Section */}
      <CTA>
        <CTAHeading>Trainend можно использовать полностью бесплатно</CTAHeading>
        <CTAButton to="/signup">Создайте аккаунт сейчас</CTAButton>
        <LoginLink to="/login">Уже есть аккаунт? Войти</LoginLink>
      </CTA>

      {/* Features Section */}
      <Features>
        <FeatureEntry>
          <Icon src={calImg} alt="Calendar emoji" />
          <p>Планируйте дела в списке задач и календаре.</p>
        </FeatureEntry>

        <FeatureEntry>
          <Icon src={upImg} alt="Star emoji" />
          <p>Отслеживайте полезные и вредные привычки.</p>
        </FeatureEntry>

        <FeatureEntry>
          <Icon src={trainImg} alt="Weightlifter emoji" />
          <p>Ведите дневник тренировок.</p>
        </FeatureEntry>
      </Features>
    </Container>
  );
}
