"use client";
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-16 lg:h-20 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 lg:ml-64 fixed top-0 left-0 right-0 z-30">

      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        aria-label="Open menu"
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 text-gray-400 bg-gray-50 px-4 py-2 rounded-lg w-full max-w-md">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Quick search" 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 lg:gap-6">
        <div className="relative">
          <Bell size={20} className="text-blue-500" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-200 overflow-hidden">
             <img src="https://i.pravatar.cc/150?img=32" alt="User" />
          </div>
          <div className="hidden lg:block">
             <p className="text-sm font-bold text-gray-800">Admin User</p>
             <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
