import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../images/Logo.png";
import KakaoLoginButton from "../components/Login/KakaoLoginButton";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  font-family: Helvetica, Arial, sans-serif;
  padding: 20px; /* 모바일 뷰에서의 패딩 추가 */
`;

const LoginImage = styled.img`
  width: 50vw;
  max-width: 400px; /* 최대 너비 설정 */
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  width: 40vw;
  max-width: 500px; /* 최대 너비 설정 */
`;

const InputText = styled.div`
  font-size: 1.5vw;
  margin-right: 3vw;
  width: 5vw;
  color: #3893ff;
  font-weight: bold;
  
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 3vh;
  font-size: 16px;
  background-color: #3893ff;
  color: white;
  flex: 1;
  min-width: 150px; /* 최소 너비 설정 */
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 23vw;
  max-width: 300px; /* 최대 너비 설정 */
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 1vh 1.5vw;
  background-color: #3893ff;
  color: white;
  border:none;
  
  border-radius: 20px;
  cursor: pointer;
  font-size: 2vw;
  font-weight: bold;
  min-width: 100px; /* 최소 너비 설정 */
`;

const Button2 = styled.button`
  padding: 1vh 1.5vw;
  background-color: #3893ff;
  color: white;
  border: none;
  
  
  border-radius: 20px;
  cursor: pointer;
  font-size: 2vw;
  font-weight: bold;
  min-width: 100px; /* 최소 너비 설정 */
`;

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://3.39.201.42:8090/auths/login', {
        nickname,
        password
      });

      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        navigate('/main');
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  return (
    <Container>
      <LoginImage src={Logo} alt="Login" />

      <InputContainer>
        <InputText>ID</InputText>
        <InputField 
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
        />
      </InputContainer>

      <InputContainer>
        <InputText>PW</InputText>
        <InputField 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </InputContainer>

      <ButtonRow>
        <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button2 onClick={handleLogin}>Login</Button2>
      </ButtonRow>

      {/* 카카오 로그인 */}
      <KakaoLoginButton />
    </Container>
  );
};

export default LoginPage;
