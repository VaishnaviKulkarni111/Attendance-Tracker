import React from 'react';

function Homepage() {
  return (
    <div className="min-h-screen  bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: "url('/homebg.png')" }} 
    >
      {/* Overlay for background effect */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

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
        <div className="card w-full lg:w-1/3 bg-white shadow-xl p-6 lg:ml-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sign Up</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full mt-4">
              Create Account
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account? <a href="/login" className="text-blue-600">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
