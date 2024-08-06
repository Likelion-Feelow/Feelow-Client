import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import deleteIMG from '../../images/Delete.png';
import api from '../../api'; // api.js 파일을 import 합니다.

const emotions = [
  { main: '긍정', sub: ['행복', '기쁨', '만족', '감사', '희망', '자신감', '흥미', '열정', '자부심', '안심'], bgColor: '#FFD89D', subColor: '#FFF7EC', subBgColor: '#FFF7EC', fontColor: '#FFA51E' },
  { main: '평온', sub: ['안정', '편안', '고요', '차분', '여유', '온화', '따뜻함', '수용', '조화', '균형'], bgColor: '#FF9DC6', subColor: '#FFD7FD', subBgColor: '#FFECF5', fontColor: '#FF4A96' },
  { main: '우울', sub: ['슬픔', '절망', '침울', '낙담', '눈물', '후회', '무기력', '고독', '상실', '비관'], bgColor: '#67BFFF', subColor: '#8BB3FF', subBgColor: '#ECF8FF', fontColor: '#0094FF' },
  { main: '불안', sub: ['걱정', '초조', '긴장', '두려움', '공포', '당황', '염려', '불편', '근심', '불확실'], bgColor: '#C29DFF', subColor: '#E5C5FF', subBgColor: '#ECEEFF', fontColor: '#853AFF' },
  { main: '분노', sub: ['화남', '짜증', '격노', '불쾌', '원망', '성남', '분개', '대노', '울분', '분통'], bgColor: '#FF9D9D', subColor: '#FF9292', subBgColor: '#FFECEC', fontColor: '#FF4E4E' },
];

const getEmotionColor = (emotion) => {
  for (let emotionCategory of emotions) {
    if (emotionCategory.main === emotion || emotionCategory.sub.includes(emotion)) {
      return emotionCategory.bgColor;
    }
  }
  return '#FFFFFF'; // 기본 색상
};

const TodoList = ({ selectedDate, tasks, setTasks, addTask, handleTaskSelect, selectedTask }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNoTaskMessage, setShowNoTaskMessage] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState(null); // Hover 상태를 관리하는 상태 변수 추가

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const response = await api.get(`/tasks/?year=${year}&month=${month}&day=${day}`);

        const tasksForSelectedDate = response.data.filter(task => task.date === formattedDate);
        
        console.log(tasksForSelectedDate);
        
        tasksForSelectedDate.forEach(task => {
          console.log(`Task: ${task.task_name}, Focus Time: ${task.focus_time}, Break Time: ${task.break_time}`);
        });

        // 우선순위에 따라 정렬
        tasksForSelectedDate.sort((a, b) => {
          const aPriority = (a.current_emotion === null && a.changed_emotion === null) ? 1
            : (a.current_emotion === null || a.changed_emotion === null) ? 2 : 3;
          const bPriority = (b.current_emotion === null && b.changed_emotion === null) ? 1
            : (b.current_emotion === null || b.changed_emotion === null) ? 2 : 3;
          return aPriority - bPriority;
        });

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
      await api.delete(`/tasks/${taskId}`);

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
                onMouseEnter={() => setHoveredTaskId(task.id)} // Hover 시작
                onMouseLeave={() => setHoveredTaskId(null)} // Hover 종료
              >
                <Circle 
                  selected={selectedTask && selectedTask.id === task.id} 
                  currentEmotion={task.current_emotion} 
                  changedEmotion={task.changed_emotion} 
                />
                <TaskContent>
                  <TaskName>{task.task_name}</TaskName>
                  <TaskDescription>{task.task_description}</TaskDescription>
                  <TaskTime>예상 시간: {formatDuration(task.task_duration)}</TaskTime>
                </TaskContent>
                <DeleteButton 
                  onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
                  isVisible={hoveredTaskId === task.id} // Hover 상태에 따라 DeleteButton 표시 여부 결정
                />
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

const slideIn = keyframes`
  from {
    right: -50px;
    opacity: 0;
  }
  to {
    right: 10px;
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    right: 10px;
    opacity: 1;
  }
  to {
    right: -50px;
    opacity: 0;
  }
`;

const ListContainer = styled.div`
  padding: 1vw;
  position: relative;
  text-align: center;
  font-size: 1vw;
  height: 100%;

  overflow-y: auto;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none;  /* For Internet Explorer and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }

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
    transition: opacity 200ms ease-out.
  }
`;

const DeleteButton = styled.button`
  background: url(${deleteIMG}) no-repeat center center;
  background-size: contain;
  border: none;
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  
  top: 50%;
  transform: translate(-20%, -50%);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s, right 0.3s;

  ${({ isVisible }) => isVisible ? `
    right: 10px;
  ` : `
    right: -50px;
  `}
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8vh 1vw;
  min-height: 6vw;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1.5vh 2vw;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  ${({ selected }) => selected && `
    background-color: #f0f8ff;
    border-color: #0C98FF;
  `}
`;

const Circle = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  position: relative;
  border-radius: 50%;
  margin-right: 1vw;
  margin-left: 1vw;
  flex-shrink: 0; // Add this line to prevent shrinking
  ${({ currentEmotion, changedEmotion, selected }) => {
    if (currentEmotion && changedEmotion) {
      return `
        background: linear-gradient(135deg, ${getEmotionColor(currentEmotion)} 50%, ${getEmotionColor(changedEmotion)} 50%);
        border: none;
      `;
    } else if (currentEmotion || changedEmotion) {
      const emotionColor = getEmotionColor(currentEmotion || changedEmotion);
      return `
        background: linear-gradient(135deg, ${emotionColor} 50%, transparent 50%);
        border: 2.5px solid ${selected ? '#4285f4' : '#9CDBFF'};
      `;
    } else {
      return `
        background-color: transparent;
        border: 2.5px solid ${selected ? '#4285f4' : '#9CDBFF'};
      `;
    }
  }}
`;

const TaskContent = styled.div`
  flex-grow: 1;
  padding: 1vw 1vw;
`;

const TaskName = styled.h3`
  margin: 0;
  color: #333;
  max-height: 6vw;
  overflow-y: scroll;
  word-break: break-all;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
  color: #666;
  max-height: 6vw; // Add a maximum height
  overflow-y: scroll;
  word-break: break-all;
`;

const TaskTime = styled.p`
  margin: 0;
  color: #999;
`;

const TaskFocusBreak = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9vw;
`;

const NoTaskMessage = styled.p`
  color: #999;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  font-size: 1vw;
`;

const LoadingMessage = styled.p`
  color: #4285f4;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  font-size: 1vw;
`;