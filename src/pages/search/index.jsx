import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayers } from '../../apis';

function Search() {
  const [selectedClass, setSelectedClass] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState({ name: '', birth: '' });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    getPlayers().then((players) => {
      // 고유한 course 값을 추출
      const uniqueCourses = Array.from(new Set(players.map(p => p.course)))
      .sort((a,b) => a.localeCompare(b));
      setClasses(uniqueCourses);
    });

    if (id) {
      getPlayers().then((players) => {
        const foundPlayer = players.find((p) => p.id === parseInt(id));
        if (foundPlayer) {
          setSelectedPlayer({ name: foundPlayer.name, pw: foundPlayer.pw || foundPlayer.birth });
      }});
    }
  }, [id]);

  const handleNameChange = (e) => {
    setSelectedPlayer({ ...selectedPlayer, name: e.target.value });
  };

  const handleBirthChange = (e) => {
    setSelectedPlayer({ ...selectedPlayer, birth: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); //폼제출 시 페이지 새로고침 방지
    const path = `/search/${selectedClass}/${selectedPlayer.name}/${selectedPlayer.pw}/${selectedPlayer.startDate}/${selectedPlayer.endDate}`;
    navigate(path);
  console.log("Submitted Data:", formData);

  };

  const formData ={
    course : selectedClass,
    name : selectedPlayer.name,
    pw : selectedPlayer.pw,
    startDate,
    endDate
  };

  //데이터 베이스로 데이터 전송 (API 요청)
  //예) await sendFormDataToDatabase(formData);



  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-5 border rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Select your course:
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Course</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Your Name:
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            placeholder="Enter your name"
            value={selectedPlayer.name}
            onChange={handleNameChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Your Birth:
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            placeholder="Enter your birth"
            value={selectedPlayer.pw}
            onChange={handleBirthChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Choose a date range:
          </label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setStartDate(update[0]);
              setEndDate(update[1])}}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
            
      <form className="" onSubmit={handleSubmit}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          검색
        </button>
        </form>
      </div>
    </div>
  );
            }

export default Search;
