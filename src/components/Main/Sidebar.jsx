import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition } from "react-transition-group";
import TodoList from "../Todo/TodoList";
import KakaoLogoutButton, { handleLogout } from "../Login/KakaoLogoutButton";
import { useNavigate } from "react-router-dom";
import AddTodoButton from "../Todo/AddTodoButton";

const SidebarContainer = styled.div`
  display: grid;
  grid-template-rows: 10vh 6vh auto 1fr;
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
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={() => handleLogout(navigate)}>Logout</MenuItem>
          <MenuItem>About</MenuItem>
          <KakaoLogoutButton />
          <MenuItem onClick={() => navigate("/main")}>Statistics</MenuItem> {/* Home 클릭 시 navigate 호출 */}
          <MenuItem>Logout</MenuItem>
          <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
        </MenuContent>
      </CSSTransition>

      <CSSTransition in={!menuOpen} timeout={300} classNames="fade" unmountOnExit>
        <Content>
          <Header>
            <Title>To Do List</Title>
          </Header>

          <TodoListContainer>
            <TodoList 
              selectedDate={selectedDate} 
              tasks={tasks} 
              setTasks={setTasks} 
              handleTaskSelect={handleTaskSelect} // 추가: 작업 선택 핸들러 전달
              selectedTask={selectedTask} // 추가: 선택된 작업 전달
            />
          </TodoListContainer>

          <CSSTransition key={selectedDate} timeout={{ enter: 300, exit: 80 }} classNames="fade">
            <AddTodoButtonContainer>
              <AddToDoButton onClick={onAddTodoClick}>+</AddToDoButton>
            </AddTodoButtonContainer>
          </CSSTransition>
        </Content>
      </CSSTransition>
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
  font-size:  2vw;
  font-weight: bold;
  color: #53b7ff;
  margin: 0;
  padding: 5px 10px;
  margin: 0 2vw;
  border-radius: 10px;
`;

const TodoListContainer = styled.div`
  grid-area: todolist;
  margin-top: 15px;
`;

const AddTodoButtonContainer = styled.div`
  grid-area: addtodobutton;
  margin: 2vh 0;
  display: flex;
  text-align: center;
  justify-content: center;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
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
  font-family: helvetica;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: black;
  }
  font-size: 2vw;
  margin: 2vh 0;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d9f1ff;
  display: grid;
  grid-template-rows: 10vh 6vh auto 1fr;
  grid-template-areas:
    "menu"
    "header"
    "todolist"
    "addtodobutton";
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