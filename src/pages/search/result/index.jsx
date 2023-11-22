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

  const handleApplication = (e) => {
    e.preventDefault(); // Prevent the default form submission
    window.open('https://forms.gle/EbFMy9yv8Ax52E8M6', '_blank'); // Redirect to the URL
  };

  return (
    <div>
      {/* Personal 컴포넌트에 name과 course 전달 */}
      <Personal name={name} course={course} pw={pw}/>
      <form className="" onSubmit={handleApplication}>
      <button className ="bg-yellow-100 ">외출/조퇴 신청</button>
      </form>
      {/* MyCalendar 컴포넌트에 startDate와 endDate 전달 */}
      <MyCalendar startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default SearchResults;