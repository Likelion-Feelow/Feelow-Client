import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

import DW from '../images/profileIMG/DW.jpeg';
import HM from '../images/profileIMG/HM.jpeg';
import YS from '../images/profileIMG/YS.jpeg';
import YM from '../images/profileIMG/YM.jpeg';
import JK from '../images/profileIMG/JK.png';
import KH from '../images/profileIMG/KH.jpeg';

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
  visibility: hidden;
  ${({ isVisible }) => isVisible && css`
    visibility: visible;
    animation: ${fadeIn} 1s ease-in forwards;
  `}
`;

const Content = styled.div`
  background-color: white;
  padding: 3vw;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  width: 50vw;
  max-height: 65vh;
  text-align: center;
  overflow-y: auto;
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

const MemberList = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding: 1vw 0;
  margin-bottom: 2vw;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const Card = styled.div`
  background: ${({ bgColor }) => bgColor || '#f0f0f0'};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: 10vw;
  height: 15vw;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  cursor: pointer;
  perspective: 1000px;
  margin: 0 1vw;
  
  &:hover {
    transform: scale(1.3);
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => isFlipped ? 'rotateY(180deg)' : 'none'};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  color: black;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const Avatar = styled.img`
  background-color: white;
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  object-fit: cover;
  margin-bottom: 1vw;
`;

const MemberInfo = styled.div`
  text-align: center;
  font-size: 1.5vw;
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

const emotions = [
  { main: '긍정', bgColor: '#FFD89D', fontColor: '#FFA51E' },
  { main: '평온', bgColor: '#FF9DC6', fontColor: '#FF4A96' },
  { main: '우울', bgColor: '#67BFFF', fontColor: '#0094FF' },
  { main: '불안', bgColor: '#C29DFF', fontColor: '#853AFF' },
  { main: '분노', bgColor: '#FF9D9D', fontColor: '#FF4E4E' },
];

const memberImages = [JK, HM, YS, YM, DW, KH];

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardClick = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const members = [
    { name: '안재경', role: 'Project Manager', description: '안재경은 프로젝트 매니저로 팀을 이끌고 있습니다.' },
    { name: '변희민', role: 'Backend', description: '변희민은 백엔드 개발을 담당하고 있습니다.' },
    { name: '오연서', role: 'Backend', description: '오연서는 백엔드 개발을 담당하고 있습니다.' },
    { name: '강유민', role: 'Designer', description: '강유민은 디자이너로, 디자인을 담당하고 있습니다.' },
    { name: '김동욱', role: 'Frontend', description: '김동욱은 프론트엔드 개발을 담당하고 있습니다.' },
    { name: '엄경호', role: 'Frontend', description: '엄경호는 프론트엔드 개발을 담당하고 있습니다.' },
  ];

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
          {members.map((member, index) => (
            <Card 
              key={index} 
              onClick={() => handleCardClick(index)} 
              bgColor={member.name === '안재경' ? 
                'linear-gradient(45deg, #FFD89D, #FF9DC6, #67BFFF, #C29DFF, #FF9D9D)' : 
                emotions[index % emotions.length].bgColor}
            >
              <CardInner isFlipped={flippedCards[index]}>
                <CardFront>
                  <Avatar src={memberImages[index]} alt={`${member.name}'s avatar`} />
                  <MemberInfo>
                    <div>{member.name}</div>
                    <div>{member.role}</div>
                  </MemberInfo>
                </CardFront>
                <CardBack>
                  {member.description}
                </CardBack>
              </CardInner>
            </Card>
          ))}
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