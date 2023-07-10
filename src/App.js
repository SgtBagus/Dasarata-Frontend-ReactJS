import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate, Outlet,
} from 'react-router-dom';

import Layout from './pages/layout';

import Admin from './pages/Admin';
import Sales from './pages/Sales';
import Login from './pages/Login';

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function LayoutAdmin() {
  return (
    <Layout navigate={useNavigate()}><Outlet /></Layout>
  );
}

function App() {
  return (
    <Routes mode="absolute">
      <Route path="/login" element={<Login navigate={useNavigate()} useEffect={useEffect} />} />
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<Admin navigate={useNavigate()} />} />
        <Route path="product" element={<Sales navigate={useNavigate()} />} />
      </Route>
      <Route path="/sales" element={<Sales navigate={useNavigate()} />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
export default App;
