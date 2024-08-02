import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 스타일 컴포넌트 정의
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65vw;
  height: 75vh;
  background-color: #ECF8FF;
  border-radius: 15px;
  padding: 1vw;
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
  grid-area: logo;
  font-family: Helvetica, sans-serif;
  color: #53B7FF;
  font-weight: bold;
  font-size: 2vw;
  margin-bottom: 3vw;
`;

const EmptyDiv = styled.div`
  grid-area: ${props => props.gridArea};
`;

const ResultContainer = styled.div`
  display: grid;
  grid-template-areas:
    "logo empty2 empty3 empty4"
    "empty5 focusTitle focusTime iconArea"
    "empty6 restTitle restTime iconArea"
    "reason reason reason reason";
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 1vw;
  width: 90%;
  height: 65%;
  background-color: white;
  border-radius: 30px;
  padding: 2vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 2vw;
`;

const TaskNameText = styled.div`
  font-family: Helvetica, sans-serif;
  color: black;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  margin: 1vw 0;
`;

const TimeText = styled.div`
  font-family: Helvetica, sans-serif;
  color: white;
  background-color: #53B7FF;
  border-radius: 20px;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  font-weight: bold;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TimeText2 = styled.div`
  font-family: Helvetica, sans-serif;
  color: black;
  padding: 0.5vw 1vw;
  font-size: 3vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.5vw;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  padding: 1vw 2vw;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3e94cc;
  }
  grid-area: startButton;
  margin-top: 2vw;
`;

const CycleIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 2vw;
  margin-top: 2.5vh;
`;

const CycleIcon = styled.div`
  font-size: 8vw;
  color: #53B7FF;
  position: relative;
`;

const CycleText = styled.div`
  font-size: 5vw;
  color: black;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorMessage = styled.div`
  margin-top: 2vw;
  font-family: Helvetica, sans-serif;
  color: red;
  font-size: 2vw;
`;

const ReasonContainer = styled.div`
  grid-area: reason;
  text-align: center;
  margin: 0 4vw;
`;

const Evaluating = ({ selectedEmotion, taskDuration, selectedTask }) => {
  const [loading, setLoading] = useState(true);
  const [pomodoroCycle, setPomodoroCycle] = useState(null);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const fetchPomodoroCycle = async () => {
    const requestPayload = {
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that provides optimal Pomodoro timer patterns.',
        },
        {
          role: 'user',
          content: `사용자의 현재 감정이 ${selectedEmotion}이고 작업 시간이 ${taskDuration} 초인 경우, 
          생산성과 정신 건강을 극대화하기 위해 최적의 포모도로 타이머 패턴을 결정하십시오. 
          오로지 사용자만을 위한 맞춤 포모도로 타이머로, 가장 일반적인 5분 단위의 시간은 되도록이면 피하십시오.
          초 단위로 집중 시간, 휴식 시간 및 사이클 수를 숫자로 제공한 다음, 이 권장 사항에 대한 간단한 과학적이고, 심리학적 이유를 한 문장으로 설명하십시오. 
          결과를 한국어로 제공하십시오.
          답변은 "(집중 시간), (휴식 시간), (사이클 수), (이유)"의 정확히 똑같은 형식으로 다른 추가적인 글자 없이 제공하십시오.`,
        },
      ],
      max_tokens: 1000,
    };

    console.log('API Request Payload:', requestPayload);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      console.log('API Response:', response.data);

      const result = response.data.choices[0].message.content.trim();
      console.log('Parsed Result:', result);

      const [focusTime, breakTime, cycles, ...reasonParts] = result.split(',');
      const reasonText = reasonParts.join(',').trim().replace(/"/g, '');

      if (isNaN(parseFloat(focusTime)) || isNaN(parseFloat(breakTime)) || isNaN(parseFloat(cycles))) {
        throw new Error('Received invalid numbers from the API');
      }

      setPomodoroCycle({
        focusTime: parseFloat(focusTime.trim()),
        breakTime: parseFloat(breakTime.trim()),
        cycles: parseFloat(cycles.trim()),
      });
      setReason(reasonText);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pomodoro cycle:', error);
      setError('Failed to fetch the Pomodoro cycle. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPomodoroCycle(); // 컴포넌트가 마운트될 때 한 번만 호출
  }, []); // 빈 배열을 전달하여 의존성 배열로 설정

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchPomodoroCycle(); // 다시 시도 시 바로 fetch 호출
  };

  if (loading) {
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
  }

  if (error) {
    return (
      <MainContainer>
        <LogoText>Evaluating</LogoText>
        <CenterContainer>
        <ErrorMessage>{error}</ErrorMessage>
          <StartButton onClick={retryFetch}>Retry</StartButton>
        </CenterContainer>
      </MainContainer>
    );
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours} H ` : ''}${minutes > 0 ? `${minutes} M` : ''}`;
  };

  const handleStartButtonClick = () => {
    navigate('/timer', {
      state: {
        focusTime: pomodoroCycle.focusTime,
        breakTime: pomodoroCycle.breakTime,
        cycles: pomodoroCycle.cycles,
        selectedTask: selectedTask,
        selectedEmotion: selectedEmotion,
      },
    });
  };

  return (
    <MainContainer>
      <ResultContainer>
        <LogoText>Evaluating</LogoText>
        <EmptyDiv gridArea="empty2" />
        <EmptyDiv gridArea="empty3" />
        <EmptyDiv gridArea="empty4" />
        <EmptyDiv gridArea="empty5" />
        <EmptyDiv gridArea="empty6" />
        <TimeText style={{ gridArea: 'focusTitle' }}>Focus Time</TimeText>
        <TimeText2 style={{ gridArea: 'focusTime' }}>{formatTime(pomodoroCycle.focusTime)}</TimeText2>
        <TimeText style={{ gridArea: 'restTitle' }}>Rest Time</TimeText>
        <TimeText2 style={{ gridArea: 'restTime' }}>{formatTime(pomodoroCycle.breakTime)}</TimeText2>
        <CycleIconContainer style={{ gridArea: 'iconArea' }}>
          <CycleIcon>
            <FaClock />
            <CycleText>{pomodoroCycle.cycles}</CycleText>
          </CycleIcon>
        </CycleIconContainer>
        <ReasonContainer>
          <TaskNameText>{reason}</TaskNameText>
        </ReasonContainer>
      </ResultContainer>
      <StartButton onClick={handleStartButtonClick}>START</StartButton>
    </MainContainer>
  );
};

export default Evaluating;