import { useState } from 'react';
// import mock from './mock.json';
import './App.css';

const categories = [
  {
    id: 1,
    name: '라이프 스타일',
    search: '일상 루틴, 대중문화 트렌드, 브이로그',
  },
  {
    id: 2,
    name: '음악/댄스',
    search: '인기 음악 및 댄스 커버, 아이돌 무대',
  },
  {
    id: 3,
    name: '뷰티/패션',
    search: '메이크업 튜토리얼, 패션 스타일링 팁',
  },
  {
    id: 4,
    name: '영화/애니메이션',
    search: '인기 영화 리뷰, 애니메이션 추천',
  },
  {
    id: 5,
    name: '게임',
    search: '인기 게임 플레이 영상, 게임 커뮤니티 소식',
  },
  {
    id: 6,
    name: '여행/아웃도어',
    search: '여행 일정 및 경험 공유, 아웃도어 어드벤처',
  },
  {
    id: 7,
    name: '스포츠/건강',
    search: '운동 루틴, 스포츠 하이라이트',
  },
  {
    id: 8,
    name: '뉴스/정치/이슈',
    search: '최신 뉴스 요약, 정치 및 사회 이슈 토론',
  },
  {
    id: 10,
    name: '엔터테인먼트',
    search: '인기 TV 프로그램 클립, 연예인 인터뷰',
  },
  {
    id: 11,
    name: '푸드/쿠킹',
    search: '간편 요리 레시피, 맛집 리뷰',
  },
  {
    id: 12,
    name: 'IT/기술/과학',
    search: '최신 기술 소식, 과학적 발견 소개',
  },
  {
    id: 13,
    name: '동물/펫',
    search: '귀여운 동물 영상, 펫 관리 팁',
  },
  {
    id: 14,
    name: '취미',
    search: '다양한 취미 활동 소개, 수집품 및 공예',
  },
  {
    id: 15,
    name: '경제/금융/제테크',
    search: '개인 재무 관리 팁, 주식 및 투자 전략',
  },
  {
    id: 16,
    name: '교육/강의',
    search: '공부 팁 및 학습법, 전문가 강의',
  },
];

const App = () => {
  const [videos, setVideos] = useState([]);

  const handleClick = async (question) => {
    const API_KEY = 'AIzaSyCg2NKoCp2oNKL4pXDWSJhqyLg6IFVrBqM';
    const result = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${encodeURIComponent(
        question
      )}&type=video&maxResults=100`
    );
    const json = await result.json();
    // const json = mock;
    setVideos(json.items);
  };

  return (
    <>
      <div className='category-bar'>
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              type='button'
              className='category'
              onClick={() => {
                handleClick(category.search);
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className='video-container'>
        {videos.length > 0 &&
          videos.map((video) => {
            const { title, thumbnails, channelTitle, channelId } = video.snippet;
            const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;
            const channelLink = `https://www.youtube.com/channel/${channelId}`;

            return (
              <div key={videoLink} className='video'>
                <a href={videoLink} target='_blank' className='video-link'>
                  <img className='video-img' src={thumbnails.medium.url} />
                  <div className='video-title'>
                    <div dangerouslySetInnerHTML={{ __html: title }} />
                  </div>
                </a>
                <a className='video-info' href={channelLink} target='_blank'>
                  {channelTitle}
                </a>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default App;
