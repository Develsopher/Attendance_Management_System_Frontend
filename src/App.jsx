import React, { useState } from 'react';
import axios from 'axios';
import Routes from './routes';



function App() {
  const [connection, setConnection] = useState('');

  const connectionTest = () => {
    axios.get();
  };
  return (
    <>
      <Routes/>
      </>
  );
}

export default App;
