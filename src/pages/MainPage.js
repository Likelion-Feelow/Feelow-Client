import Header from "../components/Header";
import styled from "styled-components";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { useState } from "react";


function MainPage() {
  const [view, setView] = useState('calendar');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <Container>
      <Header />
      <Main view={view} setView={setView} setSelectedDate={setSelectedDate} onAdd={addTask} />
      <Sidebar onAddTodoClick={() => setView('add')} tasks={tasks} selectedDate={selectedDate} />
    </Container>
  )
}

export default MainPage;

const Container = styled.div`
    display: grid;

    grid-template-areas:
    'header header'
    'main sidebar';

    grid-template-rows: 5vh 1fr;
    grid-template-columns: 3fr 1fr;

    height: 100vh;
`;