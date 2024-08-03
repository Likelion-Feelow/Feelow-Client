import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../images/Logo.png'; // Adjust the import path as needed

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  font-family: Helvetica, Arial, sans-serif;
`;

const SignUpImage = styled.img`
  width: 40vw;
  margin-bottom: 3vw;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  width: 30vw;
`;

const InputText = styled.div`
  font-size: 2vw;
  margin-right: 1.5vw;
  width: 8vw;
  color: #3893ff;
  font-weight: bold;
  text-align: right;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 2vw;
  font-size: 1.5vw;
  background-color: #3893ff;
  color: white;
  flex: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: 23vw;
  margin-top: 3vw;
`;

const Button = styled.button`
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

const Message = styled.p`
  margin-top: 20px;
  font-size: 1.5vw;
  color: #ff0000;
`;

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: name.trim(),
      age: age.trim(),
      job: job.trim(),
      nickname: nickname.trim(),
      password: password.trim(),
    };

    try {
      const response = await axios.post('http://3.39.201.42:8090/auths/register', requestBody);
      if (response.status === 201) {
        setMessage(`사용자 ${response.data.nickname}가 성공적으로 등록되었습니다!`);
      } else {
        setMessage('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      setMessage('문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Container>
      <SignUpImage src={Logo} alt="Sign Up" />

      <InputContainer>
        <InputText>이름</InputText>
        <InputField 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </InputContainer>

      <InputContainer>
        <InputText>나이</InputText>
        <InputField 
          type="text" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
        />
      </InputContainer>

      <InputContainer>
        <InputText>직업</InputText>
        <InputField 
          type="text" 
          value={job} 
          onChange={(e) => setJob(e.target.value)} 
          required 
        />
      </InputContainer>

      <InputContainer>
        <InputText>닉네임</InputText>
        <InputField 
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          required 
        />
      </InputContainer>

      <InputContainer>
        <InputText>비밀번호</InputText>
        <InputField 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </InputContainer>

      <ButtonRow>
        <Button onClick={handleSignUp}>회원가입</Button>
      </ButtonRow>

      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default SignUpPage;