import React from 'react';
import styled, { keyframes } from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #ECF8FF;
    position: relative;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const wave = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-30px);
  }
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8vh;
`;

const Dot = styled.div`
  width: 2vw;
  height: 2vw;
  margin: 0 4vw;
  background-color: #53B7FF;
  border-radius: 50%;
  animation: ${wave} 1.5s infinite;
  animation-delay: ${props => props.delay};
`;

const LoadingText = styled.div`
  margin-top: 2vw;
  font-family: Helvetica, sans-serif;
  color: black;
  font-size: 2vw;
`;

const LogoText = styled.div`
  position: absolute;
  top: 3vw;
  left: 4vw;
  font-family: Helvetica, sans-serif;
  color: #53B7FF;
  font-weight: bold;
  font-size: 2vw;
`;

const LoadingPage = () => {
    return (
    <MainContainer>
        <LogoText>Evaluating</LogoText>

        <CenterContainer>
            <Dots>
                <Dot delay="0s" />
                <Dot delay="0.1s" />
                <Dot delay="0.2s" />
            </Dots>
            <LoadingText>감정에 맞는 패턴을 분석 중입니다.</LoadingText>
            <LoadingText>잠시만 기다려주세요.</LoadingText>
        </CenterContainer>
    </MainContainer>
    );
};

export default LoadingPage;