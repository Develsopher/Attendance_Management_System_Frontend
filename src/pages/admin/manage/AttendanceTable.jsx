import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import { students } from '../../../config';

function AttendanceTable() {
  const initialAttendance = {};
  students.forEach((student) => {
    initialAttendance[student.id] = Array(8).fill(0); // 각 교시별 초기 상태는 0
  });

  const [attendance, setAttendance] = useState(initialAttendance);
  const saveAttendance = () => {
    console.log(attendance); // 실제 구현에서는 서버로 보내거나 로컬 저장소에 저장
  };

  // 전체 셀을 '1'로 변경
  const setAllToOne = () => {
    const updated = {};
    students.forEach((student) => {
      updated[student.id] = Array(8).fill(1);
    });
    setAttendance(updated);
  };
  const setAllReset = () => {
    const updated = {};
    students.forEach((student) => {
      updated[student.id] = Array(8).fill(0);
    });
    setAttendance(updated);
  };

  // 특정 학생의 모든 셀을 '1'로 변경
  const setRowToOne = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: Array(8).fill(1),
    }));
  };

  const handleStatusChange = (studentId, period, event) => {
    const newValue = event.target.value;
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId].map((value, index) =>
        index === period ? newValue : value,
      ),
    }));
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
    <div className="p-4 border border-solid rounded-lg shadow-md border-gray-200 space-y-4">
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
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                {[...Array(8).keys()].map((period) => (
                  <td
                    key={period}
                    className={`px-2 py-0 whitespace-nowrap text-sm text-center `}
                  >
                    <FormControl variant="outlined" size="small">
                      <Select
                        value={attendance[student.id][period]}
                        onChange={(event) =>
                          handleStatusChange(student.id, period, event)
                        }
                        inputProps={{
                          sx: {
                            backgroundColor:
                              attendanceColors[attendance[student.id][period]],
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
                ))}
                <td>
                  <Button
                    variant="contained"
                    onClick={() => setRowToOne(student.id)}
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
    </div>
  );
}

export default AttendanceTable;
