import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, addMonths, subMonths } from 'date-fns';

// Container for the whole calendar component
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(7, 1fr);
  
  
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  height: 80vh; /* Make the calendar height responsive */
  width: 55vw; /* Set a maximum width */
`;

// Header for the month
const MonthHeader = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: #3893FF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;


  font-size: 3vw;
`;

// Day of the week header
const DayHeader = styled.div`
  background-color: #B1D5FF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  

  font-size: 1.5vw;
`;

// Week number
const WeekNumber = styled.div`
  background-color: #B1D5FF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  

  font-size: 1.5vw;
`;

// Calendar tile
const CalendarTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: white;
  cursor: pointer;
  position: relative;

  &.today {
    background: #3893FF !important;
    color: white !important;
  }

  &.selected::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${keyframes`
      0% { transform: translate(-50%, -50%) scale(0); }
      100% { transform: translate(-50%, -50%) scale(1); }
    `} 0.5s forwards;
  }

  &.selected {
    &::before {
      border: 5px solid ${props => props.taskInfo ? 'blue' : 'gray'};
      border-top-color: ${props => props.taskInfo && props.taskInfo.completed ? 'blue' : 'gray'};
      border-right-color: ${props => props.taskInfo && props.taskInfo.incomplete ? 'red' : 'gray'};
      border-bottom-color: ${props => props.taskInfo && props.taskInfo.remaining ? 'gray' : 'gray'};
      border-left-color: ${props => props.taskInfo && props.taskInfo.incomplete ? 'red' : 'gray'};
    }
  }
`;

const DayContainer = styled.div`
  display: contents;

  font-size: 1.5vw;
`;

const StyledCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [tasks, setTasks] = useState({
    // Example tasks data
    '2024-07-01': { total: 10, completed: 5, incomplete: 2, remaining: 3 },
    '2024-07-02': { total: 8, completed: 6, incomplete: 1, remaining: 1 },
    '2024-07-10': { total: 12, completed: 7, incomplete: 4, remaining: 1 },
    '2024-07-15': { total: 5, completed: 3, incomplete: 1, remaining: 1 },
    '2024-07-20': { total: 6, completed: 4, incomplete: 1, remaining: 1 },
    '2024-07-25': { total: 9, completed: 5, incomplete: 2, remaining: 2 },
  });

  useEffect(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const daysArray = eachDayOfInterval({ start, end });
    setDays(daysArray);
  }, [currentDate]);

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

  const getTaskInfo = (day) => {
    const key = format(day, 'yyyy-MM-dd');
    return tasks[key] || null;
  };

  return (
    <CalendarContainer>
      <MonthHeader>
        <ArrowButton onClick={handlePreviousMonth}>&lt;</ArrowButton>
        {monthNumber}
        <ArrowButton onClick={handleNextMonth}>&gt;</ArrowButton>
      </MonthHeader>
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
        <DayHeader key={day} style={{ gridColumn: index + 2, gridRow: 1 }}>
          {day}
        </DayHeader>
      ))}
      {['1', '2', '3', '4', '5', '6'].map((week, index) => (
        <WeekNumber key={week} style={{ gridRow: index + 2, gridColumn: 1 }}>
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
            taskInfo={getTaskInfo(day)}
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
  color: white;
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