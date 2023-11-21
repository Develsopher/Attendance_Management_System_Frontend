import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Search() {
  const [selectedClass, setSelectedClass] = useState('');
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 예시 클래스 목록
  const classes = ['Class A', 'Class B', 'Class C'];

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-5 border rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Select your class:
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select a class</option>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Choose a date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          검색
        </button>
      </div>
    </div>
  );
}

export default Search;
