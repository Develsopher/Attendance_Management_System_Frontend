import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function MyCalendar({ startDate, endDate }) {
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

  // 날짜 상태를 이벤트 배열로 변환
  const filteredEvents = Object.keys(dateStates)
  .filter(date => {
    const eventDate = new Date(date);
    return startDate <= eventDate && eventDate <= endDate;
  })
  .map(date => ({
    title: dateStates[date],
    start: new Date(date),
    end: new Date(date),
    allDay: true
  }));

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment(startDate).toDate()}
        min={moment(startDate).toDate()}
        max={moment(endDate).toDate()}
      />
    </div>
  );
}