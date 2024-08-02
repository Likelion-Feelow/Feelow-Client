import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TodoList = ({ selectedDate, tasks, setTasks, handleTaskSelect, selectedTask }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNoTaskMessage, setShowNoTaskMessage] = useState(false);

  useEffect(() => {
    const fetchTasks = () => {
      setLoading(true);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const dummyData = [
          {
            task_id: 1,
            task_name: "근로 근무",
            task_description: "C동에서 근로",
            task_duration: 5000,
            task_date: "2024-08-01"
          },
          {
            task_id: 2,
            task_name: "해커톤 회의",
            task_description: "4시반에 해커톤 회의",
            task_duration: 4000,
            task_date: "2024-08-01"
          },
          {
            task_id: 3,
            task_name: "7월 2일 할 일 1",
            task_description: "설명 3",
            task_duration: 10,
            task_date: "2024-08-02"
          },
          {
            task_id: 4,
            task_name: "7월 29일 할 일 1",
            task_description: "설명 4",
            task_duration: 45,
            task_date: "2024-07-29"
          },
          {
            task_id: 5,
            task_name: "이메일 보내기",
            task_description: "밤에 이메일 보내기",
            task_duration: 3000,
            task_date: "2024-08-01"
          }
        ];

        const tasksForSelectedDate = dummyData.filter(task => task.task_date === formattedDate);

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
            <CSSTransition key={task.task_id} timeout={300} classNames="fade">
              <TaskItem 
                onClick={() => handleTaskSelect(task)} 
                selected={selectedTask && selectedTask.task_id === task.task_id} // 추가: 선택된 작업 여부 확인
              >
                <Circle selected={selectedTask && selectedTask.task_id === task.task_id} /> {/* 추가: 선택된 작업 여부에 따라 색상 변경 */}
                <TaskContent>
                  <TaskName>{task.task_name}</TaskName>
                  <TaskDescription>{task.task_description}</TaskDescription>
                  <TaskTime>예상 시간: {formatDuration(task.task_duration)}</TaskTime>
                </TaskContent>
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
  position: relative; /* 추가: 위치 고정을 위해 추가 */

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms 100ms; /* 추가: 지연 시간을 줘서 자연스럽게 보이게 */
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 200ms; /* 추가: 빠르게 사라지게 */
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
  cursor: pointer; /* 추가: 클릭 가능하게 변경 */
  ${({ selected }) => selected && `
    background-color: #f0f8ff;
    border-color: #4285f4;
  `}
`;

const Circle = styled.div`
  width: 2vw;
  height: 2vw;
  border: 3px solid ${({ selected }) => (selected ? '#4285f4' : '#9CDBFF')}; /* 선택된 경우 색상 변경 */
  border-radius: 50%;
  margin-right: 1.5vw;
  background-color: ${({ selected }) => (selected ? '#4285f4' : 'transparent')}; /* 선택된 경우 배경색 변경 */
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