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
import api from "../../api"; // 설정된 Axios 인스턴스 임포트

// 감정별 색상 매핑
const emotionColors = {
  "긍정": "#FFD89D",
  "평온": "#9DD6FF",
  "우울": "#D39CFF",
  "불안": "#C29DFF",
  "분노": "#FF9D9D",
};

// Container for the whole calendar component
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(7, 1fr);
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  width: 100%;
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
  margin: 0.4vw 2vw;
  padding: 1.3vw 1.3vw;
  font-size: 2vw;
  color: black;
  background: ${({ $feelingColor }) => $feelingColor || "white"};
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
  const [feelings, setFeelings] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchEmotionData = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      try {
        const response = await api.get(`/calendar/?year=${year}&month=${month}`);
        console.log('Fetched calendar data:', response.data);

        const emotionData = response.data.calendars.reduce((acc, day) => {
          acc[day.date] = emotionColors[day.superior_emotion] || null;
          return acc;
        }, {});

        setFeelings(emotionData);
      } catch (error) {
        console.error("Error fetching emotion data:", error);
      }
    };

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const daysArray = eachDayOfInterval({ start, end });
    setDays(daysArray);

    fetchEmotionData();
  }, [currentDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = async (day) => {
    setSelectedDate(day);
    const formattedDate = format(day, "yyyy-MM-dd");
  
    try {
      // Fetch calendar data for the selected month
      const calendarResponse = await api.get(`/calendar/?year=${day.getFullYear()}&month=${day.getMonth() + 1}`);
      
      // Log the full response from the calendar API for debugging
      console.log('Calendar API Response:', calendarResponse);
  
      const { calendars, today_tasks } = calendarResponse.data;
  
      // Log the calendars array
      console.log('Calendars:', calendars);
  
      // Log the today_tasks array
      console.log('Today Tasks:', today_tasks);
  
      // Find the specific day's data in the calendars response
      const dayData = calendars.find(d => d.date === formattedDate);
      console.log('Superior Emotion:', dayData?.superior_emotion);
  
      setTasks(today_tasks);
  
    } catch (error) {
      console.error(`Error fetching data for ${formattedDate}:`, error);
    }
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
    const startDay = start.getDay();
    const totalDays = end.getDate();
    const endDay = end.getDay();

    const totalWeeks = Math.ceil((totalDays + startDay) / 7);
    return totalWeeks > 6 ? 6 : totalWeeks;
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
            $feelingColor={feelings[format(day, "yyyy-MM-dd")]}
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
  color: white;
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