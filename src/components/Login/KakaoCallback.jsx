import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        try {
          // 인가 코드(code)를 서버로 전송하여 로그인 시도
          const response = await axios.post(
            "http://3.39.201.42:8090/auths/kakao/login",
            { access_code: code }
          );

          if (response.status === 200) {
            const { access_token: accessToken, refresh_token: refreshToken } = response.data;
            localStorage.setItem("access_token", accessToken);
            
            // refresh token이 존재하는지 확인
            if (refreshToken) {
              localStorage.setItem("refresh_token", refreshToken);
            } else {
              console.warn("Refresh token is missing in the response");
            }

            navigate("/main");
          }
        } catch (error) {
          console.error("Login Error: ", error);

          if (error.response) {
            // 서버 응답이 있는 경우
            console.error("Error Response:", error.response);
            alert(`Login Error: ${error.response.status} - ${error.response.data.error}`);
            
            // 사용자가 존재하지 않는 경우
            if (error.response.status === 404 && error.response.data.error === "User is not registered. Please register first.") {
              const accessToken = error.response.data.access_token;
              const nickname = error.response.data.nickname;
              try {
                // 회원가입 시도
                const response = await axios.post(
                  "http://3.39.201.42:8090/auths/kakao/register",
                  { access_token: accessToken, nickname: nickname }
                );

                if (response.status === 200) {
                  const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;
                  localStorage.setItem("access_token", newAccessToken);

                  // refresh token이 존재하는지 확인
                  if (newRefreshToken) {
                    localStorage.setItem("refresh_token", newRefreshToken);
                  } else {
                    console.warn("Refresh token is missing in the registration response");
                  }

                  navigate("/");
                }
              } catch (registerError) {
                console.error("Registration Error: ", registerError);
                alert(`Registration Error: ${registerError.response?.status} - ${registerError.response?.data?.message}`);
              }
            } else {
              console.error("Unexpected Error: ", error.response);
              alert(`Unexpected Error: ${error.response.status} - ${error.response.data.error}`);
            }
          } else {
            // 네트워크 에러 등
            console.error("Network Error:", error);
            alert(`Network Error: ${error.message}`);
          }
        }
      }
    };

    fetchData();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default KakaoCallback;