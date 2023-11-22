import React from 'react';
import { useLocation } from 'react-router-dom';
import Personal from './Personal';
import MyCalendar from './myCalendar';

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // 쿼리 파라미터에서 데이터 추출
  const name = queryParams.get('name');
  const course = queryParams.get('course');
  const pw = queryParams.get('pw');
  const startDate = queryParams.get('startDate');
  const endDate = queryParams.get('endDate');

  

  return (
    <div>
      {/* Personal 컴포넌트에 name과 course 전달 */}
      <Personal name={name} course={course} pw={pw}/>
      
      {/* MyCalendar 컴포넌트에 startDate와 endDate 전달 */}
      <MyCalendar startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default SearchResults;