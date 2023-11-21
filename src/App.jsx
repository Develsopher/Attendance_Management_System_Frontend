import React, { useState } from 'react';
import Routes from './routes';
import axios from 'axios';

function App() {
  const [connection, setConnection] = useState('');

  const connectionTest = () => {
    axios.get();
  };
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
