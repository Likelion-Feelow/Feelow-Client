// MainPage.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Main from "../components/Main/Main";
import Sidebar from "../components/Main/Sidebar";
import api from "../api"; // 설정된 Axios 인스턴스 임포트
import EmotionSelection from "../components/Emotion/StartEmotionSelection"; // 추가
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [view, setView] = useState("calendar");
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null); // 추가: 선택된 작업 상태
  const [currentStep, setCurrentStep] = useState("calendar");
  // const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedStartEmotion, setSelectedStartEmotion] = useState("");
  const [selectedEndEmotion, setSelectedEndEmotion] = useState("");


  const navigate = useNavigate();

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setView("startEmotion"); // 선택된 작업이 있을 때 emotion 화면으로 전환
  };

  const handleStartEmotionSelect = async (selectedEmotion) => {
    if (selectedTask) {
      const updatedTask = { ...selectedTask, current_emotion: selectedEmotion };
  
      // 업데이트된 작업을 로컬 상태에 저장
      setSelectedTask(updatedTask);
      setTasks(
        tasks.map((task) => (task.task_id === updatedTask.task_id ? updatedTask : task))
      );
      console.log("Task after start emotion select:", updatedTask);
  
      // Local Storage에서 access_token 추출
      const accessToken = localStorage.getItem("access_token");
  
      // 서버에 PATCH 요청 보내기
      try {
        console.log("Sending PATCH request for task ID:", updatedTask.task_id); // 추가된 로그
        const response = await api.patch(
          `/tasks/${updatedTask.task_id}`,
          {
            current_emotion: selectedEmotion,
            changed_emotion: selectedEmotion, ////////////////////
            focus_time: 0,
            break_time: 0
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
  
        console.log("Server response:", response.data);
      } catch (error) {
        console.error("Error updating start emotion:", error);
      }
  
      setSelectedStartEmotion(selectedEmotion);
      setCurrentStep("evaluating");
    } else {
      console.error("selectedTask is not defined"); // 추가된 로그
    }
  };

  useEffect(() => {
    console.log("Selected Task:", selectedTask); // 추가된 로그
  }, [selectedTask]);





  // const handleEndEmotionSelect = async (selectedEmotion) => {
  //   if (selectedTask) {
  //     const updatedTask = { ...selectedTask, changed_emotion: selectedEmotion };
  
  //     // 업데이트된 작업을 로컬 상태에 저장
  //     setSelectedTask(updatedTask);
  //     setTasks(tasks.map((task) => (task.task_id === updatedTask.task_id ? updatedTask : task)));
  //     console.log("Task after end emotion select:", updatedTask);
  
  //     // Local Storage에서 access_token 추출
  //     let accessToken = localStorage.getItem("access_token");
  
  //     // 서버에 PATCH 요청 보내기
  //     try {
  //       const response = await api.patch(
  //         `/tasks/${updatedTask.task_id}`,
  //         {
  //           current_emotion: selectedEmotion
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`
  //           }
  //         }
  //       );
  
  //       console.log("Server response:", response.data);
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         try {
  //           const refreshToken = localStorage.getItem('refresh_token');
  //           const refreshResponse = await api.post('/api/token/refresh/', { refresh: refreshToken });
  
  //           const newAccessToken = refreshResponse.data.access;
  //           localStorage.setItem('access_token', newAccessToken);
  
  //           // Update the Authorization header for the api instance
  //           api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  
  //           // Retry the original request with the new access token
  //           const retryResponse = await api.patch(
  //             `/tasks/${updatedTask.task_id}`,
  //             {
  //               current_emotion: selectedEmotion
  //             },
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${newAccessToken}`
  //               }
  //             }
  //           );
  
  //           console.log("Retry server response:", retryResponse.data);
  //         } catch (refreshError) {
  //           console.error('Error refreshing token:', refreshError);
  //           // Handle token refresh error, e.g., navigate to login page
  //           navigate('/login');
  //         }
  //       } else {
  //         console.error("Error updating end emotion:", error);
  //       }
  //     }
  
  //     setSelectedEndEmotion(selectedEmotion);
  //   } else {
  //     console.error("selectedTask is not defined");
  //   }
  // };




  return (
    <Container>
      <Main
        view={view}
        setView={setView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        addTask={addTask}
        tasks={tasks}
        handleTaskSelect={handleTaskSelect} // 추가: 작업 선택 핸들러 전달
        selectedTask={selectedTask} // 추가: 선택된 작업 전달
        handleStartEmotionSelect={handleStartEmotionSelect}
        // handleEndEmotionSelect={handleEndEmotionSelect}
      />
      <Sidebar
        selectedDate={selectedDate}
        onAddTodoClick={() => setView("add")}
        tasks={tasks}
        setTasks={setTasks}
        handleTaskSelect={handleTaskSelect} // 추가: 작업 선택 핸들러 전달
        selectedTask={selectedTask} // 추가: 선택된 작업 전달
      />
    </Container>
  );
}

export default MainPage;

const Container = styled.div`
  display: grid;
  grid-template-areas: "main sidebar";
  grid-template-columns: 3fr 1fr;
  height: 100vh;
  width: 100%;
`;