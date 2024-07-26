import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-areas:
    'header header header'
    'main main sidebar'
    'footer footer footer';
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100vh;
`;

export const Header = styled.header`
    grid-area: header;
    background: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Sidebar = styled.aside`
    grid-area: sidebar;
    background: #f4f4f4;
    padding: 20px;
`;

export const Main = styled.main`
    grid-area: main;
    padding: 20px;
    background: #fff;
`;

export const Footer = styled.footer`
    grid-area: footer;
    background: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;