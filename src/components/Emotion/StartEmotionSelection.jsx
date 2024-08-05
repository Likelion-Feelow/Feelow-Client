import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 5fr;
    grid-template-areas:
    'header'
    'question'
    'main';
    
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    height: 75vh;
    width: 65vw;
    background-color: #A8E0FF;
    padding: 1vw;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-20px);
    }
    60% {
        transform: translateY(-10px);
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

const HeaderTitle = styled.div`
    font-size: 2vw;
    font-weight: bold;
    display: flex;
    font-family: Helvetica, sans-serif;
    color: white;
    margin-top: 3vh;
    margin-left: 2vw;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const QuestionContainer = styled.div`
    grid-area: question;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent; 
`;

const Question = styled.div`
    font-size: 2vw;
    font-family: Helvetica, sans-serif;
    color: white;
    font-weight: bold;
    margin-left: 8vw;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const EmotionBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1vw;
    border-radius: 15px;
    background-color: transparent;
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
    color: ${props => (props.active && !props.subActive ? props.bgColor : 'white')};
    background-color: ${props => (props.active && !props.subActive ? '#ffffff' : props.bgColor)};
    border: none;
    border-radius: 30px;
    padding: 0.7vh;
    width: 90%;
    height: 5vw;
    cursor: pointer;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    align-items: center;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    transition: height 0.5s ease-in-out;
    ${props => props.active && css`
        height: 35vh;
        animation: ${slideUp} 0.5s ease-in;
    `}
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* Chrome/Safari/Webkit */
    }
`;

const SubEmotionButton = styled.button`
    background-color: ${props => (props.active ? props.fontColor : props.subBgColor)};
    color: ${props => (props.active ? '#fff' : props.fontColor)};
    border: none;
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
        background-color: ${props => !props.active && `darken(${props.subBgColor}, 10%)`};
    }
    ${props => props.active && animatedStyle}
`;

const ConfirmButton = styled.button`
text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.bgColor || '#3893FF'};
    color: ${props => props.color || 'white'};
    font-size: 1.5vw;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    padding: 0.5vw 1.3vw;
    margin-left: 2vw;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: ${props => props.bgColor ? `darken(${props.bgColor}, 10%)` : '#2869B8'};
    }
`;

const NextButton = styled.button`
text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #3893FF;
    color: white;
    font-size: 1.5vw;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    padding: 0.5vw 1.3vw;
    margin-left: 1vw;
    cursor: pointer;
    transition: background-color 0.3s;
    opacity: 0;
    ${({ visible }) => visible && css`
        opacity: 1;
        animation: ${fadeIn} 0.5s forwards;
    `}
    &:hover {
        background-color: #2869B8;
    }
    &:active {
        animation: ${bounce} 0.5s;
    }
`;

const emotions = [
    { main: '긍정', sub: ['행복', '기쁨', '만족', '감사', '희망', '자신감', '흥미', '열정', '자부심', '안심'], bgColor: '#FFD89D', subColor: '#FFF7EC', subBgColor: '#FFF7EC', fontColor: '#FFA51E' },
    { main: '평온', sub: ['안정', '편안', '고요', '차분', '여유', '온화', '따뜻함', '수용', '조화', '균형'], bgColor: '#FF9DC6', subColor: '#FFD7FD', subBgColor: '#FFECF5', fontColor: '#FF4A96' },
    { main: '우울', sub: ['슬픔', '절망', '침울', '낙담', '눈물', '후회', '무기력', '고독', '상실', '비관'], bgColor: '#67BFFF', subColor: '#8BB3FF', subBgColor: '#ECF8FF', fontColor: '#0094FF' },
    { main: '불안', sub: ['걱정', '초조', '긴장', '두려움', '공포', '당황', '염려', '불편', '근심', '불확실'], bgColor: '#C29DFF', subColor: '#E5C5FF', subBgColor: '#ECEEFF', fontColor: '#853AFF' },
    { main: '분노', sub: ['화남', '짜증', '격노', '불쾌', '원망', '성남', '분개', '대노', '울분', '분통'], bgColor: '#FF9D9D', subColor: '#FF9292', subBgColor: '#FFECEC', fontColor: '#FF4E4E' },
];

const StartEmotionSelection = ({ onEmotionSelect, selectedTask }) => {
    const [activeEmotion, setActiveEmotion] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [confirmedEmotionColor, setConfirmedEmotionColor] = useState('#3893FF');
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        // 작업이 변경될 때 상태 초기화
        setActiveEmotion('');
        setSelectedEmotion('');
        setConfirmedEmotionColor('#3893FF');
        setShowNextButton(false);
    }, [selectedTask]);

    const handleMainEmotionClick = (emotion) => {
        if (activeEmotion === emotion) {
            setActiveEmotion('');
            setSelectedEmotion('');
            setConfirmedEmotionColor('#3893FF');
            setShowNextButton(false);
        } else {
            setActiveEmotion(emotion);
            setSelectedEmotion(emotion);
            const selectedMainEmotion = emotions.find(e => e.main === emotion);
            setConfirmedEmotionColor(selectedMainEmotion ? selectedMainEmotion.bgColor : '#3893FF');
            setShowNextButton(true);
        }
    };

    const handleSubEmotionClick = (subEmotion) => {
        if (selectedEmotion === subEmotion) {
            setSelectedEmotion('');
            setConfirmedEmotionColor('#3893FF');
            setShowNextButton(false);
        } else {
            setSelectedEmotion(subEmotion);
            const selectedMainEmotion = emotions.find(e => e.sub.includes(subEmotion));
            setConfirmedEmotionColor(selectedMainEmotion ? selectedMainEmotion.bgColor : '#3893FF');
            setShowNextButton(true);
        }
    };

    return (
        <Container>
            <Header>
                <HeaderTitle>Emotion</HeaderTitle>
            </Header>
            
            <QuestionContainer>
                <Question>
                    현재의 감정은 어떤가요?
                </Question>

                <ConfirmButton bgColor={confirmedEmotionColor} color={confirmedEmotionColor ? '#ffffff' : 'white'}>
                    {selectedEmotion || '감정'}
                </ConfirmButton>

                <NextButton visible={showNextButton} onClick={() => onEmotionSelect(selectedEmotion)}>다음으로</NextButton>
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
                        <SubEmotionList data-emotion-list active={activeEmotion === emotion.main} >
                            {emotion.sub.map((subEmotion, subIndex) => (
                                <SubEmotionButton
                                    key={subIndex}
                                    bgColor={emotion.bgColor}
                                    subColor={emotion.subColor}
                                    subBgColor={emotion.subBgColor}
                                    fontColor={emotion.fontColor}
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

export default StartEmotionSelection;