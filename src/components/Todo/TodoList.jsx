import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const TodoList = ({ selectedDate, tasks, setTasks }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // selectedDate에서 연도, 월, 일 추출
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; // 0-indexed이므로 +1 필요
        const day = selectedDate.getDate();
        
        // API 요청 경로에 year, month, day 포함
        const response = await axios.get(`/tasks`, {
          params: { year, month, day }
        });

        setTasks(response.data);
      } catch (error) {
        setError("할 일을 불러오는 데 문제가 발생했습니다.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedDate, setTasks]);

  if (loading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  if (error) {
    return <ListContainer>{error}</ListContainer>;
  }

  return (
    <ListContainer>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem key={task.task_id}>
            <TaskName>{task.task_name}</TaskName>
            <TaskDescription>{task.task_description}</TaskDescription>
            <TaskTime>예상 시간: {task.task_duration} 초</TaskTime>
          </TaskItem>
        ))
      ) : (
        <NoTaskMessage>할 일이 없습니다.</NoTaskMessage>
      )}
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  padding: 10px;
`;

const TaskItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const TaskName = styled.h3`
  margin: 0;
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
  color: #666;
`;

const TaskTime = styled.p`
  margin: 0;
  color: #999;
`;

const NoTaskMessage = styled.p`
  color: #999;
  text-align: center;
  margin-top: 20px;
`;

const LoadingMessage = styled.p`
  color: #4285f4;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
`;