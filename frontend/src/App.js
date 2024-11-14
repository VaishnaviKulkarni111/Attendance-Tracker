import './App.css';
import {  Routes, Route } from "react-router-dom";
import Homepage from './UI/Homepage';
import Sidebar from './UI/Sidebar';
import Attendance from './employee/Attendance';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <div>
       {isLoggedIn === "true" && <Sidebar/> }
      <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/attendance" element={<Attendance />} />

      </Routes>
    </div>
  
  );
}

export default App;
