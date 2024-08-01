import React, { useState } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import EmotionSelection from "../components/EmotionSelection"; // 추가

function MainPage() {
  const [view, setView] = useState('calendar');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null); // 추가: 선택된 작업 상태
  const [currentStep, setCurrentStep] = useState("calendar");
  const [selectedEmotion, setSelectedEmotion] = useState("");

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setView('emotion'); // 선택된 작업이 있을 때 emotion 화면으로 전환
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setCurrentStep("evaluating");
  };

  return (
    <Container>
      <Main
        view={view}
        setView={setView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        addTask={addTask}
        tasks={tasks}
        handleTaskSelect={handleTaskSelect} // 추가: 작업 선택 핸들러 전달
        selectedTask={selectedTask} // 추가: 선택된 작업 전달
        handleEmotionSelect={handleEmotionSelect}
      />
      <Sidebar
        selectedDate={selectedDate}
        onAddTodoClick={() => setView('add')}
        tasks={tasks}
        setTasks={setTasks}
        handleTaskSelect={handleTaskSelect} // 추가: 작업 선택 핸들러 전달
        selectedTask={selectedTask} // 추가: 선택된 작업 전달
      />
    </Container>
  );
}

export default MainPage;

const Container = styled.div`
  display: grid;
  grid-template-areas: 'main sidebar';
  grid-template-columns: 3fr 1fr;
  height: 100vh;
`;