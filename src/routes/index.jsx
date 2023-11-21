import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes.jsx';
import MainRoutes from './MainRoutes.jsx';

export default function Routes() {
  return useRoutes([MainRoutes, LoginRoutes]);
}
