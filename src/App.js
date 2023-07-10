import React from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';

import Admin from './pages/Admin';
import Sales from './pages/Sales';
import Login from './pages/Login';

function App() {
  const navigate = useNavigate();

   return (
    <Routes>
      <Route path="/" element={<Admin navigate={navigate} />} />
      <Route path="/login" element={<Login navigate={navigate} />} />
      <Route path="/sales" element={<Sales navigate={navigate} />} />
    </Routes>
  );
}
export default App;
