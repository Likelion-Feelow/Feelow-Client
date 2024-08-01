import React, { useState } from "react";
import styled from "styled-components";
import profile from "../images/SkyBlueProfile.png";
import logo from "../images/SkyBlueLogo.png";
import StyledCalendar from "./CalendarSection";
import TodoList from "./Todo/TodoList";
import AddTodoForm from "./Todo/AddTodoForm";
import EmotionSelection from "./EmotionSelection";
import EvaluatingPage from "../pages/EvaluatingPage";



const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 7fr;
  grid-template-areas:
    "header"
    "main";
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MainContainer = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75vw;
`;

const Header = styled.header`
  grid-area: header;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0 0;
  margin-top: 6vh;
`;

const LogoImage = styled.img`
  margin-top: 0vh;
  height: 3vw;
  margin-bottom: 1vh;
`;

const ProfileImage = styled.img`
  margin-left: 6vw;
  height: 5vh;
  width: 5.1vh;
`;

const LogoutButton = styled.button`
  background-color: #53b7ff;
  border: none;
  color: white;
  font-size: 1vw;
  cursor: pointer;
  font-family: helvetica;
  font-weight: bold;
  border-radius: 20px;
  padding: 0.8vh 1.5vw;
  margin-right: 5vw;
`;

const Main = ({ 
    view, 
    setView, 
    selectedDate, 
    setSelectedDate, 
    addTask, 
    tasks,
    setTasks,
    handleTaskSelect,
    selectedTask,
    handleEmotionSelect, // Make sure this prop is passed from the parent component
  }) => {

    console.log("Main selectedDate:", selectedDate);
    console.log("Main setSelectedDate:", setSelectedDate);

  return (
    <Container>
      <Header>
        <LogoImage src={logo} alt="Logo" />
      </Header>
      <MainContainer>
        {view === "calendar" && (
          <StyledCalendar 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            tasks={tasks}
          />
        )}
        {view === "emotion" && selectedTask && (
        <EmotionSelection 
          selectedTask={selectedTask} 
          onEmotionSelect={(selectedEmotion) => {
            handleEmotionSelect(selectedEmotion);
            setView("evaluating");
          }} 
        />
        )}
        {view === "todolist" && (
          <TodoList 
            selectedDate={selectedDate} 
            tasks={tasks} 
            setTasks={setTasks}
            addTask={addTask} 
            handleTaskSelect={handleTaskSelect}
          />
        )}
        {view === "add" && (
          <AddTodoForm
            onCancel={() => setView("calendar")}
            addTask={addTask}
            selectedDate={selectedDate}
          />
        )}
        {view === "evaluating" && <EvaluatingPage selectedTask={selectedTask} selectedEmotion={selectedTask.selectedEmotion} taskDuration={selectedTask.task_duration} />}
      </MainContainer>
    </Container>
  );
};

export default Main;
