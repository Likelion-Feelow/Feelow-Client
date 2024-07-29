import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// const TodoList = ({ selectedDate }) => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!selectedDate) return;

//     const fetchTasks = async () => {
//       setLoading(true);
//       const year = selectedDate.getFullYear();
//       const month = selectedDate.getMonth() + 1; // JavaScript에서 month는 0부터 시작
//       const day = selectedDate.getDate();
//       const accessToken = localStorage.getItem("accessToken");

//       if (!accessToken) {
//         console.error("No access token found");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`/tasks/${year}/${month}/${day}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setTasks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [selectedDate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Tasks for {selectedDate.toDateString()}</h2>
//       <ul>
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <li key={task.id}>
//               <h3>{task.task_name}</h3>
//               <p>{task.task_description}</p>
//               <p>Predicted time: {task.predict_time} minutes</p>
//               <p>User ID: {task.user_id}</p>
//               <p>Date: {task.date}</p>
//             </li>
//           ))
//         ) : (
//           <p>No tasks for this day.</p>
//         )}
//       </ul>
//     </div>
//   );
// };
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // 가상의 데이터를 설정합니다.
    const fetchTasks = async () => {
      setLoading(true);
      const fakeData = [
        {
          id: 1,
          task_name: "Buy groceries",
          task_description: "Buy milk, eggs, and bread",
          predict_time: 30,
          user_id: 101,
          date: "8월1일",
        },
        {
          id: 2,
          task_name: "Workout",
          task_description: "1-hour cardio session",
          predict_time: 60,
          user_id: 102,
          date: "8월1일",
        },
        {
          id: 3,
          task_name: "Read a book",
          task_description: "Read 50 pages of 'The Great Gatsby'",
          predict_time: 90,
          user_id: 103,
          date: "8월1일",
        },
      ];

      // 비동기 함수에서의 delay를 시뮬레이션하기 위해 setTimeout 사용
      setTimeout(() => {
        setTasks(fakeData); // fakeData를 setTasks에 전달
        setLoading(false);
      }, 1000); // 1초 후에 가상 데이터를 설정
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TaskList>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task.id}>
              <TaskIcon />
              <TaskDetails>
                <h3>{task.task_name}</h3>
              </TaskDetails>
            </TaskItem>
          ))
        ) : (
          <p>No tasks for this day.</p>
        )}
      </TaskList>
    </div>
  );
};

export default TodoList;

// Styled-components
const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: #4285f4; /* 원형 아이콘의 색상 */
  border-radius: 50%;
`;

const TaskDetails = styled.div`
  flex-grow: 1;

  h3 {
    margin: 0;
    font-size: 16px;
    color: #000;
  }

  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #666;
  }
`;