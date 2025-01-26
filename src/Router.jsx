import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tool from './Tool';
import App from './App';
import Admin from './Admin';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tool />}>
          <Route index element={<App />} />
          <Route path="app" element={<App />} />
          <Route path="admin" element={<Admin />} />
          <Route path="tool" element={<Tool />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
