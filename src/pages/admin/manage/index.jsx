import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Typography, Button, Card } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { classLists } from '../../../config';
import AttendanceTable from './AttendanceTable';

function Manage() {
  const [classType, setClassType] = useState('');
  const [date, setDate] = useState(null);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // if () {
  //   return (
  //     <Card>
  //       <h3>차수와 날짜를 입력해 주세요.</h3>
  //     </Card>
  //   );
  // }

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} md={6} sx={{ mb: -2.25 }}>
          <Typography variant="h5">출석 관리</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'baseline',
            gap: '1rem',
          }}
        >
          <FormControl sx={{ minWidth: 250 }} size="small">
            <InputLabel id="class-type">차수</InputLabel>
            <Select
              labelId="class-type"
              id="class-type-name"
              value={classType}
              onChange={handleChange}
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
          <Button variant="contained">검색</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">출석 현황</Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <AttendanceTable /> */}
          {classType && date && <AttendanceTable />}
        </Grid>
      </Grid>
    </>
  );
}

export default Manage;
