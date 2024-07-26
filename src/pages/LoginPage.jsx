import React from 'react';
import styled from 'styled-components';
import Logo from '../images/Logo.png';

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
  width: 50vw;
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  width: 40vw
`;

const InputText = styled.div`
  font-size: 4vw;
  margin-right: 3vw;
  width: 5vw;
  color: #3893FF;
  font-weight: bold;
  text-align: right;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 3vh;
  font-size: 16px;
  background-color: #3893FF;
  color: white;
  flex: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 23vw;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 1vh 1.5vw;
  background-color: white;
  color: #3893FF;
  border-style: solid;
  border-color: #3893FF;
  border-width: 3px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 2vw;
  font-weight: bold;
`;

const KakaoLogin = styled.a`
  margin-top: 10vh;
  color: #3893FF;
  text-decoration: none;
  font-size: 16px;
`;

const LoginPage = () => {
  return (
    <Container>
      <LoginImage src={Logo} alt="Login" />
      
      <InputContainer>
        <InputText>ID</InputText>
        <InputField id="id" type="text"/>
      </InputContainer>

      <InputContainer>
        <InputText>PW</InputText>
        <InputField id="pw" type="password"/>
      </InputContainer>

      <ButtonRow>
        <Button>Sign Up</Button>
        <Button>Login</Button>
      </ButtonRow>

      <KakaoLogin href="#">Kakao로 로그인하기</KakaoLogin>
    </Container>
  );
};

export default LoginPage;