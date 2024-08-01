import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigate import

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
  position: absolute;
  top: 3vw;
  left: 4vw;
  font-family: Helvetica, sans-serif;
  color: #53B7FF;
  font-weight: bold;
  font-size: 2vw;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TaskNameText = styled.div`
  font-family: Helvetica, sans-serif;
  color: black;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  margin: 1vw 0;
`;

const TaskNameText2 = styled.div`
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  background-color: #53B7FF;
  border-radius: 20px;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  margin: 1vw 0;
`;

const FocusRestContainer = styled.div`
  background-color: white;
  border-radius: 30px;
  padding: 2vw;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 2vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 80%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TimeTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
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
  width: 7vw;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeText2 = styled.div`
  font-family: Helvetica, sans-serif;
  color: black;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeText3 = styled.div`
  font-family: Helvetica, sans-serif;
  color: #53B7FF;
  background-color: #ECF8FF;
  border-radius: 20px;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  font-weight: bold;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
  width: 7vw;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
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
  position: absolute;
  bottom: -2vw;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3e94cc;
  }
`;

const CycleIconContainer = styled.div`
  position: absolute;
  right: 2vw;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CycleIcon = styled.div`
  font-size: 4vw;
  color: #53B7FF;
  position: relative;
`;

const CycleText = styled.div`
  font-size: 3vw;
  color: black;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EvaluatingPage = ({ selectedEmotion, taskDuration, selectedTask }) => {
  const [loading, setLoading] = useState(true);
  const [pomodoroCycle, setPomodoroCycle] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const calculatePomodoroCycle = () => {
      const emotionWeights = {
        '행복': 1.2,
        '기쁨': 1.1,
        '만족': 1.0,
        '감사': 1.1,
        '희망': 1.2,
        '자신감': 1.3,
        '흥미': 1.4,
        '열정': 1.5,
        '자부심': 1.2,
        '안심': 1.0,
        '안정': 1.0,
        '편안': 1.0,
        '고요': 0.9,
        '차분': 0.9,
        '여유': 0.8,
        '온화': 0.8,
        '따뜻함': 0.8,
        '수용': 0.7,
        '조화': 0.7,
        '균형': 0.6,
        '슬픔': 0.5,
        '절망': 0.4,
        '침울': 0.4,
        '낙담': 0.3,
        '눈물': 0.2,
        '후회': 0.2,
        '무기력': 0.1,
        '고독': 0.1,
        '상실': 0.1,
        '비관': 0.1,
        '걱정': 0.4,
        '초조': 0.3,
        '긴장': 0.3,
        '두려움': 0.2,
        '공포': 0.2,
        '당황': 0.2,
        '염려': 0.2,
        '불편': 0.1,
        '근심': 0.1,
        '불확실': 0.1,
        '화남': 0.4,
        '짜증': 0.3,
        '격노': 0.2,
        '불쾌': 0.2,
        '원망': 0.1,
        '성남': 0.1,
        '분개': 0.1,
        '분노2': 0.1,
        '울분': 0.1,
        '분통': 0.1,
      };

      const weight = emotionWeights[selectedEmotion] || 1.0;
      const focusTime = Math.min(Math.max(15, weight * 25), 50);
      const breakTime = 5 + (focusTime - 25) / 5;
      const cycles = Math.ceil(taskDuration / (focusTime * 60));

      setPomodoroCycle({ focusTime, breakTime, cycles });
      setLoading(false);
    };

    setTimeout(calculatePomodoroCycle, 2000);
  }, [selectedEmotion, taskDuration]);

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

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours} H : ` : ''}${mins > 0 ? `${mins} M` : ''}`;
  };

  const handleStartButtonClick = () => {
    console.log('Navigating to /timer with state:', { focusTime: pomodoroCycle.focusTime, breakTime: pomodoroCycle.breakTime });
    navigate('/timer', { state: { focusTime: pomodoroCycle.focusTime, breakTime: pomodoroCycle.breakTime } });
  };

  return (
    <MainContainer>
      <LogoText>Evaluating</LogoText>
      <ResultContainer>
        <TextContainer>
          <TaskNameText>Pattern for</TaskNameText> 
          <TaskNameText2>{selectedTask.task_name}</TaskNameText2>
          <TaskNameText>is...</TaskNameText>
        </TextContainer>
        <FocusRestContainer>
          <TimeTextContainer>
            <TimeText>Focus</TimeText> 
            <TimeText2>{formatTime(pomodoroCycle.focusTime)}</TimeText2>
          </TimeTextContainer>
          <TimeTextContainer>
            <TimeText3>Rest</TimeText3> 
            <TimeText2>{formatTime(pomodoroCycle.breakTime)}</TimeText2>
          </TimeTextContainer>
          <StartButton onClick={handleStartButtonClick}>START</StartButton>
          <CycleIconContainer>
            <CycleIcon>
              <FaClock />
              <CycleText>{pomodoroCycle.cycles}</CycleText>
            </CycleIcon>
          </CycleIconContainer>
        </FocusRestContainer>
      </ResultContainer>
    </MainContainer>
  );
};

export default EvaluatingPage;