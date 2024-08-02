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

export const handleLogout = async (navigate) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    // 백엔드 서버에 로그아웃 요청
    await axios.post(
      "http://3.39.201.42:8090/auths/logout",
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

    // 홈 페이지로 리디렉션
    navigate("/login");
  } catch (error) {
    console.error("Logout failed", error);
    alert("로그아웃에 실패하였습니다. 다시 시도해주세요.");
  }
};

const KakaoLogoutButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <KakaoLogout onClick={() => handleLogout(navigate)}>로그아웃</KakaoLogout>
    </>
  );
};

export default KakaoLogoutButton;
