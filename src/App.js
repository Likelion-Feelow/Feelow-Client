import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import TestPage from "./pages/TestPage";
import KakaoCallback from "./components/Login/KakaoCallback";
import MainPage from "./pages/MainPage";
import TimerPage from "./pages/TimerPage";
import LoadingPage from "./pages/LoadingPage";
import GPTPage from "./pages/GPTPage";
import AboutPage from "./pages/AboutPage";

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
          <Route path="/about" element={<AboutPage />} />
        </Routes>
    </Router>
  );
}

export default App;
