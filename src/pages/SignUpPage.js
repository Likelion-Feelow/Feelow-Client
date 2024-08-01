import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
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
      } else {
        console.log()
        setMessage('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      setMessage('문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>
            닉네임:
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpPage;
