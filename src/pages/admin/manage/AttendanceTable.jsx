import React, { useState } from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Card,
  Typography,
} from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import { formatDate } from '../../../utils/helper';
import { postAttendanceData } from '../../../apis';

function AttendanceTable({ selectedCourse, selectedDate, attendanceData }) {
  const [data, setData] = useState(attendanceData);
  const saveAttendance = async () => {
    const dataToSend = {
      cousre: selectedCourse,
      date: formatDate(selectedDate),
      students: data,
    };

    console.log('dataToSend', dataToSend);
    await postAttendanceData(dataToSend);
  };

  // 전체 셀을 '1'로 변경
  const setAllToOne = () => {
    const updated = data.map((student) => ({
      ...student,
      attendance: student.attendance.map(() => 1),
    }));
    setData(updated);
  };
  const setAllReset = () => {
    const updated = data.map((student) => ({
      ...student,
      attendance: student.attendance.map(() => 0),
    }));
    setData(updated);
  };

  // 특정 학생의 모든 셀을 '1'로 변경
  const setRowToOne = (studentId) => {
    const updated = data.map((student) => {
      if (student.playerId === studentId) {
        return {
          ...student,
          attendance: student.attendance.map(() => 1),
        };
      }
      return student;
    });
    setData(updated);
  };

  const handleStatusChange = (studentId, period, event) => {
    const newValue = event.target.value;
    const updated = data.map((student) => {
      if (student.playerId === studentId) {
        const updatedAttendance = student.attendance.map((value, index) =>
          index === period ? newValue : value,
        );
        return { ...student, attendance: updatedAttendance };
      }
      return student;
    });
    setData(updated);
  };

  const attendanceColors = {
    0: 'white', // 기본
    1: '#A7C7E7', // 출석
    2: 'lightyellow', // 지각
    3: 'orange', // 조퇴
    4: 'orange', // 외출
    5: 'gray', // 결석
    6: 'pink', // 공결
  };
  return (
    <Card className="px-4 py-8 space-y-4">
      <Typography variant="h5">출석 현황</Typography>
      <div className="text-right space-x-3">
        <Button
          color="primary"
          variant="contained"
          onClick={setAllToOne}
          endIcon={<SentimentSatisfiedAltIcon />}
        >
          모두 출석
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={setAllReset}
          endIcon={<RestartAltIcon />}
        >
          초기화
        </Button>
      </div>
      <div
        className="overflow-x-auto  overflow-y-auto"
        style={{ maxHeight: '50vh' }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                학생 / 시간
              </th>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((period) => (
                <th
                  key={period}
                  scope="col"
                  className="px-2 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  {period}교시
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((student) => (
              <tr key={student.playerId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.playerName}
                </td>
                {student.attendance.map((period, index) => {
                  return (
                    <td
                      key={index}
                      className="px-2 py-0 whitespace-nowrap text-sm text-center "
                    >
                      <FormControl variant="outlined" size="small">
                        <Select
                          value={period}
                          onChange={(event) =>
                            handleStatusChange(student.playerId, index, event)
                          }
                          inputProps={{
                            sx: {
                              backgroundColor: attendanceColors[period],
                              fontSize: '14px',
                              width: '30px',
                            },
                          }}
                        >
                          <MenuItem value={0}>-</MenuItem>
                          <MenuItem value={1} className="text-xs">
                            출석
                          </MenuItem>
                          <MenuItem value={2}>지각</MenuItem>
                          <MenuItem value={3}>조퇴</MenuItem>
                          <MenuItem value={4}>외출</MenuItem>
                          <MenuItem value={5}>결석</MenuItem>
                          <MenuItem value={6}>공결</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  );
                })}
                <td>
                  <Button
                    variant="contained"
                    onClick={() => setRowToOne(student.playerId)}
                  >
                    출석
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <Button
          variant="contained"
          color="error"
          onClick={saveAttendance}
          endIcon={<SendIcon />}
        >
          저장
        </Button>
      </div>
    </Card>
  );
}

export default AttendanceTable;
