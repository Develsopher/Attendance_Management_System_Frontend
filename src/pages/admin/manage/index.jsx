import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCourses, getAttendanceData } from '../../../apis';
import AttendanceTable from './AttendanceTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate, parseDate } from '../../../utils/helper';
import './index.css';

function Manage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const course = queryParams.get('course');
  const date = queryParams.get('date');

  useEffect(() => {
    getCourses().then((courses) => setCourses(courses));
  }, []);

  useEffect(() => {
    if (course && date) {
      fetchData(course, date);
      setSelectedCourse(course);
      setSelectedDate(parseDate(date));
    }
  }, []);

  const handleClassSelect = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleSearch = async () => {
    if (selectedCourse && selectedDate) {
      const formattedDate = formatDate(selectedDate);
      await fetchData(selectedCourse, formattedDate);
      // navigate(
      //   `/admin/manage/${encodeURIComponent(
      //     selectedCourse,
      //   )}/${encodeURIComponent(formattedDate)}`,
      // );
    } else {
      alert('검색 조건을 채워주세요.');
    }
  };

  const fetchData = async (course, date) => {
    setIsLoading(true);
    try {
      const data = await getAttendanceData(course, date);
      console.log(data);
      setAttendanceData(data.students);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  return (
    <main className="h-screen space-y-4">
      <div className="card bg-white px-4 py-8 shadow-lg">
        <h5 className="text-xl font-semibold mb-4">출석 관리</h5>
        <div className="max-w-3xl mx-auto flex items-end justify-center gap-x-4">
          <div>
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="class-type"
            >
              차수
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              id="class-type"
              value={selectedCourse}
              onChange={handleClassSelect}
            >
              <option value="">-</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">날짜</label>
            <DatePicker
              selected={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 cursor-pointer z-20"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSearch}
            >
              검색
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">로딩 중...</div> // 로딩 표시
      ) : (
        <div className="h-full">
          {attendanceData.length > 0 && (
            <AttendanceTable
              selectedCourse={selectedCourse}
              selectedDate={selectedDate}
              attendanceData={attendanceData}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default Manage;
