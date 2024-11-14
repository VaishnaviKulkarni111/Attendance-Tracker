import './App.css';
import {  Routes, Route } from "react-router-dom";
import Homepage from './UI/Homepage';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/home" element={<Homepage />} />
      </Routes>
    </div>
  
  );
}

export default App;
