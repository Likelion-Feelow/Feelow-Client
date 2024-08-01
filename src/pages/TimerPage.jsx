import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import PauseImage from '../images/Pause.png';
import TimerOn from '../images/TimerOn.png';
import StartImage from '../images/Start.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #88D4FE;
`;

const Box = styled.div`
  width: 60vw;
  height: 65vh;
  background-color: #FFFFFF;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 9fr;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #BDE7FF;
  width: ${props => props.progress}%;
  transition: width 1s linear;
`;

const Content = styled.div`
  padding: 20px;
  border-top: 5px solid #88D4FE;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 6vh;
  margin-left: 2vw
`;

const Dot = styled.div`
  width: 4vh;
  height: 4vh;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${props => (props.completed ? '#3893FF' : '#FFFFFF')};
  border: 4px solid #88D4FE;
  transition: background-color 0.5s;
`;

const TimerDisplay = styled.div`
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  font-size: 10vw;
  color: #000000;
  width: 25vw;
  height: 20vh;
  padding: 4vh 7vw;
  border: 5px solid #88D4FE;
  border-radius: 30px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  text-align: center;
  line-height: 1;
`;

const FocusText = styled.div`
  position: absolute;
  top: -4.3vh;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 2vw;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
  background-color: #88D4FE;
  border-radius: 40px;
  padding: 2vh 2vw;
`;

const TimerButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: -2.8vh;
  width: 100%;
  justify-content: center;
  gap: 4vw;
`;

const TimerButton = styled.button`
  width: 8vw;
  height: 5vh;
  font-size: 2vw;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
  background-color: #88D4FE;
  border: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResetButton = styled.button`
  width: 8vw;
  height: 5vh;
  font-size: 2vw;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
  background-color: white;  
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vh;
`;

const ButtonImage = styled.img`
  width: 2.5vh;
`;

const ButtonImage2 = styled.img`
  width: 6vh;
`;

const Colon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0.5vw;
`;

const DotElement = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  background-color: #000;
  border-radius: 50%;
  margin: 0.5vh 1vw;
`;

const TimeView = styled.div`
  display: flex;
`;

const TimerPage = () => {

  // 타이머 시간을 스킵하는 메서드
  const skipTime = (seconds) => {
    setTime(prevTime => Math.max(prevTime - seconds, 0));
  };

  // window 객체에 skipTime 메서드 추가
  useEffect(() => {
    window.skipTime = skipTime;
    return () => {
      delete window.skipTime;
    };
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const { focusTime, breakTime, cycles, selectedEmotion, selectedTask } = location.state; // selectedTask 추가

  const [time, setTime] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [progress, setProgress] = useState(0);

  const pauseTimer = () => {
    setIsActive(false);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFocus(true);
    setTime(focusTime * 60);
    setProgress(0);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          const newProgress = ((isFocus ? focusTime * 60 - newTime : breakTime * 60 - newTime) / (isFocus ? focusTime * 60 : breakTime * 60)) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        if (isFocus) {
          setIsFocus(false);
          setTime(breakTime * 60);
        } else {
          setIsFocus(true);
          setCurrentCycle(currentCycle + 1);
          if (currentCycle < cycles - 1) {
            setTime(focusTime * 60);
          } else {
            // 모든 사이클이 끝난 경우
            handleComplete();
            return; // 타이머를 중지하고 피드백 페이지로 이동
          }
        }
        setProgress(0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isFocus, currentCycle, focusTime, breakTime]);

  const handleComplete = () => {
    setIsActive(false); // 타이머를 중지합니다.
    navigate('/feedback', {
      state: {
        emotion: selectedEmotion,
        task: selectedTask.task_name, // selectedTask의 task_name을 넘깁니다.
      },
    });
  };

  useEffect(() => {
    if (time === 0 && !isActive) {
      handleComplete();
    }
  }, [time, isActive]);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const remainingSeconds = String(seconds % 60).padStart(2, '0');
    return (
      <TimeView>
        {minutes}
        <Colon>
          <DotElement />
          <DotElement />
        </Colon>
        {remainingSeconds}
      </TimeView>
    );
  };

  return (
    <Wrapper>
      <Box>
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>
        <Content>
          <DotsContainer>
            {Array.from({ length: cycles }).map((_, index) => (
              <Dot key={index} completed={currentCycle > index} />
            ))}
          </DotsContainer>
          <TimerDisplay>
            {formatTime(time)}
            <FocusText>{isFocus ? 'Focus' : 'Break'}</FocusText>
            <TimerButtonContainer>
              <TimerButton onClick={pauseTimer}>
                <ButtonImage src={PauseImage} alt="Pause" />
              </TimerButton>
              <TimerButton onClick={startTimer}>
                <ButtonImage src={StartImage} alt="Start" />
              </TimerButton>
            </TimerButtonContainer>
          </TimerDisplay>
          <ResetButton onClick={resetTimer}>
            <ButtonImage2 src={TimerOn} alt="Reset" />
          </ResetButton>
        </Content>
      </Box>
    </Wrapper>
  );
};

TimerPage.defaultProps = {
  focusTime: 10,
  breakTime: 3,
};

export default TimerPage;