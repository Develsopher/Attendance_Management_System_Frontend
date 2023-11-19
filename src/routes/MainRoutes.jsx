import { lazy } from 'react';

import Loadable from '../components/Loadable.jsx';
import MainLayout from '../layout/MainLayout/index.jsx';

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import('../pages/dashboard/index.jsx')),
);
const SearchResults = Loadable(
  lazy(() => import('../pages/serachresult/index.jsx')),
);

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'search/results',
      element: <SearchResults />,
    },
  ],
};

export default MainRoutes;
