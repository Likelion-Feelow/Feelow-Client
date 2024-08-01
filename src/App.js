import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import OnBoardingPage from "./pages/OnBoardingPage";

import TestPage from "./pages/TestPage";

import KakaoCallback from "./components/Login/KakaoCallback";
import MainPage from "./pages/MainPage";
/* Container는 styled-components로 정의된 그리드 레이아웃, 애플리케이션의 기본 구조를 설정, 해당 레이아웃은 Header, Sidebar, Main, Footer를 포함 */

import TimerPage from "./pages/TimerPage";
import LoadingPage from "./pages/LoadingPage";

import GPTPage from "./pages/GPTPage";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/onboarding" element={<OnBoardingPage />} />
          <Route path="/" element={<OnBoardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/kakao" element={<KakaoCallback />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/feedback" element={<GPTPage />} />
        </Routes>
    </Router>
  );
}

export default App;
