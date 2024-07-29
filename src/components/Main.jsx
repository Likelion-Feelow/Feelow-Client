import React, { useState } from 'react';


import styled from 'styled-components';
import profile from '../images/profile.png';
import logo from '../images/Logo.png';
import CalendarSection from "./Calendar";

import { ThemeProvider } from 'styled-components';
import { theme } from './theme';




const Container = styled.div`
  display: grid;
  grid-template-areas:
    'profile logo'
    'calendar calendar';
  grid-template-columns: 1fr 11fr;
  grid-template-rows: 1fr 8fr;
  
  width: 100%;
  height: 100%; /* 높이를 뷰포트 높이에 맞게 설정 */
`;

const ProfileButton = styled.button`
  grid-area: profile;
  background: url(${profile}) no-repeat center center;
  background-size: cover;
  border: none;
  height: 100%;
  width: 100%;
  align-self: center;
  justify-self: center;


  
`;

const Logo = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${logo}) no-repeat center center;
  background-size: contain;

  height: 100%;
  width: 100%;
`;



const Main = () => {



  return (
    <Container>
      <ProfileButton />
      <Logo />
      

      <ThemeProvider theme={theme}>
        <CalendarSection />
      </ThemeProvider>

      
    </Container>
  );
};

export default Main;