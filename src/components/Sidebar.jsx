import React from "react";
import styled from "styled-components";

import TodoList from "./Todo/TodoList";
import AddTodoButton from "./Todo/AddTodoButton";

const SidebarContainer = styled.div`
  display: grid;

  grid-template-rows: 1fr 1fr 4fr 1fr;
  grid-template-areas:
    "menu"
    "header"
    "todolist"
    "addtodobutton";

  width: 100%;
  
  background-color: #D9F1FF;
  

  
`;


const Sidebar = ({ selectedDate, onAddTodoClick, tasks }) => {  

  return (
    <SidebarContainer>
      <HamburgerMenu>
        <MenuButton>☰</MenuButton>
      </HamburgerMenu>


      <Header>
        <Title>To - Do</Title>
      </Header>



      <TodoListContainer>
        <TodoList selectedDate={selectedDate} tasks={tasks }/>
      </TodoListContainer>


      <AddTodoButtonContainer>
        <AddTodoButton onAddTodoClick={onAddTodoClick} />
      </AddTodoButtonContainer>


    </SidebarContainer>
  );
};

export default Sidebar;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 4vw;
  margin: 2vh 2vw;
  cursor: pointer;
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
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 2vw;
  font-weight: bold;
  color: #4285f4;
  margin: 0;
  background-color: #e3f2fd;
  padding: 5px 10px;
  margin: 0 2vw;
  border-radius: 10px;
`;

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40px;  // 원하는 크기로 설정
    height: 40px; // 원하는 크기로 설정
  }
`;

const TodoListContainer = styled.div`
  grid-area: todolist;
  margin-top: 15px;
`;

const AddTodoButtonContainer = styled.div`
  grid-area: addtodobutton;
  margin-top: 15px;
  text-align: center;
`;

const Button = styled.button`
  background: none;
  border: 2px solid #4285f4;
  border-radius: 20px;
  color: #4285f4;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #4285f4;
    color: white;
  }
`;
