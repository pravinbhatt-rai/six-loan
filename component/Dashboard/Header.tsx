"use client";
import React, { useState } from 'react';
import { Bell, Search, Menu, User, FileText, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

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
        
        {/* User Profile with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=32" alt="User" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-bold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                <Link 
                  href="/user/dashboard" 
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={18} />
                  <span className="text-sm">My Profile</span>
                </Link>
                <Link 
                  href="/my-applications" 
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <FileText size={18} />
                  <span className="text-sm">Applications</span>
                </Link>
                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings size={18} />
                  <span className="text-sm">Settings</span>
                </Link>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-red-600 w-full text-left"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
