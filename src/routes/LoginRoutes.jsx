import { lazy } from 'react';
import PublicRoute from './PublicRoute';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));

const LoginRoutes = {
  path: '/',
  element: (
    <PublicRoute>
      <MinimalLayout />
    </PublicRoute>
  ),
  children: [
    {
      path: 'login',
      element: <AuthLogin />,
    },
  ],
};

export default LoginRoutes;
