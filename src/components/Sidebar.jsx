// ./components/Sidebar.js

import React from "react";
import { SidebarContainer } from "../styles/SidebarStyle";
import TodoList from "./Todo/TodoList";
import AddTodoButton from "./Todo/AddTodoButton";
import styled from "styled-components";

const Sidebar = ({onAddTodoClick}) => {
  return (
    <SidebarContainer>

      <TodoList />
      <AddTodoButton onAddTodoClick={onAddTodoClick} />
    </SidebarContainer>
  );
};

export default Sidebar;
