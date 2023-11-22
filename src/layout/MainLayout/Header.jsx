import { CiMenuBurger } from 'react-icons/ci';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeCookie('token');
    removeCookie('role');
    dispatch(clearUser());
    navigate('/login'); // 로그아웃 후 로그인 페이지로 리디렉션
  };
  return (
    <div className="flex justify-between items-center p-4 bg-black text-white fixed top-0 left-0 right-0 z-20">
      <CiMenuBurger className="h-6 w-6 cursor-pointer" onClick={onMenuClick} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
