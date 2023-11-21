import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Button, Card } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { classLists } from '../../../config';
import AttendanceTable from './AttendanceTable';

function Manage() {
  const [classType, setClassType] = useState('');
  const [date, setDate] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const handleClassSelect = (event) => {
    setClassType(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value,
    );
  };
  const fallback = (
    <Card className="flex justify-center items-center h-1/2">
      <h3 className="text-3xl">해당 데이터가 없습니다. 🐤</h3>
    </Card>
  );

  const handleSearch = () => {
    setSearchPerformed(true);
    // api get
  };
  return (
    <main className="h-screen space-y-4">
      <Card className="px-4 py-8">
        <Typography variant="h5">출석 관리</Typography>
        <div className="max-w-3xl mx-auto flex items-baseline justify-center gap-x-4">
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel id="class-type">차수</InputLabel>
            <Select
              labelId="class-type"
              id="class-type-name"
              value={classType}
              onChange={handleClassSelect}
            >
              {classLists.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="날짜"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                format="YYYY-MM-DD"
                slotProps={{ textField: { size: 'small' } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="contained" onClick={handleSearch}>
            검색
          </Button>
        </div>
      </Card>
      <div className="h-full ">
        {searchPerformed ? (
          <AttendanceTable classType={classType} date={date} />
        ) : (
          fallback
        )}
      </div>
    </main>
  );
}

export default Manage;
