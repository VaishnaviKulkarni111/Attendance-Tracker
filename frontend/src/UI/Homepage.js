import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, userType } = useSelector((state) => state.auth);

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
        navigate('/emp-dashboard');
      } else if (userType === 'manager') {
        navigate('/mdashboard');
      }
    }
  }, [token, userType, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser({
        fname: formData.fname,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section with Background */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/homebg.png')" }}
      >
        <div className="absolute top-4 left-6 z-10">
          <h1 className="text-3xl font-bold text-blue-900">Attendance Tracker</h1>
        </div>
      </div>

      {/* Right Section with Forms */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
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
