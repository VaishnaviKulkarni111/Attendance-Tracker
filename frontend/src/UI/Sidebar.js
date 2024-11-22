import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const userType = localStorage.getItem("userType");

  const employeeTabs = [
    { name: 'Dashboard', path: '/emp-dashboard' },
    { name: 'Attendance', path: '/attendance' },
  ];

  const managerTabs = [
    { name: 'Dashboard', path: '/mdashboard' },
    { name: 'Employee Management', path: '/manager/employees' },
    { name: 'Reports', path: '/show-attendance' },
  ];

  const tabs = userType === 'manager' ? managerTabs : employeeTabs;

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/home';
  };

  return (
    <div className="min-h-screen w-64 bg-blue-50 border-r border-blue-200 fixed shadow-md">
      {/* Company Name */}
      <h1 className="text-2xl font-semibold text-blue-800 px-6 py-6 border-b border-blue-200">
        ServiPhi Technologies
      </h1>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-6">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className="block py-3 px-4 my-2  font-medium rounded-md hover:bg-blue-100 hover:text-blue-900 transition-all duration-150"
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-md shadow-md transition-all duration-150"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
