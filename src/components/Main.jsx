import React from "react";
import styled from "styled-components";
import profile from "../images/SkyBlueProfile.png";
import logo from "../images/SkyBlueLogo.png";
import StyledCalendar from "./CalendarSection";
import TodoList from "./Todo/TodoList";
import AddTodoForm from "./Todo/AddTodoForm";
import EmotionSelection from "./EmotionSelection";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 7fr;
  grid-template-areas:
    "header"
    "main";
  justify-content: center;
  width: 100%;
  height: 100%; /* 높이를 뷰포트 높이에 맞게 설정 */
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
  background-color: #53B7FF;
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
    setTasks
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
          />
        )}
        {view === "todolist" && (
          <TodoList 
            selectedDate={selectedDate} 
            tasks={tasks} 
            setTasks={setTasks} 
          />
        )}
        {view === "emotion" && <EmotionSelection />}
        {view === "add" && (
          <AddTodoForm onCancel={() => setView("calendar")} addTask={addTask} selectedDate={selectedDate} />
        )}
      </MainContainer>
    </Container>
  );
};

export default Main;