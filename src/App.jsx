import React, { useEffect } from 'react';
import Routes from './routes';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/authSlice';
import { useCookies } from 'react-cookie';


function App() {
  const [cookies] = useCookies(['token', 'role']);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookies.token;
    const role = cookies.role;
    if (token && role) {
      dispatch(setUser(role));
    }
  }, [cookies, dispatch]);

  return (
    <>
      <Routes/>
      </>
  );
}

export default App;
