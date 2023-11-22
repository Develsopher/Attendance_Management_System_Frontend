import React, { useState, useEffect } from 'react';
import { getCourses } from '../../../apis';

function PlayerCreate() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    getCourses().then((courses) => setCourses(courses));
  }, []);

  const handleSubmit = (e) => {
    if (!selectedCourse || !name || !birthDate) {
      alert('입력을 확인해주세요.');
      return;
    }
    e.preventDefault();
    const createData = { selectedCourse, name, birthDate };
    console.log('createData', createData);
  };
  console.log('render');
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">플레이어 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              코스명
            </label>
            <select
              id="className"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-1"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-</option>
              {courses.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-1 py-2"
              placeholder="이름를 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              생년월일 6자리 (ex 9xxxxx)
            </label>
            <input
              type="number"
              id="birthDate"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-1 py-2"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlayerCreate;
