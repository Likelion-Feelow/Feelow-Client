// ./components/Header.js
import styled from "styled-components";
import React from "react";

import profile from "../images/profile.png";
import logo from "../images/BlueLogo.png";


const HeaderContainer = styled.header`
    grid-area: header;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #3893FF;
    padding: 0 20px;
`;

const Logo = styled.img`
    height: 30px;
`;

const LeftMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ProfileButton = styled.button`
    display: flex;
    flex-direction: row;

    align-items: center;

    background-color: transparent;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;

    font-family: helvetica;
    font-weight: bold;
    font-size: 2vw;
`;

const ProfileName = styled.div`
    font-family: helvetica;
    font-weight: bold;
    font-size: 1vw;

    
`;


const ProfileImage = styled.img`
    height: 6vh;

    margin-top: 5px;
    border-radius: 50%;
    margin-right: 10px;
`;

const HamburgerMenu = styled.button`
    background-color: transparent;
    margin-bottom: 5px;
    
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;


    font-family: helvetica;
    font-weight: bold;
    font-size: 2vw;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Logo src={logo} alt="Logo" />
            <LeftMenu>
                <ProfileButton>
                    <ProfileImage src={profile} alt="Profile" />
                    <ProfileName>홍길동</ProfileName>
                </ProfileButton>
                <HamburgerMenu>&#9776;</HamburgerMenu>
            </LeftMenu>
        </HeaderContainer>
    );
};

export default Header;