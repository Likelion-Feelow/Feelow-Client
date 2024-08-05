import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import TodoList from "../Todo/TodoList";
import { handleLogout } from "../Login/KakaoLogoutButton";
import { useNavigate } from "react-router-dom";
import AddTodoButton from "../Todo/AddTodoButton";

const SidebarContainer = styled.div`
  display: grid;
  grid-template-rows: 10vh 6vh 70vh auto;
  grid-template-areas:
    "menu"
    "header"
    "todolist"
    "addtodobutton";
  width: 100%;
  background-color: #d9f1ff;
  position: relative;
`;

const Sidebar = ({ selectedDate, onAddTodoClick, tasks, setTasks, handleTaskSelect, selectedTask }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SidebarContainer>
      <HamburgerMenu>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>☰</MenuButton>
      </HamburgerMenu>

      <CSSTransition in={menuOpen} timeout={300} classNames="fade" unmountOnExit>
        <MenuContent>
          <MenuButton onClick={() => setMenuOpen(!menuOpen)}>☰</MenuButton>
          <MenuItem onClick={() => handleLogout(navigate)}>Logout</MenuItem>
          <MenuItem onClick={() => navigate("/profile")}>Statistics</MenuItem>
          <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
        </MenuContent>
      </CSSTransition>

      {!menuOpen && (
        <Content>
          <Header>
            <Title>To Do</Title>
          </Header>

          <TodoListContainer>
            <TodoList 
              selectedDate={selectedDate} 
              tasks={tasks} 
              setTasks={setTasks} 
              handleTaskSelect={handleTaskSelect} 
              selectedTask={selectedTask} 
            />
          </TodoListContainer>

          <AddTodoButtonContainer>
            <AddToDoButton onClick={onAddTodoClick}>+</AddToDoButton>
          </AddTodoButtonContainer>
        </Content>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 3vw;
  position: absolute;
  top: 2vh;
  right: 2vw;
  cursor: pointer;
  z-index: 10;
`;

const HamburgerMenu = styled.div`
  grid-area: menu;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2vw;
  font-weight: bold;
  color: #53b7ff;
  margin: 0;
  padding: 5px 10px;
  margin: 0 2vw;
  border-radius: 10px;
  font-family: "Krona One";
`;

const TodoListContainer = styled.div`
  grid-area: todolist;
  margin-top: 15px;
  margin-bottom: 3.5vw;
`;

const AddTodoButtonContainer = styled.div`
  grid-area: addtodobutton;
  margin: 2vh 0;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const AddToDoButton = styled.button`
  background-color: #9cdbff;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 3vw;
  cursor: pointer;
  width: 4vw;
  height: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #4285f4;
    color: white;
  }
`;

const MenuContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #4285f4;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 5;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const MenuItem = styled.div`
  color: white;
  padding-left: 3vw;
  font-family: Helvetica;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: black;
  }
  font-size: 2vw;
  margin: 2vh 0;
`;

const Content = styled.div`
  display: contents;
  grid-area: 2 / 1 / 5 / 2;
  background-color: #d9f1ff;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;