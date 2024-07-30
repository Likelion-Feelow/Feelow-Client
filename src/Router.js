import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnBoardingPage from "./pages/OnBoardingPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SchedulePage from "./pages/SchedulePage";
import ProfilePage from "./pages/ProfilePage";

import TestPage from "./pages/TestPage";
import LoadingPage from "./pages/LoadingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoardingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/main/schedule" element={<SchedulePage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>


        <Route path="/test" element={<TestPage />}></Route>
        <Route path="/load" element={<LoadingPage />}></Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
