import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PauseImage from '../images/Pause.png';
import TimerOn from '../images/TimerOn.png';
import StartImage from '../images/Start.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #3893FF;
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
  background-color: #70BBFF;
  width: ${props => props.progress}%;
  transition: width 1s linear; /* Use linear transition for smoother animation */
`;

const Content = styled.div`
  padding: 20px;
  border-top: 5px solid #3893FF;
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
  margin-bottom: 20px;
`;

const Dot = styled.div`
  width: 4vh;
  height: 4vh;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${props => (props.completed ? '#3893FF' : '#FFFFFF')};
  border: 4px solid #3893FF;
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
  border: 5px solid #3893FF;
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
  background-color: #3893FF;
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
  background-color: #3893FF;
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


const App = ({ focusTime, breakTime }) => {
  const [time, setTime] = useState(focusTime);
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [progress, setProgress] = useState(0);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

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
      setProgress(100); // Ensure the progress bar is at 100%
      setTimeout(() => {
        if (isFocus) {
          setIsFocus(false);
          setTime(breakTime);
        } else {
          setIsFocus(true);
          setCycles(cycles + 1);
          setTime(focusTime);
        }
        setProgress(0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isFocus, cycles, focusTime, breakTime]);

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
            <Dot completed={cycles > 0} />
            <Dot completed={cycles > 1} />
            <Dot completed={cycles > 2} />
          </DotsContainer>
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
          <ResetButton onClick={resetTimer}>
            <ButtonImage2 src={TimerOn} alt="Reset" />
          </ResetButton>
        </Content>
      </Box>
    </Wrapper>
  );
};

App.defaultProps = {
  focusTime: 10, // 25 minutes for focus time
  breakTime: 3, // 5 minutes for break time
};

export default App;