import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

import arrowImage from '../images/Point.png'; // 화살표 이미지 경로를 지정하세요.

import F from '../images/F.png';
import E1 from '../images/E1.png';
import E2 from '../images/E2.png';
import L from '../images/L.png';
import O from '../images/O.png';
import W from '../images/W.png';

const wave = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const LetterContainer = styled.img`
  width: 5vw;
  margin-right: 0.3vw;
  margin-bottom: 2vh;
  animation: ${({ isHovered }) => isHovered && css`${wave} 2s infinite`};
  animation-delay: ${({ delay }) => delay};
  animation-duration: 2s;
`;

const E1Container = styled(LetterContainer)`
  width: 6vw;
  margin-right: 0.2vw;
`;

const E2Container = styled(LetterContainer)`
  width: 6vw;
`;

const LContainer = styled(LetterContainer)`
  width: 4vw;
  margin-left: 1vw;
  margin-bottom: 4vh;
  margin-right: 0.3vw;
`;

const OContainer = styled(LetterContainer)`
  width: 6vw;
  margin-bottom: 5.4vh;
  margin-right: 0.3vw;
`;

const WContainer = styled(LetterContainer)`
  width: 8vw;
  margin-bottom: 4.3vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto; /* 높이를 자동으로 설정 */
`;

const Section = styled.div`
  width: 100%;
  height: 100vh; /* 각 섹션의 높이를 화면 높이로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4vh 4vw;
  height: 5vh;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 4vw;
  font-weight: bold;
  font-family: 'helvetica';
`;

const MenuButton = styled.div`
  font-size: 4vw;
  cursor: pointer;
  color: ${({ isOpen }) => (isOpen ? 'white' : 'black')};
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  
  height: 100vh;
  background-color: #3893FF;
  flex-direction: column;
  overflow-x: hidden;
  transition: 0.5s;
  display: flex;
  align-items: flex-end; /* 아이템을 우측 정렬 */
  justify-content: center;
  ${({ isOpen }) =>
    isOpen &&
    css`
      width: 20vw;
      
    `}
`;

const MenuItem = styled.a`
  
  padding: 8px 8px 8px 32px;
  margin: 1vh 2vw;
  text-decoration: none;
  font-size: 3vw;
  color: white;
  font-weight: bold;
  font-family: 'helvetica';
  display: block;

  transition: 0.3s;
  &:hover {
    color: #f1f1f1;
  }
`;

const Main = styled(Section)`
  height: 87vh;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Arrow = styled.img`
  width: 10vw; /* 화살표 이미지 크기를 조정하세요 */
  top: 15vh;
  position: relative;
  cursor: pointer;

  ${({ isHovered }) =>
    isHovered &&
    css`
      animation: ${bounce} 1s infinite;
    `}
`;

function TestPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef(null);

  const handleArrowClick = () => {
    if (mainRef.current) {
      window.scrollTo({
        top: mainRef.current.offsetTop + mainRef.current.offsetHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Container>
      <Header>
        <Logo>Feelow</Logo>
        <MenuButton onClick={toggleMenu} isOpen={isMenuOpen}>☰</MenuButton>
      </Header>

      <MenuContainer isOpen={isMenuOpen}>
        <MenuItem href="#">Login</MenuItem>
        <MenuItem href="#">About</MenuItem>
        <MenuItem href="#">Contact</MenuItem>
      </MenuContainer>

      <Main ref={mainRef}>
        <LogoContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <LetterContainer src={F} alt="F" isHovered={isHovered} delay="0s" />
          <E1Container src={E1} alt="E1" isHovered={isHovered} delay="0.2s" />
          <E2Container src={E2} alt="E2" isHovered={isHovered} delay="0.4s" />
          <LContainer src={L} alt="L" isHovered={isHovered} delay="0.6s" />
          <OContainer src={O} alt="O" isHovered={isHovered} delay="0.8s" />
          <WContainer src={W} alt="W" isHovered={isHovered} delay="1s" />
        </LogoContainer>

        <Arrow 
          src={arrowImage} 
          alt="Down Arrow"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={isHovered}
          onClick={handleArrowClick}
        />
      </Main>
    </Container>
  );
}

export default TestPage;