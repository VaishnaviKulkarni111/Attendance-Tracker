import React, { useEffect } from 'react';
import { FaUsers, FaClock, FaCheck, FaChartPie } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../store/dashboardSlice'

const ManagerDashboard = () => {

  const dispatch = useDispatch();
    const { activeUsers, present, abscent } = useSelector((state) => state.dashboard);
useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);
  
 
  const attendancePercentage = ((present / activeUsers) * 100).toFixed(1);

  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100 ml-[250px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manager Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Employees */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaUsers className="text-blue-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-bold text-gray-700">Total Employees</h3>
            <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
          </div>
        </div>

        {/* Present Today */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaCheck className="text-green-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-bold text-gray-700">Present Today</h3>
            <p className="text-2xl font-bold text-gray-900">{present}</p>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaClock className="text-red-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-bold text-gray-700">Absent Today</h3>
            <p className="text-2xl font-bold text-gray-900">{abscent}</p>
          </div>
        </div>

        {/* Attendance Percentage */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaChartPie className="text-purple-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-bold text-gray-700">Attendance Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{attendancePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Attendance Chart Placeholder */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance Trends</h2>
        <div className="h-64 flex items-center justify-center bg-gray-200 rounded-lg">
          {/* Placeholder for chart */}
          <p className="text-gray-600">Chart Placeholder (Add chart library here)</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <FaCheck />
            </div>
            <p className="ml-3 text-gray-700">
              Employee <span className="font-bold">John Doe</span> checked in at{' '}
              <span className="font-semibold">9:00 AM</span>.
            </p>
          </li>
          <li className="flex items-center">
            <div className="bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <FaClock />
            </div>
            <p className="ml-3 text-gray-700">
              Employee <span className="font-bold">Jane Smith</span> is absent today.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManagerDashboard;
