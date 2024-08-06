import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TimerIMG from "../../images/Timer3.png";

// 스타일 컴포넌트 정의
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65vw;
  height: 75vh;
  max-height: 40vw;
  background-color: #A8E0FF;
  border-radius: 30px;
  padding: 1vw;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 부모 컴포넌트를 벗어나지 않도록 설정 */
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
  margin-bottom: 4vw;
  margin-top: 7vw;
`;

const Dot = styled.div`
  width: 2vw;
  height: 2vw;
  margin: 0 4vw;
  background-color: #53b7ff;
  border-radius: 50%;
  animation: ${wave} 1.5s infinite;
  animation-delay: ${(props) => props.delay};
`;

const LoadingText = styled.div`
  margin-top: 1.5vw;
  font-family: Helvetica, sans-serif;
  color: white;
  font-weight: bold;
  font-size: 2vw;
`;

const LogoText = styled.div`
  position: absolute;
  font-family: Helvetica, sans-serif;
  color: white;
  font-weight: bold;
  font-size: 2vw;
  top: 2vw;
  left: 3.5vw;
`;

const LogoText2 = styled.div`
  top: 3vw;
  position: absolute;
  left: 3vw;
  font-family: Helvetica, sans-serif;
  color: white;
  font-weight: bold;
  font-size: 2vw;
`;

const EmptyDiv = styled.div`
  grid-area: ${(props) => props.gridArea};
`;

const ResultContainer = styled.div`
  display: grid;
  grid-template-areas:
    "focusTitle focusTime iconArea"
    "restTitle restTime iconArea"
    "reason reason reason";
  grid-template-rows: 1fr 1fr 2fr;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-items: center;
  gap: 1vw;
  width: 75%;
  height: 55%;
  background-color: white;
  border-radius: 30px;
  padding: 3vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 3.5vw;
  overflow: auto; /* 높이가 줄어들면 스크롤 가능 */
`;

const TaskNameText = styled.div`
  font-family: helvetica;
  color: black;
  padding: 0.5vw 1vw;
  font-size: 1vw;
  margin: 1vw 0;
  font-weight: bold;
  line-height: 1.7;
  white-space: pre-wrap; /* This will preserve the whitespace and line breaks in the text */
  word-wrap: break-word; /* This ensures that long words will break and wrap to the next line */
`;

const TimeText = styled.div`
  font-family: Helvetica, sans-serif;
  color: white;
  background-color: #53b7ff;
  border-radius: 20px;
  padding: 1vw 1vw;
  width: 12vw;

  font-size: 1.8vw;
  font-weight: bold;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  text-align: center;
  
  
  
  margin-left: 3vw;
  
  
`;

const TimeText3 = styled.div`
  font-family: Helvetica, sans-serif;
  color: #53b7ff;
  background-color: #ecf8ff;
  border-radius: 20px;
  margin-left: 3vw;
  padding: 1vw 1vw;
  width: 12vw;
  font-size: 1.8vw;
  font-weight: bold;
  
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  
  
`;

const TimeText2 = styled.div`
  font-family: Helvetica, sans-serif;
  color: #53b7ff;
  font-weight: bold;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  
  text-align: center;
  display: flex;
  align-items: center;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  justify-content: center;

`;

const TimeText4 = styled.div`
  font-family: Helvetica, sans-serif;
  color: #53b7ff;
  font-weight: bold;
  
  padding-left: 0.5vw;
  padding: 0.5vw 1vw;
  font-size: 2vw;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const TimerIMGContainer = styled.img`
  width: 8vw;
  height: 8vw;
`;

const TextWrapper = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  margin-top: 2vw;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const StartButton = styled.button`
  background-color: #DAF1FF;
  color: #00A1FB;
  border: none;
  border-radius: 30px;
  font-size: 1.5vw;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  padding: 1vw 2vw;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  &:hover {
    background-color: #3e94cc;
    color: white;
  }
  white-space: nowrap; /* 버튼 크기 조절 */
  overflow: hidden; /* 버튼 크기 조절 */
  text-overflow: ellipsis; /* 버튼 크기 조절 */
`;

const CancelButton = styled.button`
  background-color: #00A1FB;
  color: #DAF1FF;
  border: none;
  border-radius: 30px;
  font-size: 1.5vw;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  padding: 1vw 2vw;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  &:hover {
    background-color: #3e94cc;
  }
  white-space: nowrap; /* 버튼 크기 조절 */
  overflow: hidden; /* 버튼 크기 조절 */
  text-overflow: ellipsis; /* 버튼 크기 조절 */
`;

const CycleIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3vw;
  margin-top: 3vw;
  
  
`;

const CycleIcon = styled.div`
  font-size: 8vw;
  color: #53b7ff;
  position: relative;
`;

const CycleText = styled.div`
  font-size: 3.5vw;
  color: black;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  margin: 2vw 0;
  font-family: Helvetica, sans-serif;
  color: red;
  
  font-size: 2vw;
`;

const ReasonContainer = styled.div`
  background-color: #ecf8ff;
  border-radius: 20px;
  grid-area: reason;
  text-align: center;
  margin: 5vw 3vw;
  overflow: auto;
  max-height: 20vh;
  white-space: pre-wrap; /* This will preserve the whitespace and line breaks in the text */
  word-wrap: break-word; /* This ensures that long words will break and wrap to the next line */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add bottom shadow */
