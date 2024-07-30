import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;

    

    grid-template-columns: 1fr 1fr 1fr;
    grid-area: emotion;

    border: 5px solid #3893FF;
    border-radius: 20px;


    font-family: Helvetica, sans-serif;
    font-weight: bold;


    height: 75vh;
    width: 60vw;

    

`;

const EmotionSelection = () => {
    

    return (
        <Container>
            test
        </Container>
    );
}

export default EmotionSelection;