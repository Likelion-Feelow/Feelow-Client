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
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      // 백엔드 서버에 로그아웃 요청
      await axios.post(
        "/auths/logout",
        {
          refresh_token: refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 클라이언트 측 상태 초기화 및 로컬 스토리지 정리
      localStorage.removeItem("access_token"); // 저장된 액세스 토큰 삭제
      localStorage.removeItem("refresh_token"); // 저장된 리프레시 토큰 삭제

      // 카카오 로그아웃
      const Rest_api_key = process.env.REACT_APP_KAKAO_API_KEY; // 카카오 개발자 콘솔에서 발급받은 앱 키
      const logoutRedirectUri="http://localhost:3000/onboarding"
      // const logoutRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI; // 로그아웃 후 리디렉션될 URI
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${Rest_api_key}&logout_redirect_uri=${encodeURIComponent(logoutRedirectUri)}`;

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
