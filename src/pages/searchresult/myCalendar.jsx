import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/lab';

import dayjs from 'dayjs';

export default function MyCalendar() {
  // 날짜별 player_state 정보 (예시)
  const playerStates = {
    '2023-11-10': '출석',
    '2023-11-20': '결석',
    // 다른 날짜들에 대한 상태도 추가 가능
  };

  const renderDay = (date, selectedDates, pickersDayProps) => {
    const dateString = dayjs(date).format('YYYY-MM-DD');

    // 날짜에 해당하는 player_state를 찾습니다.
    const playerState = playerStates[dateString];

    // player_state에 따라 다른 스타일이나 마커를 적용합니다.
    if (playerState) {
      // 여기에서 player_state에 따른 스타일이나 마커를 정의합니다.
      const markerStyle = { color: playerState === '출석' ? 'green' : 'red' };

      return (
        <div style={{ position: 'relative' }}>
          <PickersDay {...pickersDayProps} />
          <div style={{ position: 'absolute', top: 0, right: 0, ...markerStyle }}>
            {/* 마커 아이콘 또는 커스텀 요소 */}
            {playerState}
          </div>
        </div>
      );
    }

    return <PickersDay {...pickersDayProps} />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar renderDay={renderDay} />
    </LocalizationProvider>
  );
}
