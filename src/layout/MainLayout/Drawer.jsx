import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCloud } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Drawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const admin = useSelector((state) => state.authReducer.user);

  const menuItems = [{ name: '출석 조회', path: '/search' }];
  if (admin) {
    menuItems.push({ name: '출석 관리', path: '/admin/manage' });
  }

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  return createPortal(
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`z-30 fixed top-0 left-0 w-64 h-full bg-gray-900 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out flex flex-col items-start p-4`}
      >
        <div className="flex items-center justify-center mb-6 w-full cursor-pointer">
          <FaCloud className="text-xl mr-2" />
          <span className="text-lg font-semibold">구름 출석관리 시스템</span>
        </div>
        <ul className="list-none px-4 w-full text-center space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleMenuClick(item.path)}
              className={`py-2 cursor-pointer hover:bg-gray-700 rounded ${
                location.pathname === item.path ? 'bg-gray-600' : ''
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>,
    document.getElementById('drawer'),
  );
};

export default Drawer;
