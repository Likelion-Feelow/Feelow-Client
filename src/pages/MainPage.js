import React, { useState } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

function MainPage() {
  const [view, setView] = useState('calendar');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  console.log("MainPage selectedDate:", selectedDate);
  console.log("MainPage setSelectedDate:", setSelectedDate);

  return (
    <Container>
      <Main 
        view={view} 
        setView={setView} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        addTask={addTask}
        tasks={tasks} 
        setTasks={setTasks} 
      />
      <Sidebar 
        tasks={tasks} 
        selectedDate={selectedDate} 
        setTasks={setTasks} 
        onAddTodoClick={() => setView('add')} 
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