import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from 'axios';

const TodoList = ({ selectedDate, tasks, setTasks, addTask, handleTaskSelect, selectedTask }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNoTaskMessage, setShowNoTaskMessage] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
          throw new Error("Access token is missing");
        }

        const response = await axios.get(`http://3.39.201.42:8090/tasks/?year=${year}&month=${month}&day=${day}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const tasksForSelectedDate = response.data.filter(task => task.date === formattedDate);

        setTasks(tasksForSelectedDate);
        setShowNoTaskMessage(tasksForSelectedDate.length === 0);
        setError(null);
      } catch (error) {
        setError("할 일을 불러오는 데 문제가 발생했습니다.");
        console.log("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedDate, setTasks]);

  const handleDeleteTask = async (taskId) => {
    try {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      await axios.delete(`http://3.39.201.42:8090/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // Remove the task from the tasks array
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError("할 일을 삭제하는 데 문제가 발생했습니다.");
      console.log("Error deleting task:", error);
    }
  };


  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const parts = [];
    if (hrs > 0) parts.push(`${hrs}시간`);
    if (mins > 0) parts.push(`${mins}분`);
    if (secs > 0) parts.push(`${secs}초`);
    return parts.join(" ");
  };

  if (loading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  if (error) {
    return <ListContainer>{error}</ListContainer>;
  }

  return (
    <ListContainer>
      <TransitionGroup component={null}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <CSSTransition key={task.id} timeout={300} classNames="fade">
              <TaskItem 
                onClick={() => handleTaskSelect(task)} 
                selected={selectedTask && selectedTask.id === task.id}
              >
                <Circle selected={selectedTask && selectedTask.id === task.id} />
                <TaskContent>
                  <TaskName>{task.task_name}</TaskName>
                  <TaskDescription>{task.task_description}</TaskDescription>
                  <TaskTime>예상 시간: {formatDuration(task.task_duration)}</TaskTime>
                </TaskContent>
                <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}>삭제</DeleteButton>
              </TaskItem>
            </CSSTransition>
          ))
        ) : (
          <CSSTransition in={showNoTaskMessage} timeout={300} classNames="fade" unmountOnExit>
            <NoTaskMessage>할 일이 없습니다.</NoTaskMessage>
          </CSSTransition>
        )}
      </TransitionGroup>
    </ListContainer>
  );
};

export default TodoList;

// styled-components
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ListContainer = styled.div`
  padding: 10px;
  position: relative;

  text-align: center;

  font-size: 1vw;

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 200ms ease-out;
  }
`;


const DeleteButton = styled.button`
  display: none;
  background-color: lightgray;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%); /* 버튼을 수직으로 가운데 정렬합니다 */

  &:hover {
    background-color: #ff1a1a;
  }
`; 

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1.5vh 2vw;
  cursor: pointer;
  position: relative;
  overflow: hidden; /* 이 줄을 추가하여 자식 요소가 범위를 벗어나지 않도록 합니다 */

  ${({ selected }) => selected && `
    background-color: #f0f8ff;
    border-color: #4285f4;
  `}

  &:hover {
    ${DeleteButton} {
      display: block;
    }
  }
`;

const Circle = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  border: 2.5px solid ${({ selected }) => (selected ? '#4285f4' : '#9CDBFF')};
  border-radius: 50%;
  margin-right: 1vw;
  margin-left: 1vw;
  background-color: ${({ selected }) => (selected ? '#4285f4' : 'transparent')};
`;

const TaskContent = styled.div`
  flex-grow: 1;
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
