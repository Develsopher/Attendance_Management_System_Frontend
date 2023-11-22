import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayers } from '../../apis';

function Search() {
  const [selectedClass, setSelectedClass] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState({ name: '', pw: '' });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const { id } = useParams();

  const [response, setResponse] = useState({});

  const getResult = async () => {
    try {
      await axios.get('http://localhost:8080/search/result', {
        params: {
          name,
          course,
          pw,
          startDate,
          endDate
        }
      }).then(response => setResponse(response));
    } catch (e){
      console.log(e);
    }
  }

  useEffect(() => {
    getResult();
  }, []);
  console.log("response:",response);

  useEffect(() => {
    getPlayers().then((players) => {
      // 고유한 course 값을 추출하여 클래스 목록 설정
      const uniqueCourses = Array.from(new Set(players.map(p => p.course)))
      .sort((a, b) => a.localeCompare(b));
      setClasses(uniqueCourses);
  
      // id가 있을 경우 해당하는 플레이어를 찾아서 selectedPlayer 상태를 업데이트
      if (id) {
        const foundPlayer = players.find((p) => p.id === parseInt(id));
        if (foundPlayer) {
          setSelectedPlayer({ name: foundPlayer.name, pw: foundPlayer.pw || foundPlayer.course });
        }
      }
    });
  }, [id]);

  const handleNameChange = (e) => {
    setSelectedPlayer({ ...selectedPlayer, name: e.target.value });
  };

  const handlePwChange = (e) => {
    setSelectedPlayer({ ...selectedPlayer, pw: e.target.value });
  };

  const navigate = useNavigate();

  const formatDateString = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return ''; // 유효하지 않은 날짜인 경우 빈 문자열 반환
    }
    return date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식으로 반환
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  const queryParams = new URLSearchParams({
    course: selectedClass,
    name: selectedPlayer.name,
    pw: selectedPlayer.pw,
    startDate: formatDateString(startDate),
    endDate: formatDateString(endDate)
  }).toString();
  navigate(`/search/result?${queryParams}`);
  };

  const formData ={
    course : selectedClass,
    name : selectedPlayer.name,
    pw : selectedPlayer.pw,
    startDate : formatDateString(startDate),
    endDate : formatDateString(endDate)
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
            Your Pw:
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            placeholder="Enter your pw"
            value={selectedPlayer.pw}
            onChange={handlePwChange}
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
