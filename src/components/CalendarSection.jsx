    <div>
import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Container for the whole calendar component
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr;
  grid-template-rows: 1fr 5fr;
  border: 5px solid #3893FF;
  border-radius: 20px;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  overflow: hidden; /* Ensure content stays within the rounded border */
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
  border-top-left-radius: 15px; /* Rounded corners */
`;

// Arrow button for changing months
const ArrowButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

// Sidebar for the weeks
const WeekSidebar = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background-color: #B1D5FF;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-right: 5px solid #3893FF;
  border-bottom-left-radius: 15px; /* Rounded corners */
`;

// Header for the days of the week
const WeekHeader = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  background-color: #B1D5FF;
  color: white;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-items: center;
  border-bottom: 5px solid #3893FF;
  border-top-right-radius: 15px; /* Rounded corners */
`;

// Main calendar area for the dates
const CalendarArea = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-bottom-right-radius: 15px; /* Rounded corners */

  .react-calendar {
    width: 100%;
    border: none;
  }

  .react-calendar__month-view__days__day {
    color: black;
    background-color: white;
  }

  .react-calendar__tile--now {
    background: #3893FF !important;
    color: white !important;
  }

  .react-calendar__navigation,
  .react-calendar__month-view__weekdays,
  .react-calendar__month-view__weekNumbers {
    display: none;
  }
`;

const StyledCalendar = () => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const handleMonthChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(activeStartDate.getMonth() - 1);
    setActiveStartDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(activeStartDate.getMonth() + 1);
    setActiveStartDate(newDate);
  };

  const monthNumber = activeStartDate.getMonth() + 1;

  return (
    <CalendarContainer>
      <MonthHeader>
        <ArrowButton onClick={handlePreviousMonth}>&lt;</ArrowButton>
        {monthNumber}
        <ArrowButton onClick={handleNextMonth}>&gt;</ArrowButton>
      </MonthHeader>
      <WeekSidebar>
        {['1', '2', '3', '4', '5'].map(week => (
          <div key={week}>{week}</div>
        ))}
      </WeekSidebar>
      <WeekHeader>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </WeekHeader>
      <CalendarArea>
        <Calendar
          onActiveStartDateChange={handleMonthChange}
          activeStartDate={activeStartDate}
          showNeighboringMonth={false}
          formatShortWeekday={() => ''}
          locale="en-US"
        />
      </CalendarArea>
    </CalendarContainer>
  );
};

const CalendarSection = () => {
  return (
    <div className="App">
      <StyledCalendar />
    </div>
  );
};

export default CalendarSection;