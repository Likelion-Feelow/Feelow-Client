import styled from 'styled-components';

const KakaoLogin = styled.button`
  margin-top: 10vh;
  color: #3893FF;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const KakaoLoginButton = () => {
  const Rest_api_key = process.env.REACT_APP_KAKAO_API_KEY; //REST API KEY
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI; // Redirect URI

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  }
  
  return (
    <>
      <KakaoLogin onClick={handleLogin}>Kakao로 로그인하기</KakaoLogin>
    </>
  )
};

export default KakaoLoginButton;