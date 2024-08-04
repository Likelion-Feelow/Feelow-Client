import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

// Container for the whole calendar component
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(7, 1fr);
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  height: 100%; /* Make the calendar height responsive */
  width: 100%; /* Set a maximum width */
`;

// Header for the month
const MonthHeader = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: #53b7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  font-size: 4vw;
`;

// Day of the week header
const DayHeader = styled.div`
  color: #53b7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;

  ${({ isLast }) =>
    isLast &&
    `
    border-top-right-radius: 15px;
  `}
`;

// Week number
const WeekNumber = styled.div`
  color: #53b7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;

  ${({ isLast }) =>
    isLast &&
    `
    border-bottom-left-radius: 15px;
  `}
`;

// Calendar tile
const CalendarTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1vh 2vw;
  padding: 1.5vw 1.5vw;
  font-size: 2vw;
  color: black;
  background: ${({ $feelings }) =>
    $feelings
      ? `linear-gradient(135deg, ${$feelings[0]} 100%, ${$feelings[1]} 30%)`
      : "white"}; // 변경된 부분: 두 감정 색상의 그라디언트 사용

  border-radius: 50%; /* Make it circular */
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.3s ease;

  box-sizing: border-box;


  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &.today {
    background: #3893ff !important;
    color: white !important;
    border-radius: 10px; /* Make it circular */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &.selected {
    background: #ff8c00 !important;
    color: white !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px; /* Make it circular */
  }
`;

const DayContainer = styled.div`
  display: contents;
`;

const StyledCalendar = ({ selectedDate, setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);

  const [feelings, setFeelings] = useState(() => {
    const daysArray = eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
    const randomFeelings = {};

    daysArray.forEach((day) => {
      if (day < new Date()) {
        const happy = Math.random() * 10;
        const calm = Math.random() * (10 - happy);
        const sad = Math.random() * (10 - happy - calm);
        const nervous = Math.random() * (10 - happy - calm - sad);
        const anger = 10 - happy - calm - sad - nervous;

        // 감정 점수와 색상 객체 배열
        const feelingScores = [
          { name: "happy", score: happy, color: "#FFD89D" }, // Happy
          { name: "calm", score: calm, color: "#9DD6FF" }, // Calm
          { name: "sad", score: sad, color: "#D39CFF" }, // Sad
          { name: "nervous", score: nervous, color: "#C29DFF" }, // Nervous
          { name: "anger", score: anger, color: "#FF9D9D" }, // Anger
        ];

        // 점수를 기준으로 정렬
        feelingScores.sort((a, b) => b.score - a.score);

        // 가장 높은 두 감정 선택
        const predominantFeelings = feelingScores
          .slice(0, 2)
          .map((feeling) => feeling.color); // 두 감정 색상 선택
        randomFeelings[format(day, "yyyy-MM-dd")] = predominantFeelings; // 색상 배열 저장
      }
    });

    return randomFeelings;
  });

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
    console.log("handleDateClick called with:", day);
    console.log("setSelectedDate in handleDateClick:", setSelectedDate);
    setSelectedDate(day);
  };

  const monthNumber = format(currentDate, "M");

  const getGridRowStart = (date) => {
    const startDay = startOfMonth(currentDate).getDay();
    return Math.floor((date.getDate() + startDay - 1) / 7) + 2;
  };

  // 주 수 계산
  const getTotalWeeks = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const startDay = start.getDay(); // 월의 첫 번째 날의 요일
    const totalDays = end.getDate(); // 월의 총 일 수
    const endDay = end.getDay(); // 월의 마지막 날의 요일

    // 주 수 계산
    const totalWeeks = Math.ceil((totalDays + startDay) / 7);
    return totalWeeks > 6 ? 6 : totalWeeks; // 6주 초과하지 않도록
  };

  const totalWeeks = getTotalWeeks();

  return (
    <CalendarContainer>
      <MonthHeader>
        <ArrowButton onClick={handlePreviousMonth}>&lt;</ArrowButton>
        {monthNumber}
        <ArrowButton onClick={handleNextMonth}>&gt;</ArrowButton>
      </MonthHeader>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
        <DayHeader
          key={day}
          style={{ gridColumn: index + 2, gridRow: 1 }}
          isLast={index === 6}
        >
          {day}
        </DayHeader>
      ))}
      {[...Array(totalWeeks)].map((_, weekIndex) => (
        <WeekNumber
          key={weekIndex}
          style={{ gridRow: weekIndex + 2, gridColumn: 1 }}
          isLast={weekIndex === totalWeeks - 1}
        >
          {weekIndex + 1}
        </WeekNumber>
      ))}
      <DayContainer>
        {days.map((day) => (
          <CalendarTile
            key={day}
            onClick={() => handleDateClick(day)}
            className={`${isSameDay(day, new Date()) ? "today" : ""} ${
              isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            style={{
              gridColumn: day.getDay() + 2,
              gridRow: getGridRowStart(day),
            }}
            $feelings={feelings[format(day, "yyyy-MM-dd")]}
          >
            {format(day, "d")}
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
  color: #53b7ff;
  font-weight: 600;
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

export default StyledCalendar;
