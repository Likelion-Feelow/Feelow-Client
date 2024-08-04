import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../images/Logo.png";
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
`;

const LoginImage = styled.img`
  width: 40vw;
  margin-bottom: 3vw;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 30vw;
  position: relative;
`;

const InputText = styled.div`
  font-size: 2.5vw;
  color: #3893ff;
  font-weight: bold;
  position: absolute;
  left: 0;
  width: 7vw;
  text-align: right;
`;

const InputField = styled.input`
  padding: 1vw;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 3vh;
  font-size: 1.5vw;
  background-color: #3893ff;
  color: white;
  flex: 1;
  margin-left: 8vw; /* Adjust this value if needed */
  text-align: left;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 23vw;
  margin-top: 4vw;
`;

const Button = styled.button`
  padding: 1.5vh 2vw;
  background-color: #3893ff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 2vw;
  font-weight: bold;
  
  &:hover {
    background-color: #2d72cc;
  }
`;

const Button2 = styled.button`
  padding: 1vh 2vw;
  background-color: #3893ff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 2vw;
  font-weight: bold;

  &:hover {
    background-color: #2d72cc;
  }
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
      if (error.response && error.response.status === 404) {
        alert('로그인 실패: 회원가입을 해주세요!')
      } else {
        console.error('로그인 중 오류 발생:', error);
        alert('로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
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
      {/* <KakaoLoginButton /> */}
    </Container>
  );
};

export default LoginPage;