import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

const AddTodoForm = ({ onCancel, addTask, selectedDate }) => {
  const [taskName, setTaskName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // 로컬 시간대로 날짜 포맷팅
  const formattedDate = selectedDate.toLocaleDateString('en-CA'); // 'en-CA' 포맷은 'YYYY-MM-DD' 형식으로 출력

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskName.length > 100) {
      alert("할 일 이름은 100자를 초과할 수 없습니다.");
      return;
    }

    // 각 시간 필드가 비어 있는 경우 0으로 설정
    const hoursValue = hours === '' ? 0 : parseInt(hours);
    const minutesValue = minutes === '' ? 0 : parseInt(minutes);
    const secondsValue = seconds === '' ? 0 : parseInt(seconds);

    const totalDuration = (hoursValue * 3600) + (minutesValue * 60) + secondsValue;

    // 0시간 0분 0초인 경우 추가하지 않음
    if (totalDuration === 0) {
      alert("시간을 설정해주세요.");
      return;
    }

    const newTask = {
      date: formattedDate,
      task_name: taskName,
      task_duration: totalDuration,
      task_description: taskDescription,
    };
    console.log(newTask);

    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await axios.post('http://3.39.201.42:8090/tasks/', newTask, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("추가: ", response.data);
      addTask(response.data); // 새 할 일 추가(todo list에 띄워주기 위해)
      onCancel(); // 할 일 추가 이후 폼 닫기
    } catch (error) {
      console.error("새 할 일 추가 실패", error);
    }
  };

  return (
    <FormContainer>
      <Title>To-do</Title>
      <Form onSubmit={handleSubmit}>
        <Label>이름</Label>
        <Input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          required
        />

        <Label>예상 시간</Label>
        <TimeInputContainer>
          <TimeInput 
            type="number" 
            value={hours} 
            onChange={(e) => setHours(e.target.value)} 
            placeholder="H" 
            min="0"
          />
          <TimeInput 
            type="number" 
            value={minutes} 
            onChange={(e) => setMinutes(e.target.value)} 
            placeholder="M" 
            min="0" 
            max="59"
          />
          <TimeInput 
            type="number" 
            value={seconds} 
            onChange={(e) => setSeconds(e.target.value)} 
            placeholder="S" 
            min="0" 
            max="59"
          />
        </TimeInputContainer>

        <Label>설명</Label>
        <Textarea 
          value={taskDescription} 
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        
        <ButtonContainer>
          <Button type="submit">추가하기</Button>
          <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default AddTodoForm;

// Styled-components

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'title'
    'form';
  gap: 2vh;
  border-radius: 10px;
  padding: 3vh 3vw;
  background-color: #ECF8FF;
  width: 80%;
  height: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out; /* 페이드 인 애니메이션 추가 */
`;

const Title = styled.h2`
  grid-area: title;
  background-color: #ECF8FF;
  color: #53B7FF;
  border-radius: 10px 10px 0 0;
  text-align: left;
  font-size: 2vw;
`;

const Form = styled.form`
  grid-area: form;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  color: black;
  font-weight: bold;
  font-size: 1.3vw;
  font-family: helvetica;
  shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 2vh;
  font-size: 2vw;
  border: none;
  border-bottom: 2px solid #0094FF;
  background-color: #ECF8FF;
`;

const TimeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3vh;
`;

const TimeInput = styled.input`
  width: 30%;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid #0094FF;
  background-color: #ECF8FF;
  font-size: 2vw;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: none;
  border-bottom: 2px solid #0094FF;
  background-color: #ECF8FF;
  margin-bottom: 2vh;
  font-size: 1.3vw;
  height: 5vw;
`;

const ButtonContainer = styled.div`
  grid-area: button;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 6vw;
  height: 4.5vh;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 1vw;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-family: helvetica;
  font-weight: bold;

  &:hover {
    background-color: #357ae8;
  }
`;

const CancelButton = styled.button`
  width: 5vw;
  height: 4.5vh;
  border: none;
  border-radius: 5px;
  background-color: #FF9D9D;
  color: black;
  font-size: 1vw;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-family: helvetica;
  font-weight: bold;

  &:hover {
    background-color: #357ae8;
  }
`; 