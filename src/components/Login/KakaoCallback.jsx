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
          await handleLogin(code);
        } catch (error) {
          console.error("Error during authentication: ", error);
          // console.log(error.response.status)
          if (error.response && error.response.status === 404) {
            // 로그인 실패 후 회원가입 시도
            const { access_token: accessToken } = error.response.data;
            try {
              await handleRegister(accessToken);
            } catch (registerError) {
              console.error("Registration Error: ", registerError);
              alert("사용자 인증이 실패하였습니다.");
            }
          } 
          else {
            alert("사용자 인증이 실패하였습니다.");
          }
        }
      }
    };

    const handleLogin = async (code) => {
      const response = await axios.post(
        "http://3.39.201.42:8090/auths/kakao/login",
        { access_code: code }
      );
      processResponse(response);
    };

    const handleRegister = async (accessToken) => {
      const response = await axios.post(
        "http://3.39.201.42:8090/auths/register",
        { access_token: accessToken }
      );
      processResponse(response);
    };

    const processResponse = (response) => {
      if (response.status === 200) {
        console.log(response.data);
        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        navigate("/main");
      } else {
        throw new Error("Invalid response status");
      }
    };

    fetchData();
  }, [navigate]); // 두번 post 요청 보내게되면 의존성배열을 빈 배열로 설정해보기

  return <></>;
};

export default KakaoCallback;
