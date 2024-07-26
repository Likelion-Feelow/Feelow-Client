// ./styles/AppStyle.js

import styled from "styled-components";

export const Container = styled.div`
    display: grid;

    grid-template-areas:
    'header header header'
    'main main sidebar';

    grid-template-rows: 80px 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    height: 100vh;
`;