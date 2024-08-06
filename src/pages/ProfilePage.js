import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import api from '../api'; // 설정된 Axios 인스턴스 임포트

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const emotions = [
  { main: '긍정', bgColor: '#FFD89D', fontColor: '#FFA51E', quote: '긍정적인 생각은 부정적인 생각보다 모든 것을 더 잘하게 만듭니다.' },
  { main: '평온', bgColor: '#FF9DC6', fontColor: '#FF4A96', quote: '평온은 내부에서 나옵니다. 외부에서 찾지 마십시오.' },
  { main: '우울', bgColor: '#67BFFF', fontColor: '#0094FF', quote: '가장 어두운 밤도 끝나고 해가 뜹니다.' },
  { main: '불안', bgColor: '#C29DFF', fontColor: '#853AFF', quote: '어려움이 당신을 불안하게 하지 마십시오; 결국, 가장 어두운 밤에 별이 더 밝게 빛납니다.' },
  { main: '분노', bgColor: '#FF9D9D', fontColor: '#FF4E4E', quote: '분노와 원망, 질투는 다른 사람의 마음을 바꾸지 않습니다 - 오직 당신의 마음만 바꿉니다.' },
];

const statsQuotes = {
  집중: '집중은 모든 성취의 시작입니다.',
  휴식: '휴식은 모든 에너지의 근원입니다.',
  감정: '감정은 삶의 색을 더해줍니다.'
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #d9f1ff;
  opacity: 0;
  ${({ isVisible }) => isVisible && css`
    animation: ${fadeIn} 1s forwards;
  `}
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3vw;
  width: 60vw;
`;

const StatBlock = styled.div`
  background: ${(props) => props.bgColor || '#fff'};
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1em;
  color: ${(props) => props.fontColor || '#000'};
  height: 0;
  padding-bottom: 100%;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  ${({ isFlipped }) => isFlipped && css`
    transform: rotateY(180deg);
  `}
`;

const GradientStatBlock = styled(StatBlock)`
  background: linear-gradient(45deg, #FFD89D, #FF9DC6, #67BFFF, #C29DFF, #FF9D9D);
  color: #000;
`;

const StatBlockInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const StatFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 15px;
`;

const StatBack = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
  backface-visibility: hidden;
  background-color: #fff;
  color: #000;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 10px;
  box-sizing: border-box;
  top: 5%;
  left: 5%;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 1.5vw;
`;

const StatTitle = styled.div`
  font-size: calc(0.3em + 1vw);
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: calc(0.8em + 1vw);
  font-weight: bold;
`;

const Title = styled.h1`
  font-size: 4vw;
  text-align: center;
`;

function ProfilePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [flipped, setFlipped] = useState(Array(8).fill(false));
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);

    const fetchData = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const yesterday = today.getDate() - 1;
        // const accessToken = localStorage.getItem('access_token');

        console.log(`Requesting data for ${year}-${month}-01 to ${year}-${month}-${yesterday}`);

        const requests = [];
        for (let day = 1; day <= yesterday; day++) {
          const request = api.get(`/tasks/static/?year=${year}&month=${month}&day=${day}`);
          requests.push(request);
        }

        const responses = await Promise.all(requests);
        const aggregatedStats = {
          total_focus_time: 0,
          total_break_time: 0,
          emotion_counts: {}
        };

        responses.forEach(response => {
          aggregatedStats.total_focus_time += response.data.total_focus_time;
          aggregatedStats.total_break_time += response.data.total_break_time;
          
          Object.keys(response.data.emotion_counts).forEach(emotion => {
            if (!aggregatedStats.emotion_counts[emotion]) {
              aggregatedStats.emotion_counts[emotion] = 0;
            }
            aggregatedStats.emotion_counts[emotion] += response.data.emotion_counts[emotion];
          });
        });

        setStats({
          nickname: responses[0].data.nickname,
          total_focus_time: aggregatedStats.total_focus_time,
          total_break_time: aggregatedStats.total_break_time,
          emotion_counts: aggregatedStats.emotion_counts,
          month
        });

      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFlip = (index) => {
    setFlipped(prevFlipped => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);
    if (seconds > 0) parts.push(`${seconds}초`);

    return parts.join(' ');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer isVisible={isVisible}>
      <MainContainer>
        <Title>{stats.nickname}님의 {stats.month}월 통계</Title>
        <StatsContainer>
          <StatBlock onClick={() => handleFlip(0)} isFlipped={flipped[0]} bgColor="#fff" fontColor="#000">
            <StatBlockInner>
              <StatFront>
                <StatTitle>총 집중 시간</StatTitle>
                <StatValue>{formatTime(stats.total_focus_time)}</StatValue>
              </StatFront>
              <StatBack>{statsQuotes.집중}</StatBack>
            </StatBlockInner>
          </StatBlock>
          <GradientStatBlock onClick={() => handleFlip(1)} isFlipped={flipped[1]}>
            <StatBlockInner>
              <StatFront>
                <StatTitle>감정 입력 횟수</StatTitle>
                <StatValue>{Object.values(stats.emotion_counts).reduce((a, b) => a + b, 0)}회</StatValue>
              </StatFront>
              <StatBack>{statsQuotes.감정}</StatBack>
            </StatBlockInner>
          </GradientStatBlock>
          <StatBlock
            bgColor={emotions[0].bgColor}
            fontColor={emotions[0].fontColor}
            onClick={() => handleFlip(2)}
            isFlipped={flipped[2]}
          >
            <StatBlockInner>
              <StatFront>
                <StatTitle>긍정 횟수</StatTitle>
                <StatValue>{stats.emotion_counts[emotions[0].main] || 0}회</StatValue>
              </StatFront>
              <StatBack>{emotions[0].quote}</StatBack>
            </StatBlockInner>
          </StatBlock>
          <StatBlock
            bgColor={emotions[1].bgColor}
            fontColor={emotions[1].fontColor}
            onClick={() => handleFlip(3)}
            isFlipped={flipped[3]}
          >
            <StatBlockInner>
              <StatFront>
                <StatTitle>평온 횟수</StatTitle>
                <StatValue>{stats.emotion_counts[emotions[1].main] || 0}회</StatValue>
              </StatFront>
              <StatBack>{emotions[1].quote}</StatBack>
            </StatBlockInner>
          </StatBlock>
          <StatBlock
            onClick={() => handleFlip(4)}
            isFlipped={flipped[4]}
            bgColor="#fff"
            fontColor="#000"
          >
            <StatBlockInner>
              <StatFront>
                <StatTitle>총 휴식 시간</StatTitle>
                <StatValue>{formatTime(stats.total_break_time)}</StatValue>
              </StatFront>
              <StatBack>{statsQuotes.휴식}</StatBack>
            </StatBlockInner>
          </StatBlock>
          <StatBlock
            bgColor={emotions[2].bgColor}
            fontColor={emotions[2].fontColor}
            onClick={() => handleFlip(5)}
            isFlipped={flipped[5]}
          >
            <StatBlockInner>
              <StatFront>
                <StatTitle>우울 횟수</StatTitle>
                <StatValue>{stats.emotion_counts[emotions[2].main] || 0}회</StatValue>
              </StatFront>
              <StatBack>{emotions[2].quote}</StatBack>
            </StatBlockInner>
          </StatBlock>
          <StatBlock
            bgColor={emotions[3].bgColor}
            fontColor={emotions[3].fontColor}
            onClick={() => handleFlip(6)}
            isFlipped={flipped[6]}
          >
            <StatBlockInner>
              <StatFront>
                <StatTitle>불안 횟수</StatTitle>
                <StatValue>{stats.emotion_counts[emotions[3].main] || 0}회</StatValue>
              </StatFront>
              <StatBack>{emotions[3].quote}</StatBack>
            </StatBlockInner>
          </StatBlock>
          <StatBlock
            bgColor={emotions[4].bgColor}
            fontColor={emotions[4].fontColor}
            onClick={() => handleFlip(7)}
            isFlipped={flipped[7]}
          >
            <StatBlockInner>
              <StatFront>
                <StatTitle>분노 횟수</StatTitle>
                <StatValue>{stats.emotion_counts[emotions[4].main] || 0}회</StatValue>
              </StatFront>
              <StatBack>{emotions[4].quote}</StatBack>
            </StatBlockInner>
          </StatBlock>
        </StatsContainer>
      </MainContainer>
    </ProfileContainer>
  );
}

export default ProfilePage;