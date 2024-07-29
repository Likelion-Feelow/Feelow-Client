import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';



const StyledCalender = styled(Calendar)`
.react-calendar__navigation {
    background: ${({ theme }) => theme.color.pink};
    border-bottom: 4px solid ${({ theme }) => theme.color.brown};
    height: 90px;
    border-radius: 20px 20px 0 0;

    span {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.color.brown};
    }
  }

  .react-calendar__navigation button:disabled {
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 20px 20px 0 0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 20px 20px 0 0;
  }
`;


const CalendarSection = () => {
    const curDate = new Date(); // 현재 날짜
    const [value, onChange] = useState(curDate); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)
    const activeDate = moment(value).format('YYYY-MM-DD'); // 클릭한 날짜 (년-월-일))

    const monthOfActiveDate = moment(value).format('YYYY-MM');
    const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

    const getActiveMonth = (activeStartDate: moment.MomentInput) => {
    const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
    setActiveMonth(newActiveMonth);
  };

    return (
    <div>
         <StyledCalender
            locale="en"
            onChange={onChange}
            value={value}
            next2Label={null}
            prev2Label={null}
            formatDay={(locale, date) => moment(date).format('D')}

            

            showNeighboringMonth={false}
            onActiveStartDateChange={({ activeStartDate }) =>
              getActiveMonth(activeStartDate)
            }
          />
    </div>
    );
}

export default CalendarSection;