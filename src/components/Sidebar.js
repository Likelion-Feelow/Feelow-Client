// ./components/Sidebar.js

import React from "react";
import { SidebarContainer } from "../styles/SidebarStyle";
import TodoList from "./Todo/TodoList";
import AddTodoButton from "./Todo/AddTodoButton";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <TodoList />
      <AddTodoButton />
    </SidebarContainer>
  );
};

export default Sidebar;