`;

const Evaluating = ({
  selectedEmotion,
  taskDuration,
  selectedTask,
  onCancel,
}) => {
  const [loading, setLoading] = useState(true);
  const [pomodoroCycle, setPomodoroCycle] = useState(null);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const fetchPomodoroCycle = async () => {
    const requestPayload = {
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that provides optimal Pomodoro timer patterns.",
        },
        {
          role: "user",
          content: `사용자의 현재 감정이 ${selectedEmotion}이고 총 계획 시간이 ${taskDuration} 초인 경우, 
          생산성과 정신 건강을 극대화하기 위해 최적의 포모도로 타이머 패턴을 결정하십시오. 또한 ${selectedTask.task_name}을 참고하여 과제의 이름, 종류, 내용들도 고려하여 포모도로 패턴을 결정하십시오.
          오로지 사용자만을 위한 개인 맞춤 포모도로 타이머로, 가장 일반적인 시간 단위인 5분 단위의 시간은 되도록이면 피하십시오.
          또한, 맞춤형이므로, 일반적인 포모도로 타이머에 대한 개념은 배제하십시오. 필요하다면 휴식 시간이 집중 시간보다 길어지거나 집중 시간이 더 길어지는 등의 변화가 있을 수 있습니다.
          초 단위로 집중 시간, 휴식 시간 및 사이클 수를 숫자로 제공한 다음, 이 권장 사항에 대한 간단한 과학적이고, 심리학적 이유를 전문 과학 & 심리학 용어를 사용하여 한 문장으로 설명하십시오. 
          결과를 한국어로 제공하십시오.
          사이클은 집중 시간과 휴식 시간을 합한 시간을 1 사이클로 계산합니다. 그리고, ((집중 시간 + 휴식 시간) * 사이클)은 총 계획 시간보다 크지 않게 해야 합니다. 
          하지만, 총 계획 시간보다 너무 작아서도 안 됩니다. 또한, 사이클이 너무 많아지지 않도록 유의하십시오.
          답변은 "(집중 시간), (휴식 시간), (사이클 수), (이유)"의 정확히 똑같은 형식으로, 다른 추가적인 글자, 기호 없이 제공하십시오.
          만약 이유에 시간이 들어간다면 시간과 분 단위로 제공하십시오. 존댓말을 사용하십시오. 시간을 표현할 때는 적절한 시간 단위를 사용하십시오. 앞서 말한 형식을 철저하게 준수하십시오.`,
        },
      ],
      max_tokens: 3000,
    };

    console.log("API Request Payload:", requestPayload);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      console.log("API Response:", response.data);

      const result = response.data.choices[0].message.content.trim();
      console.log("Parsed Result:", result);

      const [focusTime, breakTime, cycles, ...reasonParts] = result.split(",");
      const reasonText = reasonParts.join(",").trim().replace(/"/g, "");

      if (
        isNaN(parseFloat(focusTime)) ||
        isNaN(parseFloat(breakTime)) ||
        isNaN(parseFloat(cycles))
      ) {
        throw new Error("숫자가 올바르지 않습니다. 재시도해주세요.");
      }

      setPomodoroCycle({
        focusTime: parseFloat(focusTime.trim()),
        breakTime: parseFloat(breakTime.trim()),
        cycles: parseFloat(cycles.trim()),
      });
      setReason(reasonText);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pomodoro cycle:", error);
      setError("오류가 발생했습니다. 재시도해주세요.");
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
        <LogoText2>Evaluating</LogoText2>
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
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}시간 ` : ""}${
      minutes > 0 ? `${minutes}분 ` : ""
    }${secs > 0 ? `${secs}초` : ""}`;
  };

  const handleStartButtonClick = () => {
    navigate("/timer", {
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
      <LogoText>Evaluating</LogoText>

      <ResultContainer>

        <TimeText style={{ gridArea: "focusTitle" }}>Focus Time</TimeText>
        <TimeText2 style={{ gridArea: "focusTime" }}>
          {formatTime(pomodoroCycle.focusTime)}
        </TimeText2>
        <TimeText3 style={{ gridArea: "restTitle" }}>Rest Time</TimeText3>
        <TimeText4 style={{ gridArea: "restTime" }}>
          {formatTime(pomodoroCycle.breakTime)}
        </TimeText4>
        <CycleIconContainer style={{ gridArea: "iconArea" }}>
          <CycleIcon>
            <TimerIMGContainer src={TimerIMG} alt="Timer" />
            <CycleText>{pomodoroCycle.cycles}</CycleText>
          </CycleIcon>
        </CycleIconContainer>

        <ReasonContainer>
          <TaskNameText>{reason}</TaskNameText>
        </ReasonContainer>
      </ResultContainer>
      <ButtonContainer>
        <StartButton onClick={handleStartButtonClick}>Start</StartButton>
        <CancelButton onClick={onCancel}>Back</CancelButton>
      </ButtonContainer>
    </MainContainer>
  );
};

export default Evaluating;