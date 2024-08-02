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
          // 로그인 성공
          if (response.status === 200) {
            const { access_token: accessToken, refresh_token: refreshToken } =
              response.data;
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            navigate("/main");
          }
        } catch (error) {
          // 로그인 에러 해결 절차
          console.error("Login Error: ", error);
          // 사용자가 존재하지 않는 경우
          if (error.response && error.response.status === 404) {
            const accessToken = error.response.data.access_token;
            try {
              // 회원가입 시도
              const response = await axios.post(
                "http://3.39.201.42:8090/auths/kakao/register",
                { access_token: accessToken }
              );

              if (response.status === 200) {
                const {
                  access_token: newAccessToken,
                  refresh_token: newRefreshToken,
                } = response.data;
                localStorage.setItem("access_token", newAccessToken);
                localStorage.setItem("refresh_token", newRefreshToken);
                navigate("/main");
              }
            } catch (registerError) {
              console.error("Registration Error: ", registerError);
              alert("회원가입에 실패하였습니다.");
            }
          } else if (error.response && error.response.status === 400) {
            console.error("Bad Request: ", error.response.data);
            alert("잘못된 요청입니다. 요청 데이터를 확인하세요.");
          } else {
            console.error("Unexpected Error: ", error);
            alert("사용자 인증이 실패하였습니다.");
          }
        }
      }
    };

    fetchData();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default KakaoCallback;