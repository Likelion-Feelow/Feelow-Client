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
  height: 40vw;
  background-color: #FFFFFF;
  border-radius: 20px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'progress'
    'dots'
    'content';
`;

const ProgressBarContainer = styled.div`
  grid-area: progress;
  width: 100%;
  height: 3vw;
  background-color: #FFFFFF;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  position: relative;
  border-bottom: 5px solid #88D4FE;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #BDE7FF;
  width: ${props => props.progress}%;
  transition: width 1s linear;
  position: relative;
`;

const DotsContainer = styled.div`
  grid-area: dots;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align to the left */
  width: 100%;
  margin-left: 1.5vw;
  margin-top: 1.5vw;
`;

const Dot = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${props => (props.completed ? '#BDE7FF' : '#FFFFFF')};
  border: 0.3vw solid #88D4FE;
  transition: background-color 0.5s;
`;

const Content = styled.div`
  grid-area: content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TimerDisplay = styled.div`
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  font-size: 10vw;
  color: #000000;
  width: 40vw;
  height: 20vw;
  border: 5px solid #88D4FE;
  border-radius: 30px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative; /* Add relative positioning */
  text-align: center;
  line-height: 1;
  flex-direction: column; /* Ensure the elements inside are stacked vertically */
`;

const FocusText = styled.div`
  position: absolute;
  top: -2.3vw;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 2vw;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
  background-color: #88D4FE;
  border-radius: 40px;
  padding: 1vw 2vw;
`;

const TimerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4vw;
  position: absolute;
  bottom: -1.7vw; /* Position above the border */
  left: 50%;
  transform: translateX(-50%);
`;

const TimerButton = styled.button`
  width: 10vw;
  height: 3vw;
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

const ResetButtonContainer = styled.div`
  margin-top: 1.5vw; /* Add margin to position below the timer buttons */
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ResetButton = styled.button`
  font-size: 2vw;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.img`
  width: 1.5vw;
`;

const ButtonImage2 = styled.img`
  width: 2.3vw;
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
  const skipTime = (seconds) => {
    setTime(prevTime => Math.max(prevTime - seconds, 0));
  };

  useEffect(() => {
    window.skipTime = skipTime;
    return () => {
      delete window.skipTime;
    };
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const { focusTime, breakTime, cycles, selectedEmotion, selectedTask } = location.state;

  const [time, setTime] = useState(focusTime);
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
    setTime(focusTime);
    setProgress(0);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          const newProgress = ((isFocus ? focusTime - newTime : breakTime - newTime) / (isFocus ? focusTime : breakTime)) * 100;
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
          setTime(breakTime);
        } else {
          setIsFocus(true);
          setCurrentCycle(currentCycle + 1);
          if (currentCycle < cycles - 1) {
            setTime(focusTime);
          } else {
            handleComplete();
            return;
          }
        }
        setProgress(0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isFocus, currentCycle, focusTime, breakTime]);

  const handleComplete = () => {
    setIsActive(false);
    navigate('/feedback', {
      state: {
        emotion: selectedEmotion,
        task: selectedTask.task_name,
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

        <DotsContainer>
          {Array.from({ length: cycles }).map((_, index) => (
            <Dot key={index} completed={currentCycle > index} />
          ))}
        </DotsContainer>

        <Content>
          <TimerDisplay>
            {formatTime(time)}
            <FocusText>{isFocus ? 'Focus' : 'Break'}</FocusText>
            <TimerButtonContainer>
              <TimerButton onClick={pauseTimer}>
                <ButtonImage src={StartImage} alt="Pause" />
              </TimerButton>
              <TimerButton onClick={startTimer}>
                <ButtonImage src={PauseImage} alt="Start" />
              </TimerButton>
            </TimerButtonContainer>
          </TimerDisplay>
          <ResetButtonContainer>
            <ResetButton onClick={resetTimer}>
            <ButtonImage2 src={TimerOn} alt="Reset" />
            </ResetButton>
          </ResetButtonContainer>
        </Content>
      </Box>
    </Wrapper>
  );
};

export default TimerPage;