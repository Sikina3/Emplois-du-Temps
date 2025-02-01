import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tool from "./Tool";
import App from "./Home/App";
import Admin from "./Admin/Admin"
import { WeekProvider } from "./WeekProvider";
import Teach from "./Admin/Teach";
import Level from "./Admin/Level";
import Subject from "./Admin/Subject";
import Class from "./Admin/ClassRoom";

export default function Router() {
  return (
    <BrowserRouter>
      <WeekProvider> 
        <Routes>
          <Route path="/" element={<Tool />}>
            <Route index element={<App />} />
            <Route path="app" element={<App />} />

            <Route path="admin" element={<Admin />}>
              <Route index element={<Teach/>} />
              <Route path="prof" element={<Teach/>} />
              <Route path="niveau" element={<Level/>} />
              <Route path="matiere" element={<Subject/>} />
              <Route path="salle" element={<Class/>} />
            </Route>
          </Route>
        </Routes>
      </WeekProvider>
    </BrowserRouter>
  );
}
