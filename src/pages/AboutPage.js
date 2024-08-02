import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #53B7FF;
  font-family: 'Helvetica', sans-serif;
  visibility: hidden; /* Initial visibility set to hidden */
  ${({ isVisible }) => isVisible && css`
    visibility: visible; /* Change visibility to visible when isVisible is true */
    animation: ${fadeIn} 1s ease-in forwards;
  `}
`;

const Content = styled.div`
  background-color: white;
  padding: 4vw;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  width: 60vw;
  min-height: 30vh; /* Set a min height */
  max-height: 30vw; /* Set a max height */
  text-align: center;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Title = styled.h1`
  color: #53B7FF;
  font-size: 3vw;
  margin-bottom: 1vw;
`;

const Subtitle = styled.h2`
  color: #3893FF;
  font-size: 2vw;
  margin-bottom: 2vw;
`;

const Subtitle2 = styled.h2`
  color: black;
  font-size: 2vw;
  margin-bottom: 2vw;
`;

const Text = styled.p`
  color: black;
  font-size: 1.5vw;
  line-height: 1.5;
`;

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Wrapper isVisible={isVisible}>
      <Content>
        <Title>Team Pineapple</Title>
        <Subtitle>Hongik Univ.</Subtitle>
        <Subtitle2>Team Members & Project Details</Subtitle2>
        <Text>
          안재경 (Project Manager)
          <br />
          변희민 (Backend)
          <br />
          오연서 (Backend)
          <br />
          강유민 (Designer)
          <br />
          김동욱 (Frontend)
          <br />
          엄경호 (Frontend)
          <br />
        </Text>
        
        <Text>
          We are a team of passionate individuals dedicated to creating impactful solutions. 
          Our project aims to combine emotion tracking and timers to manage emotions, schedules, and ultimately your mental health.
          <br />
          <br />
          Our project is designed to help you manage your emotions and schedule through the integration of emotion tracking and timers. By monitoring your emotions and managing your time effectively, we strive to enhance your mental well-being.
        </Text>
      </Content>
    </Wrapper>
  );
};

export default AboutPage;