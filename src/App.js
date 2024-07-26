// ./App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

import LoginPage from "./pages/LoginPage";
import OnBoardingPage from "./pages/OnBoardingPage";

import { Container } from "./styles/AppStyle";
 /* Container는 styled-components로 정의된 그리드 레이아웃, 애플리케이션의 기본 구조를 설정, 해당 레이아웃은 Header, Sidebar, Main, Footer를 포함 */ 

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/onboarding" element={<OnBoardingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Container>

        { /* Header와 Sidebar는 모든 페이지에서 공통으로 사용되는 컴포넌트로, Container 내에서 고정된 위치에 렌더링 */ }
        <Header />
        <Sidebar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
        </Routes>

      </Container>
    </Router>
  );
}

export default App;