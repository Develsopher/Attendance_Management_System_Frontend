import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function PublicRoute({ children }) {
  const [cookies] = useCookies(['token']);

  if (cookies.token) {
    // 토큰이 있으면 메인 페이지로 리디렉션
    return <Navigate to="/" />;
  }

  return children;
}
