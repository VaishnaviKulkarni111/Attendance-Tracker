import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchAttendance } from '../store/attendanceSlice'; 
import { fetchUsers } from '../store/authSlice'; 
import { FaSearch } from 'react-icons/fa';

const ShowAttendance = () => {
  const dispatch = useDispatch();
  const { attendanceHistory = [], loading, error } = useSelector((state) => state.attendance);
  const users = useSelector((state) => state.auth.user) || []; // Correctly access users
 console.log("users from selector",users)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  // Fetch all users and attendance initially
  useEffect(() => {
    dispatch(fetchUsers())  // Fetch users
      .unwrap()
      .then((response) => {
        console.log("Fetched Users Response: ", response);
        console.log("Fetched Users Data: ", response.data);
      })
      .catch((error) => {
        console.log("Error fetching users: ", error);
      });
    dispatch(fetchAttendance());  // Fetch attendance
  }, [dispatch]);

  useEffect(() => {
    console.log("Users from State: ", users);
  }, [users]);

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setSearchTerm(input);
    console.log("Search Term: ", input);
  
    const userArray = Array.isArray(users.data) ? users.data : Array.isArray(users) ? users : [];
    console.log("array",userArray)
    const matching = userArray.filter((user) =>
      user.fname.toLowerCase().includes(input.toLowerCase()) ||
      user.email.toLowerCase().includes(input.toLowerCase())
    );
  
    setFilteredUsers(matching); // Update the state with the filtered users
    console.log("Matching Users: ", matching); // Log the filtered array
  };
  

  const handleUserSelection = (user) => {
    setSelectedUserId(user._id);
    setSearchTerm(`${user.fname} (${user.email})`);
    setFilteredUsers([]);
    console.log("Selected User ID: ", user._id);
  };

  const handleSearch = () => {
    const idToSearch = selectedUserId || searchTerm.trim();
    if (idToSearch) {
      dispatch(fetchAttendance(idToSearch));
      console.log("Searched User ID: ", idToSearch);
    }
  };

  return (
    <div className="flex flex-col flex-grow p-6 bg-white ml-[250px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Attendance Records</h2>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInput}
            placeholder="Search by name or email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {filteredUsers.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md shadow-md mt-1">
              {filteredUsers.map((user) => (
                <li
                  key={user._id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleUserSelection(user)}
                >
                  {user.fname} ({user.email})
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bg-blue-500 text-white px-4 rounded-r-md flex items-center justify-center h-full hover:bg-blue-600"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : attendanceHistory.length === 0 ? (
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
              {attendanceHistory.map((record) => (
                <tr key={record.date} className="hover:bg-gray-50">
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
