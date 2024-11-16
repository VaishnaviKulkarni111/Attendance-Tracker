import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIn, checkOut } from '../store/attendanceSlice'; // Import check-in/out actions

const Attendance = () => {
  const dispatch = useDispatch();
  const { checkInStatus, checkOutStatus, checkInTime, checkOutTime, error } = useSelector((state) => state.attendance);

  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle check-in action
  const handleCheckIn = () => {
    dispatch(checkIn())
      .then((response) => {
        console.log("response", response)
        setSuccessMessage(`Check-in successful at ${response.payload.checkInTime}`);
        setIsSuccessMessageVisible(true);
      })
      .catch((error) => {
        // Ensure error is a string before setting
        setSuccessMessage(error.message || 'Check-in failed');
        setIsSuccessMessageVisible(true);
      });
  };

  // Handle check-out action
  const handleCheckOut = () => {
    dispatch(checkOut())
      .then((response) => {
        setSuccessMessage(`Check-out successful at ${response.payload.checkOutTime}`);
        setIsSuccessMessageVisible(true);
      })
      .catch((error) => {
        // Ensure error is a string before setting
        setSuccessMessage(error.message || 'Check-out failed');
        setIsSuccessMessageVisible(true);
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar Placeholder */}
      <div className="w-64 bg-gradient-to-br from-indigo-600 to-teal-500 text-white">
        {/* Sidebar content here */}
      </div>

      {/* Right Content Area */}
      <div className="flex-grow p-6">
        <div className="flex justify-end space-x-4">
          {/* Check-in Button */}
          <button
            onClick={handleCheckIn}
            disabled={checkInStatus === 'completed'}
            className="btn btn-primary"
          >
            Check-in
          </button>

          {/* Check-out Button */}
          <button
            onClick={handleCheckOut}
            disabled={checkOutStatus === 'completed' || checkInStatus !== 'completed'}
            className="btn btn-secondary"
          >
            Check-out
          </button>
        </div>

        {/* Success/Error Message */}
        {isSuccessMessageVisible && (
          <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-md shadow-md">
            <p>{successMessage}</p>
            <button
              onClick={() => setIsSuccessMessageVisible(false)}
              className="btn btn-sm btn-success mt-2"
            >
              Close
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-100 text-red-800 p-4 rounded-md shadow-md">
            <p>{error}</p> {/* Ensure error is a string */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
