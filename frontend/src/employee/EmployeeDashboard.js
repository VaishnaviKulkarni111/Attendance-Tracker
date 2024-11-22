import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAttendance } from '../store/attendanceSlice';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { attendance, loading, error } = useSelector((state) => state.attendance);
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  // Fetch user attendance when the component mounts
  useEffect(() => {
    if (token) {
      dispatch(fetchUserAttendance(token)); // Dispatch the thunk to fetch attendance
    }
  }, [dispatch, token]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    return new Date(time).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 ml-64"> {/* Add left margin to avoid overlap with the sidebar */}
      <h1 className="text-3xl font-bold mb-4">My Attendance</h1>
      
      {/* Loading or Error states */}
      {loading && <p className="text-blue-500">Loading attendance...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Attendance Table */}
      <div className="overflow-x-auto"> {/* Make the table horizontally scrollable if needed */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Check-In</th>
              <th className="py-2 px-4 border-b text-left">Check-Out</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance && attendance.length > 0 ? (
              attendance.map((record, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{formatDate(record.date)}</td>
                  <td className="py-2 px-4 border-b">{formatTime(record.checkInTime)}</td>
                  <td className="py-2 px-4 border-b">{formatTime(record.checkOutTime)}</td>
                  <td className="py-2 px-4 border-b">{record.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No attendance records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
