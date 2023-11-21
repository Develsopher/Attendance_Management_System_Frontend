import React, {useState, useEffect} from 'react'
import Personal from "./Personal";
import MyCalendar from "./MyCalendar";
import { useParams, useLocation } from 'react-router-dom';

function SearchResult() {
  const { course, name, pw }= useParams();
  const location = useLocation();
  const [player, setPlayer] = useState(null);
  const [startDate, setStartDate] = useState(null); // 상태 추가
  const [endDate, setEndDate] = useState(null); // 상태 추가

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/data/players.json'); // '/players.json'으로 변경
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          // Process the data
        } catch (e) {
          console.error('Failure parsing JSON', e);
          console.log('Received text:', text);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchPlayers();
  }, []);

// URL에서 startDate와 endDate를 추출하는 로직이 필요합니다.
  // 예를 들어, URL에 startDate와 endDate가 쿼리 스트링으로 포함되어 있다면,
  // 이를 파싱하여 상태를 설정해야 합니다.

  return (
    <>
      {player ? <Personal course={course} name={name} pw={pw} /> : <p>Loading...</p>}
      <MyCalendar course={course} name={name} pw={pw} startDate={startDate} endDate={endDate}/>
    </>
  );
}


export default SearchResult;
