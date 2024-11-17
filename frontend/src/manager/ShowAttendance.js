import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAttendance } from '../store/attendanceSlice'; 
import { fetchUsers } from '../store/authSlice';
import { FaSearch } from 'react-icons/fa';

const ShowAttendance = () => {
  const dispatch = useDispatch();
  const { attendanceHistory = [], loading, error } = useSelector((state) => state.attendance);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const users = useSelector((state) => state.auth.user) || [];
  console.log("users", users)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchAttendance()); // Fetch all attendance records initially
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // Filter attendance records based on the search term
    const filtered = attendanceHistory.filter((record) =>
      record.employeeId.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredAttendance(filtered);
  };

  return (
    <div className="flex flex-col flex-grow p-6 bg-white ml-[250px]"> {/* Adjust for sidebar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Attendance Records</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Employee ID"
            className="border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 rounded-r-md flex items-center justify-center hover:bg-blue-600">
            <FaSearch />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (searchTerm && filteredAttendance.length === 0) || (!searchTerm && attendanceHistory.length === 0) ? (
        <p className="text-gray-500">No records found.</p>
      ) : (
        <div className="overflow-auto shadow-md rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Check-in Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Check-out Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {(searchTerm ? filteredAttendance : attendanceHistory).map((record) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.checkInTime
                      ? new Date(record.checkInTime).toLocaleTimeString()
                      : '—'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.checkOutTime
                      ? new Date(record.checkOutTime).toLocaleTimeString()
                      : '—'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowAttendance;
