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

const wave = keyframes`
  0%, 40%, 100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10px);
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
  padding: 3vw;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  width: 60vw;
  min-height: 50vh; /* Set a min height */
  max-height: 60vh; /* Set a max height */
  text-align: center;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3vw;
  margin-bottom: 1vw;
  font-weight: bold;
  color: #53B7FF;
`;

const Word = styled.div`
  display: flex;
`;

const Letter = styled.span`
  display: inline-block;
  color: ${({ color }) => color};
  animation: ${wave} 1.5s infinite;
  animation-delay: ${({ delay }) => delay};
`;

const Subtitle = styled.h2`
  color: #3893FF;
  font-size: 2vw;
  margin-bottom: 2vw;
  font-weight: bold;
`;

const Subtitle2 = styled.h3`
  color: black;
  font-size: 1.8vw;
  margin-bottom: 1.5vw;
`;

const MemberList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 1.5vw;
  line-height: 2;
  text-align: left;
  margin-bottom: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberItem = styled.li`
  margin-bottom: 0.5vw;
  &:before {
    content: "👤"; /* Adding an icon before each member */
    margin-right: 1vw;
  }
`;

const Text = styled.p`
  color: black;
  font-size: 1.2vw;
  line-height: 1.8;
  margin-bottom: 2vw;
`;

const colors = [
  '#FFD700', '#FFA500', '#FF4500', '#32CD32', '#ADFF2F', '#FF6347', '#FF69B4', '#BA55D3', '#1E90FF', '#20B2AA'
];

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Wrapper isVisible={isVisible}>
      <Content>
        <Title>
          <Word>
            {'Team'.split('').map((letter, index) => (
              <Letter key={index} color={colors[index % colors.length]} delay={`${index * 0.1}s`}>
                {letter}
              </Letter>
            ))}
          </Word>
          <Word>
            {'Pineapple'.split('').map((letter, index) => (
              <Letter key={index} color={colors[(index + 4) % colors.length]} delay={`${(index + 4) * 0.1}s`}>
                {letter}
              </Letter>
            ))}
          </Word>
        </Title>
        <Subtitle>Hongik Univ.</Subtitle>
        <Subtitle2>Team Members & Project Details</Subtitle2>
        <MemberList>
          <MemberItem>안재경 (Project Manager)</MemberItem>
          <MemberItem>변희민 (Backend)</MemberItem>
          <MemberItem>오연서 (Backend)</MemberItem>
          <MemberItem>강유민 (Designer)</MemberItem>
          <MemberItem>김동욱 (Frontend)</MemberItem>
          <MemberItem>엄경호 (Frontend)</MemberItem>
        </MemberList>
        <Text>
          We are a team of passionate individuals dedicated to creating impactful solutions. 
          Our project aims to combine emotion tracking and timers to manage emotions, schedules, and ultimately your mental health.
        </Text>
        <Text>
          Our project is designed to help you manage your emotions and schedule through the integration of emotion tracking and timers. By monitoring your emotions and managing your time effectively, we strive to enhance your mental well-being.
        </Text>
      </Content>
    </Wrapper>
  );
};

export default AboutPage;