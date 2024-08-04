import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

import arrowImage from "../images/Point.png"; // 화살표 이미지 경로를 지정하세요.
import TimerImage from "../images/Timer.png"; // 예제 이미지 경로를 지정하세요.
import ListImage from "../images/List.png"; // 또 다른 예제 이미지 경로를 지정하세요.
import BlueLogo from "../images/BlueLogo.png"; // 마지막 예제 이미지 경로를 지정하세요.

import F from "../images/F.png";
import E1 from "../images/E1.png";
import E2 from "../images/E2.png";
import L from "../images/L.png";
import O from "../images/O.png";
import W from "../images/W.png";
import { useNavigate } from "react-router-dom";







const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10vw);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(10vw);
  }
`;

const slideDown2 = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(10vw);
  }
`;

const slideLeft = keyframes`
  from {
    transform: translateY(10vw);
  }
  to {
    transform: translate(-14vw, 10vw);
  }
`;

const slideRight = keyframes`
  from {
    transform: translateY(10vw);
  }
  to {
    transform: translate(14vw, 10vw);
  }
`;

const WhiteBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  position: relative;
  cursor: pointer;
`;

const WhiteBackgroundText = styled.div`
  position: absolute;
  opacity: 0;
  animation-fill-mode: forwards;

  font-size: 6vw;
  font-weight: bold;
  font-family: "helvetica";
`;

const FeelowText = styled(WhiteBackgroundText)`
  animation: ${({ isVisible }) => isVisible && css`${fadeIn} 1s forwards, ${slideUp} 1s forwards 1s`};
`;

const FeelText = styled(WhiteBackgroundText)`
  animation: ${({ isVisible }) => isVisible && css`${fadeIn} 1s forwards 2s, ${slideDown} 1s forwards 3s, ${slideLeft} 1s forwards 4s`};
`;

const FlowText = styled(WhiteBackgroundText)`
  animation: ${({ isVisible }) => isVisible && css`${fadeIn} 1s forwards 5s, ${slideDown} 1s forwards 6s, ${slideRight} 1s forwards 7s`};
`;

const PlusText = styled(WhiteBackgroundText)`
  animation: ${({ isVisible }) => isVisible && css`${fadeIn} 1s forwards 8s, ${slideDown2} 1s forwards 9s`};
`;

const EqualText = styled(WhiteBackgroundText)`
  animation: ${({ isVisible }) => isVisible && css`${fadeIn} 1s forwards 10s`};
`;






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
  animation: ${({ isHovered }) =>
    isHovered &&
    css`
      ${wave} 2s infinite
    `};
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
  font-size: 2.5vw;
  font-weight: bold;
  font-family: "helvetica";
`;

const MenuButton = styled.div`
  font-size: 2.5vw;
  cursor: pointer;
  color: ${({ isOpen }) => (isOpen ? "white" : "black")};
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 100vh;
  background-color: #3893ff;
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

const MenuItemWrapper = styled.div`
  display: flex;
  transition: opacity 0.6s ease;
  opacity: ${({ isHovered }) => (isHovered ? 0.4 : 1)};
