import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, addMonths, subMonths } from 'date-fns';

// Function to determine the predominant feeling and its neon light gradient color
const getPredominantFeelingGradient = (feelings) => {
  if (!feelings) return css`background: rgba(128, 128, 128, 0.5); box-shadow: 0 0 10px rgba(128, 128, 128, 0.5);`; // Default gray background with transparency if no feelings info is available

  const feelingColors = {
    happy: ['rgba(255, 230, 0, 0.5)', 'rgba(255, 250, 205, 0.5)'],
    calm: ['rgba(255, 190, 252, 0.5)', 'rgba(255, 228, 252, 0.5)'],
    sad: ['rgba(84, 142, 255, 0.5)', 'rgba(173, 216, 255, 0.5)'],
    nervous: ['rgba(211, 156, 255, 0.5)', 'rgba(230, 204, 255, 0.5)'],
    anger: ['rgba(255, 111, 111, 0.5)', 'rgba(255, 166, 166, 0.5)'],
  };

  const neonShadows = {
    happy: '0 0 10px rgba(255, 230, 0, 0.7), 0 0 20px rgba(255, 230, 0, 0.7), 0 0 30px rgba(255, 230, 0, 0.7), 0 0 40px rgba(255, 230, 0, 0.7)',
    calm: '0 0 10px rgba(255, 190, 252, 0.7), 0 0 20px rgba(255, 190, 252, 0.7), 0 0 30px rgba(255, 190, 252, 0.7), 0 0 40px rgba(255, 190, 252, 0.7)',
    sad: '0 0 10px rgba(84, 142, 255, 0.7), 0 0 20px rgba(84, 142, 255, 0.7), 0 0 30px rgba(84, 142, 255, 0.7), 0 0 40px rgba(84, 142, 255, 0.7)',
    nervous: '0 0 10px rgba(211, 156, 255, 0.7), 0 0 20px rgba(211, 156, 255, 0.7), 0 0 30px rgba(211, 156, 255, 0.7), 0 0 40px rgba(211, 156, 255, 0.7)',
    anger: '0 0 10px rgba(255, 111, 111, 0.7), 0 0 20px rgba(255, 111, 111, 0.7), 0 0 30px rgba(255, 111, 111, 0.7), 0 0 40px rgba(255, 111, 111, 0.7)',
  };

  // Ensure that only the numeric feeling values are used
  const { total, ...feelingsWithoutTotal } = feelings;
  const predominantFeeling = Object.keys(feelingsWithoutTotal).reduce((a, b) => feelingsWithoutTotal[a] > feelingsWithoutTotal[b] ? a : b);

  if (!feelingColors[predominantFeeling]) return css`background: rgba(128, 128, 128, 0.5); box-shadow: 0 0 10px rgba(128, 128, 128, 0.5);`;

  return css`
    background: linear-gradient(
      45deg,
      ${feelingColors[predominantFeeling][0]},
      ${feelingColors[predominantFeeling][1]}
    );
    box-shadow: ${neonShadows[predominantFeeling]};
  `;
};

// Container for the whole calendar component
const CalendarContainer = styled.div`
  display: grid;
  gap: 2vw;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(7, 1fr);
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  height: 93vh; /* Make the calendar height responsive */
  width: 75vw; /* Set a maximum width */
`;

// Header for the month
const MonthHeader = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: #3893FF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 3vw;
`;

// Day of the week header
const DayHeader = styled.div`
  color: #3893FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5vw;
`;

// Week number
const WeekNumber = styled.div`
  color: #3893FF;
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
  ${({ $feelings }) => $feelings ? getPredominantFeelingGradient($feelings) : css`background: rgba(255, 255, 255, 0.5); box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);`}
  cursor: pointer;
  position: relative;
  margin: 0 0.9vw;
  border-radius: 10px; /* Rounded corners */
  overflow: hidden;

  &.today {
    background: rgba(0, 0, 128, 0.5) !important;
    color: white !important;
    box-shadow: 0 0 10px rgba(0, 0, 128, 0.7), 0 0 20px rgba(0, 0, 128, 0.7), 0 0 30px rgba(0, 0, 128, 0.7), 0 0 40px rgba(0, 0, 128, 0.7) !important;
  }

  &.selected::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    border-radius: 10px; /* Rounded corners */
    transform: translate(-50%, -50%);
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
  const [feelings, setFeelings] = useState(() => {
    const daysArray = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });
    const randomFeelings = {};

    daysArray.forEach((day) => {
      if (day < new Date()) {
        const happy = Math.random() * 10;
        const calm = Math.random() * (10 - happy);
        const sad = Math.random() * (10 - happy - calm);
        const nervous = Math.random() * (10 - happy - calm - sad);
        const anger = 10 - happy - calm - sad - nervous;
        const total = happy + calm + sad + nervous + anger;

        randomFeelings[format(day, 'yyyy-MM-dd')] = { total, happy, calm, sad, nervous, anger };
      }
    });

    console.log('Random Feelings:', randomFeelings);
    return randomFeelings;
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

  const getFeelingsInfo = (day) => {
    const key = format(day, 'yyyy-MM-dd');
    return feelings[key] || null;
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
        {days.map((day) => (
          <CalendarTile
            key={day}
            onClick={() => handleDateClick(day)}
            className={`${isSameDay(day, new Date()) ? 'today' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
            style={{ gridColumn: (day.getDay() + 2), gridRow: getGridRowStart(day) }}
            $feelings={getFeelingsInfo(day)}
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