// ./styles/AppStyle.js

import styled from "styled-components";

export const Container = styled.div`
    display: grid;

    grid-template-areas:
    'header header'
    'main sidebar';

    grid-template-rows: 5vh 1fr;
    grid-template-columns: 3fr 1fr;

    height: 100vh;
`;