`;

const MenuItem = styled.a`
  padding: 8px 8px 8px 32px;
  margin: 1vh 2vw;
  text-decoration: none;
  font-size: 3vw;
  color: white;
  font-weight: bold;
  font-family: "helvetica";
  display: block;
  transition: opacity 0.6s ease, color 0.3s;
  

  &:hover {
    color: #f1f1f1;
    cursor: pointer;
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

const BlueBackground = styled(Section)`
  background-color: #3893ff;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isHovered }) =>
    isHovered &&
    css`
      animation: ${bounce} 1s infinite;
    `}
`;

const BlueBackgroundText = styled.div`
  font-size: 7vw;
  font-weight: bold;
  font-family: "helvetica";
  color: white;
`;

// const WhiteBackground = styled(Section)`
//  background-color: white;
// `;

// const WhiteBackgroundText = styled.div`
//   font-size: 6vw;
//   margin: 2vh 0;
//   font-weight: bold;
//   font-family: "helvetica";
//   color: black;
//   text-align: center;
// `; 

const SecondWhiteBackground = styled(Section)`
  background-color: white;
`;

const SecondWhiteBackgroundText = styled.div`
  font-size: 3.5vw;
  font-weight: bold;
  font-family: "helvetica";
  color: black;
  text-align: center;
  white-space: pre-line;
  margin: 2vh 0;
`;

const ThirdWhiteBackground = styled(Section)`
  background-color: white;
`;

const ThirdBackgroundImage = styled.img`
  width: 20vw; /* 이미지 크기를 조정하세요 */
  margin-bottom: 7vh;
`;

const ThirdBackgroundText = styled.div`
  font-size: 3vw;
  font-weight: bold;
  font-family: "helvetica";
  color: black;
  text-align: center;
  margin: 2vh 0;
`;

const FourthWhiteBackground = styled(Section)`
  background-color: white;
`;

const FourthBackgroundImage = styled.img`
  width: 17vw; /* 이미지 크기를 조정하세요 */
  margin-bottom: 8vh;
`;

const FourthBackgroundText = styled.div`
  font-size: 3vw;
  margin: 2vh 0;
  font-weight: bold;
  font-family: "helvetica";
  color: black;
  text-align: center;
`;

const FinalBackground = styled(Section)`
  background-color: #3893ff;
`;

const FinalBackgroundImage = styled.img`
  width: 30vw; /* 이미지 크기를 조정하세요 */
  margin-bottom: 20px;
`;

const wave2 = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-10px);
  }
`;

const FinalBackgroundText = styled.div`
  font-size: 4vw;
  font-weight: bold;
  font-family: 'helvetica';
  color: white;
  text-align: center;
  margin: 3vh 0;

  display: inline-block;

  span {
    display: inline-block;
    animation: ${wave2} 3s infinite;
    animation-delay: calc(0.1s * var(--index));
  }
`;

const FinalBackgroundButton = styled.button`
  padding: 1vh 2vw;
  font-size: 2vw;
  font-weight: bold;
  font-family: "helvetica";
  color: #3893ff;
  margin: 2vh 0;

  background-color: white;
  border: none;
  border-radius: 20px;

  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const FinalBackgroundButton2 = styled.button`
  background: none;
  border: none;
  color: #fff;
  text-decoration: underline;
  padding: 0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 40px;  // 로그인 버튼과 간격 추가

  &:hover {
    color: #f1f1f1;
  }
`;

