import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #53B7FF;
  flex-direction: column;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;

const Box = styled.div`
  width: 60vw;
  height: 10vw;
  background-color: #FFFFFF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative; /* 자식 박스를 절대 위치시키기 위해 */
  border-top: 5px solid #53B7FF; /* 상단 테두리 추가 */
  margin-bottom: 2vw; /* 하단 여백 추가 */
  margin-top: 4vw;
`;

const TopBox = styled.div`
  width: 70%; /* 너비 조정 가능 */
  height: 13vh; /* 높이 조정 가능 */
  background-color: #FFFFFF;
  border: 3px solid #53B7FF; /* 테두리 색상 */
  border-radius: 10px;
  position: absolute; /* 절대 위치로 상단 중앙에 배치 */
  top: -65px; /* 박스의 위치 조정: 상단 테두리 위로 */
  left: 50%; /* 중앙 정렬 */
  transform: translateX(-50%); /* 중앙 정렬 보정 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const BottomBox = styled.div`
  width: 60vw; /* Box와 같은 너비 설정 */
  height: 70px; /* 높이 조정 가능 */
  background-color: #FFFFFF;
  border: 2px solid #53B7FF; /* 테두리 색상 */
  border-radius: 10px;
  margin-top: 20px; /* 상단 박스와의 간격 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const EmotionTextRight = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-size: 2.5vw;
    color: white;
    font-weight: bold;
    background-color: #53B7FF;
    border-radius: 50%;
    padding: 0.5vw 1vw;
    margin-right: -0.5vw;
    margin-left: 0.5vw;
`;

const EmotionTextLeft = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-size: 2.5vw;
    color: white;
    font-weight: bold;
    background-color: #53B7FF;
    border-radius: 50%;
    padding: 0.5vw 1vw;
    margin-left: -0.5vw;
    margin-right: 0.5vw;
`;

const NormalText = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-size: 2vw;
    color: #53B7FF;
    font-weight: bold;
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
    font-size: 1.5vw;
    color: #53B7FF;
    font-weight: bold;
`;

const Text2 = styled.div`
    color: white;
    font-family: 'Helvetica', sans-serif;
    font-size: 2vw;
    font-weight: bold;
    background-color: #53B7FF;
    border-radius: 90px;
    padding: 2vw 1.5vw;
    margin: 0 1vw;
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

const GPTPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { emotion, task } = location.state;
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [buttonVisible, setButtonVisible] = useState(false); // 버튼 가시성 상태 추가

  useEffect(() => {
    let isMounted = true; // 이 플래그를 사용하여 컴포넌트가 마운트된 상태인지 확인합니다.

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
          setLoading(false); // 요청이 끝난 후 로딩 상태를 false로 설정
        }
      }
    };

    fetchFeedback();

    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 플래그를 false로 설정합니다.
    };
  }, [emotion, task]);

  // 3초 후 버튼을 보이게 하는 useEffect 추가
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setButtonVisible(true);
      }, 3000); // 3초 후에 버튼을 보이도록 설정

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [loading]);

  const handleNextPage = () => {
    navigate('/main'); // 다음 페이지로 이동하는 로직 추가
  };

  return (
    <Wrapper>
      <Box>
        <TopBox>
          <EmotionTextRight>{emotion[0]}</EmotionTextRight>
          <EmotionTextLeft>{emotion[1]}</EmotionTextLeft>
          <NormalText>의 감정을 안고 할 일을 완수했군요!</NormalText>
        </TopBox>
        <NormalText2>{loading ? '피드백을 가져오는 중...' : feedback}</NormalText2>
      </Box>
      <BottomBox>
        <Text1>방금 수행한</Text1>
        <Text2>{task}</Text2>
        <Text1>가 끝난 후인 지금, 현재 감정을 선택해주세요!</Text1>
      </BottomBox>
      <NextButton isVisible={buttonVisible} onClick={handleNextPage}>
        다음 페이지로 이동
      </NextButton>
    </Wrapper>
  );
};

export default GPTPage;