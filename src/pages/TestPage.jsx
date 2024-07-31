import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import EmotionImg from '../images/EmotionPlus.png';

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 4fr;
    grid-template-areas:
    'header'
    'question'
    'main';
    border: 5px solid #3893FF;
    border-radius: 20px;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    height: 60vh;
    width: 60vw;
`;

const slideDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const EmotionContainer = styled.div`
    grid-area: main;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin: 0 1vw;
    gap: 1vw;
    animation: ${slideDown} 1s ease-in;
`;

const Header = styled.div`
    grid-area: header;
    width: 100%;
    height: 100%;
    display: flex;
`;

const Logo = styled.img`
    height: 11vh;
    width: 14vw;
    margin-right: 20px;
`;

const QuestionContainer = styled.div`
    grid-area: question;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 0 2vw;
`;

const Question = styled.div`
    font-size: 2vw;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
`;

const EmotionBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1vw;
    border-radius: 15px;
    background-color: #ffffff;
    overflow: hidden;
`;

const growShrink = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const animatedStyle = css`
    animation: ${growShrink} 0.3s ease-in-out;
`;

const MainEmotionButton = styled.button`
    font-size: 1.8vw;
    font-weight: bold;
    margin-bottom: 1vw;
    color: ${props => (props.active && !props.subActive ? props.bgColor : '#000')};
    background-color: ${props => (props.active && !props.subActive ? '#ffffff' : props.bgColor)};
    border: none;
    border-radius: 30px;
    padding: 0.7vw;
    width: 90%;
    height: 20%;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: ${props => !props.active && `darken(${props.bgColor}, 10%)`};
    }
    ${props => props.active && animatedStyle}
`;

const SubEmotionList = styled.div`
    overflow-y: auto;
    height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scroll-behavior: smooth; /* Smooth scroll */
    transition: height 0.5s ease-in-out;
    ${props => props.active && css`
        height: 29vh;
        animation: ${slideUp} 0.5s ease-in;
    `}
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* Chrome/Safari/Webkit */
    }
`;

const SubEmotionButton = styled.button`
    background-color: ${props => (props.active ? '#ffffff' : props.subColor)};
    color: ${props => (props.active ? props.bgColor : '#000')};
    border: 3px solid ${props => props.bgColor};
    border-radius: 30px;
    padding: 0.5vw;
    margin: 0.5vw 0;
    width: 70%;
    height: 10vh;
    cursor: pointer;
    font-size: 1.6vw;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: ${props => !props.active && `darken(${props.bgColor}, 10%)`};
    }
    ${props => props.active && animatedStyle}
`;

const ConfirmButton = styled.button`
    background-color: #3893FF;
    color: white;
    font-size: 1.8vw;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    padding: 1vw;
    margin-left: 2vw;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #2869B8;
    }
`;

const emotions = [
    { main: '긍정', sub: ['행복', '기쁨', '만족', '감사', '희망', '자신감', '흥미', '열정', '자부심', '안심'], bgColor: '#FFE600', subColor: '#FFF9C6' },
    { main: '평온', sub: ['안정', '편안', '고요', '차분', '여유', '온화', '따뜻함', '수용', '조화', '균형'], bgColor: '#FFBEFC', subColor: '#FFD7FD' },
    { main: '우울', sub: ['슬픔', '절망', '침울', '낙담', '눈물', '후회', '무기력', '고독', '상실', '비관'], bgColor: '#3893FF', subColor: '#8BB3FF' },
    { main: '불안', sub: ['걱정', '초조', '긴장', '두려움', '공포', '당황', '염려', '불편', '근심', '불확실'], bgColor: '#D39CFF', subColor: '#E5C5FF' },
    { main: '분노', sub: ['화남', '짜증', '격노', '불쾌', '원망', '성남', '분개', '빡침', '울분', '분통'], bgColor: '#FF6F6F', subColor: '#FF9292' },
];

const EmotionSelection = ({ onEmotionSelect }) => {
    const [activeEmotion, setActiveEmotion] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState('');

    const handleMainEmotionClick = (emotion) => {
        if (activeEmotion === emotion) {
            setActiveEmotion('');
            setSelectedEmotion('');
        } else {
            setActiveEmotion(emotion);
            setSelectedEmotion(emotion);
        }
    };

    const handleSubEmotionClick = (subEmotion) => {
        if (selectedEmotion === subEmotion) {
            setSelectedEmotion('');
        } else {
            setSelectedEmotion(subEmotion);
        }
    };

    const handleConfirmClick = () => {
        console.log(`Confirmed Emotion: ${selectedEmotion}`);
        if (onEmotionSelect) {
            onEmotionSelect(selectedEmotion);
        }
    };

    return (
        <Container>
            <Header>
                <Logo src={EmotionImg} alt="Logo" />
            </Header>
            
            <QuestionContainer>
                <Question>
                    현재의 감정은 어떤가요?
                </Question>
                <ConfirmButton onClick={handleConfirmClick}>
                    확정
                </ConfirmButton>
            </QuestionContainer>

            <EmotionContainer>
                {emotions.map((emotion, index) => (
                    <EmotionBlock key={index}>
                        <MainEmotionButton
                            bgColor={emotion.bgColor}
                            onClick={() => handleMainEmotionClick(emotion.main)}
                            active={activeEmotion === emotion.main}
                            subActive={selectedEmotion && emotion.sub.includes(selectedEmotion)}
                        >
                            {emotion.main}
                        </MainEmotionButton>
                        <SubEmotionList active={activeEmotion === emotion.main}>
                            {emotion.sub.map((subEmotion, subIndex) => (
                                <SubEmotionButton
                                    key={subIndex}
                                    bgColor={emotion.bgColor}
                                    subColor={emotion.subColor}
                                    onClick={() => handleSubEmotionClick(subEmotion)}
                                    active={selectedEmotion === subEmotion}
                                >
                                    {subEmotion}
                                </SubEmotionButton>
                            ))}
                        </SubEmotionList>
                    </EmotionBlock>
                ))}
            </EmotionContainer>
        </Container>
    );
}

export default EmotionSelection;