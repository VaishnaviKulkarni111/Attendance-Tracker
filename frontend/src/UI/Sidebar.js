import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const userType = useSelector((state) => state.auth.userType);

  const employeeTabs = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Profile', path: '/employee/profile' },
  ];

  const managerTabs = [
    { name: 'Dashboard', path: '/manager/dashboard' },
    { name: 'Employee Management', path: '/manager/employees' },
    { name: 'Reports', path: '/manager/reports' },
    { name: 'Profile', path: '/manager/profile' },
  ];

  const tabs = userType === 'manager' ? managerTabs : employeeTabs;

  return (
    <div className="min-h-screen w-64 bg-gradient-to-br from-indigo-600 to-teal-500 text-white fixed">
      <h1 className="text-3xl font-bold py-6 px-6">ServiPhi Technologies</h1>
      <nav className="flex-1 px-4">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className="block py-3 px-4 my-1 rounded-md bg-indigo-700 hover:bg-indigo-500 transition duration-150 shadow-lg"
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
