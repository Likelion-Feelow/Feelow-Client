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
  // console.log(selectedDate);

  return (
    <Container>
      <Main 
        view={view} 
        setView={setView} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        addTask={addTask}
        tasks={tasks} />
      <Sidebar task={tasks} onAddTodoClick={() => setView('add')} selectedDate={selectedDate} />
    </Container>
  )
}

export default MainPage;

const Container = styled.div`
    display: grid;

    grid-template-areas:
    'main sidebar';
    
    grid-template-columns: 3fr 1fr;

    height: 100vh;

`;