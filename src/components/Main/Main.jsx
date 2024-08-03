import React, { useState } from "react";
import styled from "styled-components";
import profile from "../../images/SkyBlueProfile.png";
import logo from "../../images/SkyBlueLogo.png";
import StyledCalendar from "../Calendar/CalendarSection.jsx";
import TodoList from "../Todo/TodoList.jsx";
import AddTodoForm from "../Todo/AddTodoForm.jsx";
import EmotionSelection from "../Emotion/StartEmotionSelection.jsx";
import Evaluating from "../Emotion/Evaluating.jsx";



const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 6fr;
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
  width: 100vh;
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
`;

const LogoImage = styled.img`
  margin-top: 4vh;
  height: 3vw;
  
  @media (max-width: 75vw) {
    height: 10vw;
  }
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
    console.log("Main selectedTask:", selectedTask);

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
        {view === "evaluating" && <Evaluating selectedTask={selectedTask} selectedEmotion={selectedTask.selectedEmotion} taskDuration={selectedTask.task_duration} />}
      </MainContainer>
      
    </Container>
  );
};

export default Main;
