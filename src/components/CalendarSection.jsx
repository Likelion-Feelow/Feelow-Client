import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, addMonths, subMonths } from 'date-fns';

// Container for the whole calendar component
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(7, 1fr);
  border: 5px solid #3893FF;
  border-radius: 20px;
  font-family: Helvetica, sans-serif;
  font-weight: bold;

  
  height: 75vh; /* Make the calendar height responsive */
  
  width: 60vw; /* Set a maximum width */
  
`;

// Header for the month
const MonthHeader = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: #3893ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-left-radius: 15px; /* Rounded corners */

  font-size: 3vw;
`;

// Day of the week header
const DayHeader = styled.div`
  background-color: #B1D5FF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid #3893FF;
  
  font-size: 1.5vw;

  ${({ isLast }) => isLast && `
    
    
    border-top-right-radius: 15px;
  `}
`;

// Week number
const WeekNumber = styled.div`
  background-color: #B1D5FF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 5px solid #3893FF;

  font-size: 1.5vw;

  ${({ isLast }) => isLast && `
    
    
    border-bottom-left-radius: 15px;
  `}
`;

// Calendar tile
const CalendarTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  
  font-size: 1.5vw;
  
  color: black;
  background-color: white;
  cursor: pointer;


  &.today {
    background: #3893FF !important;
    color: white !important;
  }
  &.selected {
    background: #FF8C00 !important;
    color: white !important;
  }
`;

const DayContainer = styled.div`
  display: contents;
  
`;

const StyledCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const daysArray = eachDayOfInterval({ start, end });
    setDays(daysArray);
  }, [currentDate]);

  const handleDateChange = (date) => {
    // setActiveStartDate(date);
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const monthNumber = format(currentDate, 'M');

  const getGridRowStart = (date) => {
    const startDay = startOfMonth(currentDate).getDay();
    const offset = (date.getDate() + startDay - 1) % 7;
    return Math.floor((date.getDate() + startDay - 1) / 7) + 2;
  };

  return (
    <CalendarContainer>
      <MonthHeader>
        <ArrowButton onClick={handlePreviousMonth}>&lt;</ArrowButton>
        {monthNumber}
        <ArrowButton onClick={handleNextMonth}>&gt;</ArrowButton>
      </MonthHeader>
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
        <DayHeader key={day} style={{ gridColumn: index + 2, gridRow: 1 }} isLast={index === 6}>
          {day}
        </DayHeader>
      ))}
      {['1', '2', '3', '4', '5', '6'].map((week, index) => (
        <WeekNumber key={week} style={{ gridRow: index + 2, gridColumn: 1 }} isLast={index === 5}>
          {week}
        </WeekNumber>
      ))}
      <DayContainer>
        {days.map((day, index) => (
          <CalendarTile
            key={day}
            onClick={() => handleDateClick(day)}
            className={`${isSameDay(day, new Date()) ? 'today' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
            style={{ gridColumn: (day.getDay() + 2), gridRow: getGridRowStart(day) }}
          >
            {format(day, 'd')}
          </CalendarTile>
        ))}
      </DayContainer>
    </CalendarContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #3893FF;
  font-size: 1.5rem;
  cursor: pointer;
`;

const App = () => {
  return (
    <AppContainer>
      <StyledCalendar />
    </AppContainer>
  );
};

export default App;