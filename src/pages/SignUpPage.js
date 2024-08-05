import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../images/Logo.png'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  font-family: Helvetica, Arial, sans-serif;
`;

const SignUpImage = styled.img`
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
  margin-right: 1.5vw;
  color: #3893ff;
  font-weight: bold;
  position: absolute;
  left: 0;
  width: 7vw;
  text-align: left;
`;

const InputField = styled.input`
  padding: 1vw;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 2vw;
  font-size: 1.5vw;
  background-color: rgb(230, 237, 254);
  color: black;
  flex: 1;
  margin-left: 6vw; /* Adjust this value if needed */
  text-align: left;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
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

const Message = styled.p`
  margin-top: 20px;
  font-size: 1.5vw;
  color: #ff0000;
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    const requestBody = {
      nickname: nickname.trim(),
      password: password.trim(),
    };

    try {
      const response = await axios.post('http://3.39.201.42:8090/auths/register', requestBody);
      if (response.status === 201) {
        setMessage(`사용자 ${response.data.nickname}가 성공적으로 등록되었습니다!`);
        alert(message);
        navigate('/login');
      } else {
        setMessage('회원가입에 실패했습니다. 다시 시도해 주세요.');
        alert(message);
      }
    } catch (error) {
      console.error('에러 발생:', error);
      setMessage('문제가 발생했습니다. 다시 시도해 주세요.');
      alert(message);
    }
  };

  return (
    <Container>
      <SignUpImage src={Logo} alt="Sign Up" />

      <InputContainer>
        <InputText>ID</InputText>
        <InputField 
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          required 
        />
      </InputContainer>

      <InputContainer>
        <InputText>PW</InputText>
        <InputField 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </InputContainer>

      <ButtonRow>
        <Button onClick={handleSignUp}>Submit</Button>
      </ButtonRow>

      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default SignUpPage;