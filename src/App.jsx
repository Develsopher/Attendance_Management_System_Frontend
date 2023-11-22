import React, { useEffect } from 'react';
import Routes from './routes';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/authSlice';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies] = useCookies(['token']);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      // 서버에 토큰을 전송하여 사용자 정보 확인
      fetchUserFromToken(token).then((userInfo) => {
        dispatch(setUser(userInfo)); // 사용자 정보를 Redux 스토어에 저장
      });
    }
  }, [cookies, dispatch]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
