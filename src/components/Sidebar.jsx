import React from "react";
import styled from "styled-components";
import { SidebarContainer } from "../styles/SidebarStyle";
import TodoList from "./Todo/TodoList";
import AddTodoButton from "./Todo/AddTodoButton";
import Timer from "../images/Timer.png";

const Sidebar = ({ selectedDate, onAddTodoClick }) => {

  return (
    <SidebarContainer>
      <Header>
        <Title>To - Do</Title>
        <IconContainer>
          <img src={Timer} alt="Timer Icon" />
        </IconContainer>
      </Header>
      <TodoListContainer>
        <TodoList selectedDate={selectedDate} />
      </TodoListContainer>
      <AddTodoButtonContainer>
        <AddTodoButton onAddTodoClick={onAddTodoClick} />
      </AddTodoButtonContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #4285f4;
  margin: 0;
  background-color: #e3f2fd;
  padding: 5px 10px;
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
  margin-top: 15px;
`;

const AddTodoButtonContainer = styled.div`
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
