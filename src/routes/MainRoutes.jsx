import { lazy } from 'react';

import Loadable from '../components/Loadable.jsx';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import('../pages/dashboard/index.jsx')),
);
const SearchResults = Loadable(
  lazy(() => import('../pages/searchresult/index.jsx')),
);
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
      path: 'search/results/:id',
      element: <SearchResults />,
    },
    {
      path: 'admin/manage',
      element: <AdminManage />,
    },
  ],
};

export default MainRoutes;
