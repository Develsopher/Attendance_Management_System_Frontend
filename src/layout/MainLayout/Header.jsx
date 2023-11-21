import React, { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';

const Header = ({ onMenuClick, username }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white fixed top-0 left-0 right-0 z-20">
      <CiMenuBurger className="h-6 w-6 cursor-pointer" onClick={onMenuClick} />
      <span>{username}</span>
    </div>
  );
};

export default Header;
