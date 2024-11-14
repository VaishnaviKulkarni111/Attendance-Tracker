import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIn, checkOut } from '../store/attendanceSlice'; // Import actions

const Attendance = () => {
  const dispatch = useDispatch();
  const { checkInStatus, checkOutStatus, checkInTime, checkOutTime } = useSelector((state) => state.attendance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Handle check-in action
  const handleCheckIn = () => {
    dispatch(checkIn())
      .then((response) => {
        setModalMessage(`Check-in successful at ${response.payload.checkInTime}`);
        setIsModalOpen(true);
      })
      .catch((error) => {
        setModalMessage(error.message || 'Check-in failed');
        setIsModalOpen(true);
      });
  };

  // Handle check-out action
  const handleCheckOut = () => {
    dispatch(checkOut())
      .then((response) => {
        setModalMessage(`Check-out successful at ${response.payload.checkOutTime}`);
        setIsModalOpen(true);
      })
      .catch((error) => {
        setModalMessage(error.message || 'Check-out failed');
        setIsModalOpen(true);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start p-6">

      {/* Buttons will be on the right side of the page */}
      <div className="flex justify-end w-full space-x-4">
        <button
          className="btn btn-primary"
          onClick={handleCheckIn}
          disabled={checkInStatus === 'completed'}
        >
          Check-in
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleCheckOut}
          disabled={checkOutStatus === 'completed' || checkInStatus !== 'completed'}
        >
          Check-out
        </button>
      </div>

      {/* Modal for Success Message */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 bg-gray-700 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Success</h3>
            <p>{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-primary mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
