import { lazy } from 'react';

import Loadable from '../components/Loadable.jsx';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import('../pages/dashboard/index.jsx')),
);
const Search = Loadable(lazy(() => import('../pages/search')));
const SearchResults = Loadable(lazy(() => import('../pages/search/result')));
const AdminManage = Loadable(lazy(() => import('../pages/admin/manage')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'search',
      element: <Search />,
    },
    {
      path: 'search/result',
      element: <SearchResults />,
    },
    {
      path: 'admin/manage',
      element: <AdminManage />,
    },
  ],
};

export default MainRoutes;