function OnBoardingPage() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const mainRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  




  const handleMenuItemClick = (item) => {
    if (item === 'About') {
      navigate('/about');
    }
    
    if (item === "Login") {
      navigate('/login');
    } else {
      // Handle other menu items if needed
      console.log(`Clicked on ${item}`);
    }
  };



  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 섹션에 도착했을 때 애니메이션 시작
          observer.disconnect(); // 관찰자 연결 해제
        }
      },
      {
        threshold: 0.5, // 섹션이 화면에 50% 보일 때 트리거
      }
    );

    const section = sectionRefs.current[2]; // 3번째 섹션을 관찰
    if (section) {
      observer.observe(section); // 섹션을 관찰
    }

    return () => {
      if (section) {
        observer.unobserve(section); // 컴포넌트 언마운트 시 관찰 해제
      }
    };
  }, []);






  useEffect(() => {
    // 애니메이션이 페이지 로드 시 실행되도록 하기 위해서 빈 useEffect를 사용합니다.
  }, []);

  const handleArrowClick = () => {
    if (mainRef.current) {
      window.scrollTo({
        top: mainRef.current.offsetTop + mainRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSectionClick = (index) => {
    const nextSection = sectionRefs.current[index + 1];
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
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

  const text = "Flow에 따라 당신의 일상을 채워보세요!";

  return (
    <Container>
      <Header>
        <Logo>Feelow</Logo>
        <MenuButton onClick={toggleMenu} isOpen={isMenuOpen}>
          ☰
        </MenuButton>
      </Header>

      <MenuContainer isOpen={isMenuOpen}>
        {["Login", "About"].map((item, index) => (
          <MenuItemWrapper
            key={item}
            isHovered={hoveredIndex !== null && hoveredIndex !== index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
          
          <MenuItem onClick={() => handleMenuItemClick(item)}>{item}</MenuItem>
          </MenuItemWrapper>
        ))}
      </MenuContainer>

      <Main ref={mainRef}>
        <LogoContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <LetterContainer src={F} alt="F" isHovered={isHovered} delay="0s" />
          <E1Container src={E1} alt="E1" isHovered={isHovered} delay="0.2s" />
          <E2Container src={E2} alt="E2" isHovered={isHovered} delay="0.4s" />
          <LContainer src={L} alt="L" isHovered={isHovered} delay="0.6s" />
          <OContainer src={O} alt="O" isHovered={isHovered} delay="0.8s" />
          <WContainer src={W} alt="W" isHovered={isHovered} delay="1s" />
        </LogoContainer>

        {/* <LogoImage src={logoImage} alt="Feelow Logo" /> */}
        <Arrow
          src={arrowImage}
          alt="Down Arrow"
          onClick={handleArrowClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={isHovered}
        />
      </Main>

      <BlueBackground
        ref={(el) => (sectionRefs.current[1] = el)}
        onClick={() => handleSectionClick(1)}
        isHovered={isHovered}
      >
        <BlueBackgroundText>What is Feelow?</BlueBackgroundText>
      </BlueBackground>

      <WhiteBackground
        ref={(el) => (sectionRefs.current[2] = el)}
        onClick={() => handleSectionClick(2)}
      >
        <FeelowText isVisible={isVisible}>Feelow</FeelowText>
        <FeelText isVisible={isVisible}>Feel</FeelText>
        <FlowText isVisible={isVisible}>Flow</FlowText>
        <PlusText isVisible={isVisible}>+</PlusText>
        <EqualText isVisible={isVisible}>=</EqualText>
      </WhiteBackground>

      <SecondWhiteBackground
        ref={(el) => (sectionRefs.current[3] = el)}
        onClick={() => handleSectionClick(3)}
      >
        <SecondWhiteBackgroundText>Feelow는</SecondWhiteBackgroundText>
        <SecondWhiteBackgroundText>
          사용자의 감정을 컨트롤하고
        </SecondWhiteBackgroundText>
        <SecondWhiteBackgroundText>
          해야 하는 일들을 효율적으로 완수할 수 있도록 하는
        </SecondWhiteBackgroundText>
        <SecondWhiteBackgroundText>
          감정 타이머입니다.
        </SecondWhiteBackgroundText>
      </SecondWhiteBackground>

      <ThirdWhiteBackground
        ref={(el) => (sectionRefs.current[4] = el)}
        onClick={() => handleSectionClick(4)}
      >
        <ThirdBackgroundImage src={TimerImage} alt="Example Image" />
        <ThirdBackgroundText>
          내 마음대로 조절하기 힘든 감정,
        </ThirdBackgroundText>
        <ThirdBackgroundText>Feelow의 Flow에 따라</ThirdBackgroundText>
        <ThirdBackgroundText>관리해요!</ThirdBackgroundText>
      </ThirdWhiteBackground>

      <FourthWhiteBackground
        ref={(el) => (sectionRefs.current[5] = el)}
        onClick={() => handleSectionClick(5)}
      >
        <FourthBackgroundImage src={ListImage} alt="Another Example Image" />
        <FourthBackgroundText>미루기만 하는 할 일들,</FourthBackgroundText>
        <FourthBackgroundText>Feelow의 Flow에 따라</FourthBackgroundText>
        <FourthBackgroundText>완수해요!</FourthBackgroundText>
      </FourthWhiteBackground>

      <FinalBackground
        ref={(el) => (sectionRefs.current[6] = el)}
        onClick={() => handleSectionClick(6)}
      >
        <FinalBackgroundImage src={BlueLogo} alt="Final Image" />
        <FinalBackgroundText>
          {text.split("").map((char, index) => (
            <span key={index} style={{ "--index": index }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </FinalBackgroundText>
        <FinalBackgroundButton onClick={() => navigate("/login")}>
          로그인
        </FinalBackgroundButton>
        <FinalBackgroundButton2 onClick={() => navigate("/main")}>둘러보기</FinalBackgroundButton2>
      </FinalBackground>
    </Container>
  );
}

export default OnBoardingPage;
