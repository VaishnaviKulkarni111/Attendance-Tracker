import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token, userType } = useSelector((state) => state.auth);
    
  // State to manage form inputs
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fname: '',
    userType: '',
  });

  useEffect(() => {
    // If logged in, redirect to the appropriate dashboard
    if (token) {
      if (userType === 'employee') {
        navigate('/employee/dashboard');
      } else if (userType === 'manager') {
        navigate('/mdashboard');
      }
    }
  }, [token, userType, navigate]);
  // Update form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Dispatch login action
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      // Dispatch register action
      dispatch(registerUser({
        fname: formData.fname,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      }));
    }
  };
  return (
    <div className="min-h-screen  bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: "url('/homebg.png')" }} 
    >
      {/* Overlay for background effect */}
      <div className="absolute inset-0 "></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center lg:flex-row max-w-7xl p-6 mx-auto">
         
        {/* Header Section */}
        <header className="mb-8 text-center lg:text-left lg:mb-0">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">ServiPhi Technologies</h1>
          <p className="text-lg text-black">
            Welcome to the Employee Attendance Tracker. Track your team’s attendance with ease and efficiency.
          </p>
        </header>

        {/* Sign-Up Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
          )}
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full"
          />

          {!isLogin && (
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <p className="text-center mt-4">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Homepage;
