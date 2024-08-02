import React from 'react';
import styled, { keyframes } from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: transparent;
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
`;

const Dot = styled.div`
  width: 3vw;
  height: 3vw; /* 높이와 너비를 동일하게 */
  margin: 0 2.5vw;
  background-color: white;
  border-radius: 50%;
  animation: ${wave} 1.5s infinite;
  animation-delay: ${props => props.delay};
`;

const LoadingText = styled.div`
  margin-top: 6vw;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  font-size: 5vw;
`;

const LoadingPage = () => {
    return (
    <Container>
        <Dots>
        <Dot delay="0s" />
        <Dot delay="0.1s" />
        <Dot delay="0.2s" />
        </Dots>
        <LoadingText>Loading...</LoadingText>
    </Container>
    );
};

export default LoadingPage;

