// ./components/Header.js
import styled from "styled-components";
import React from "react";


const HeaderContainer = styled.header`
    grid-area: header;
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3893FF;
`;

const Header = () => {
    return <HeaderContainer></HeaderContainer>;
};

export default Header;