import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ProtectedRoute({ children }) {
  const [cookies] = useCookies(['token']);

  if (!cookies.token) {
    // 토큰이 없으면 로그인 페이지로 리디렉션
    return <Navigate to="/login" />;
  }

  return children;
}
