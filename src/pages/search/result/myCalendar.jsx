import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function MyCalendar({startDate, endDate}) {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
    
  };

  const dateStates = {
    '2023-11-01': '결석',
    '2023-11-02': '외출',
    '2023-11-03': '결석',
    '2023-11-06': '결석',
    '2023-11-07': '결석',
    '2023-11-08': '결석',
    '2023-11-09': '조퇴',
    '2023-11-10': '출석',
    '2023-11-13': '결석',
    '2023-11-14': '외출',
    '2023-11-15': '외출',
    '2023-11-16': '결석',
    '2023-11-17': '결석',
    '2023-11-20': '출석',
    '2023-11-21': '외출',
    '2023-11-22': '조퇴',
    '2023-11-23': '조퇴',
    '2023-11-24': '출석',
    '2023-11-27': '조퇴',
    '2023-11-28': '출석',
    '2023-11-29': '출석',
    '2023-11-30': '조퇴'
  };

  // 이벤트 데이터 생성
  const filteredEvents = Object.keys(dateStates)
    .filter(date => {
      const currentDate = new Date(date);
      return startDate <= currentDate && currentDate <= endDate;
    })
    .map(date => ({
      title: dateStates[date],
      start: date,
    }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialEvents="dayGridMonth" // 이벤트 추가
      dateClick={handleDateClick}
      validRange={{ start: startDate, end: endDate }} // 유효 범위 설정
    />
  );
}
