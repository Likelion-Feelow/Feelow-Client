import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const AddTodoForm = ({ onCancel, onAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [predictTime, setPredictTime] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newTask = {
      task_name: taskName,
      predict_time: parseInt(predictTime),
      task_description: taskDescription,
      date: date,
    };

    try {
      const response = await axios.post('/api/tasks', newTask);
      onAdd(response.data); // 새 할 일 추가
      onCancel(); // 폼 닫기
    } catch (error) {
      console.error("새 할 일 추가 실패", error);
    }
  };

  return (
    <FormContainer>
      <Title>+ To do</Title>
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
            value={predictTime} 
            onChange={(e) => setPredictTime(e.target.value)} 
            required
          />
        </TimeInputContainer>

        <Label>설명</Label>
        <Textarea 
          value={taskDescription} 
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />

        <Label>날짜</Label>
        <Input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required
        />

        <ButtonContainer>
          <Button type="submit">+ 추가됨</Button>
          <Button type="button" onClick={onCancel}>취소</Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default AddTodoForm;

// Styled-components

const FormContainer = styled.div`
  border: 1px solid #4285f4;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  margin: 20px;
`;

const Title = styled.h2`
  background-color: #4285f4;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  margin: -20px -20px 20px -20px;
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  color: #4285f4;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const TimeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeInput = styled.input`
  width: 30%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4285f4;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #357ae8;
  }
`;
