import { useRoutes } from 'react-router-dom';

// project import
// login routes (예정)
import MainRoutes from './MainRoutes.jsx';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes]);
}
