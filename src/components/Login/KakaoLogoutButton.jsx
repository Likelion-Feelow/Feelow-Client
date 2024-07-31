import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoLogout = styled.button`
  margin-top: 10vh;
  color: #3893ff;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const KakaoLogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 백엔드 서버에 로그아웃 요청
      await axios.post("/auths/logout");

      // 클라이언트 측 상태 초기화 및 로컬 스토리지 정리
      localStorage.removeItem("access_token"); // 저장된 액세스 토큰 삭제
      localStorage.removeItem("refresh_token"); // 저장된 리프레시 토큰 삭제

      // 카카오 로그아웃
      window.location.href =
        "https://kauth.kakao.com/oauth/logout?client_id=YOUR_APP_KEY&logout_redirect_uri=YOUR_REDIRECT_URI";

      // 홈 페이지로 리디렉션
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      alert("로그아웃에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <KakaoLogout onClick={handleLogout}>로그아웃</KakaoLogout>
    </>
  );
};

export default KakaoLogoutButton;
