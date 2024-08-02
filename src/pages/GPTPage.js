import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmotionSelection from '../components/Emotion/EndEmotionSelection'; // Adjust the import path as needed
import LoadingPage from '../pages/LoadingPage'; // Adjust the import path as needed

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw; /* Ensure it takes full width */
  background-color: #53B7FF;
  flex-direction: column;
  position: relative; /* Positioning relative to align the sliding components */
  overflow: hidden; /* Hide overflowing content */
`;

const Box = styled.div`
  width: 61vw;
  height: 40vh; /* Adjusted to a fixed height */
  background-color: #FFFFFF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 4vw; /* Adjusted padding */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  border-top: 5px solid #53B7FF;
  margin-bottom: 2vw;
`;

const TopBox = styled.div`
  width: 50vw;
  height: 13vh;
  background-color: #FFFFFF;
  border: 3px solid #53B7FF;
  border-radius: 20px;
  position: absolute;
  top: -65px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const BottomBox = styled.div`
  width: 65vw; /* Full width within Box */
  height: auto; /* Adjust height to content */
  background-color: #FFFFFF;
  border: 2px solid #53B7FF;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 2vw; /* Added padding for spacing */
`;

const EmotionText = styled.div`
  font-family: 'Helvetica', sans-serif;
  font-size: 2.5vw;
  color: white;
  font-weight: bold;
  background-color: #53B7FF;
  border-radius: 40px;
  padding: 0.5vw 2vw;
  margin: 0 0.5vw;
`;

const NormalText = styled.div`
  font-family: 'Helvetica', sans-serif;
  font-size: 2vw;
  color: #53B7FF;
  font-weight: bold;
  text-align: center;
`;

const NormalText2 = styled.div`
  font-family: 'Helvetica', sans-serif;
  font-size: 2vw;
  color: black;
  text-align: center;
  line-height: 2;
`;

const Text1 = styled.div`
  font-family: 'Helvetica', sans-serif;
  font-size: 1.8vw;
  color: #53B7FF;
  font-weight: bold;
  text-align: center;
`;

const Text2 = styled.div`
  color: white;
  font-family: 'Helvetica', sans-serif;
  font-size: 2vw;
  font-weight: bold;
  background-color: #53B7FF;
  border-radius: 90px;
  padding: 1vw 1vw;
  margin-right: 0.5vw;
  margin-left: 1vw;
  text-align: center;
`;

const NextButton = styled.button`
  margin-top: 3.5vw;
  font-size: 1.5vw;
  border: none;
  border-radius: 10px;
  background-color: #53B7FF;
  color: white;
  cursor: pointer;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const PrevNextButtonContainer = styled.div`
  position: absolute;
  bottom: -4.5vw;
  display: flex;
  gap: 2vw;
`;

const PrevNextButton = styled.button`
  font-size: 1.5vw;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  padding: 0.5vw 2vw;
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SlideWrapper = styled.div`
  width: 100%;
  position: absolute; /* Positioned absolutely within Wrapper */
  top: ${({ slide }) => (slide ? '-100%' : '50%')};
  left: 50%;
  transform: translate(-50%, -50%);
  transition: top 0.5s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmotionSelectionWrapper = styled.div`
  width: 100%;
  position: absolute; /* Positioned absolutely within Wrapper */
  top: ${({ slide }) => (slide ? '50%' : '100%')};
  left: 50%;
  transform: translate(-50%, -50%);
  transition: top 0.5s ease;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const GPTPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { emotion, task } = location.state;
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [slide, setSlide] = useState(false); // State for sliding effect

  useEffect(() => {
    let isMounted = true;

    const fetchFeedback = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4-turbo',
            messages: [
              {
                role: 'user',
                content: `감정 "${emotion}"과 할 일 "${task}"에 대한 피드백을 주세요. 할 일은 이미 끝난 상태이고, 구체적인 상황에 대한 설명은 필요 없고 제공된 감정과 일에 대해서만 정확히 한 문장으로 피드백 해주세요.`,
              },
            ],
            max_tokens: 1000,
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (isMounted) {
          setFeedback(response.data.choices[0].message.content);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFeedback();

    return () => {
      isMounted = false;
    };
  }, [emotion, task]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setButtonVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleNextPage = () => {
    setSlide(true); // Trigger slide up animation
  };

  const handlePreviousPage = () => {
    setSlide(false); // Trigger slide down animation
  };

  return (
    <Wrapper>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <SlideWrapper slide={slide}>
            <Box>
              <TopBox>
                <EmotionText>{emotion}</EmotionText>
                <NormalText>의 감정을 안고 할 일을 완수했군요!</NormalText>
              </TopBox>
              <NormalText2>{feedback}</NormalText2>
            </Box>
            <BottomBox>
              <Text1>방금 수행한</Text1>
              <Text2>{task}</Text2>
              <Text1>가 끝난 후인 지금, 현재 감정을 선택해주세요!</Text1>
            </BottomBox>
            <NextButton isVisible={buttonVisible} onClick={handleNextPage}>
              다음으로
            </NextButton>
          </SlideWrapper>

          <EmotionSelectionWrapper slide={slide}>
            {slide && (
              <>
                <EmotionSelection onEmotionSelect={() => navigate('/main')} />
                <PrevNextButtonContainer>
                  <PrevNextButton onClick={handlePreviousPage}>이전으로</PrevNextButton>
                </PrevNextButtonContainer>
            </>
          )}
        </EmotionSelectionWrapper>
      </>
    )}
  </Wrapper>
  );
};

export default GPTPage;