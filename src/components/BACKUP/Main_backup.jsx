import React, { useState } from "react";

import styled from "styled-components";
import profile from "../images/profile.png";
import logo from "../images/Logo.png";
import CalendarSection from "./CalendarSection";

import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import AddTodoForm from "../Todo/AddTodoForm";



const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%; /* 높이를 뷰포트 높이에 맞게 설정 */
`;


const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const Main = ({ view, setView, setSelectedDate }) => {
  return (
    <Container>
      <>
        {view === "calendar" && (
        <Calendar>
            <CalendarSection setSelectedDate={setSelectedDate} />
        </Calendar>
        )}
        {view === "add" && <AddTodoForm onCancel={() => setView("calendar")} />}
      </>


    </Container>
  );
};

export default Main;
