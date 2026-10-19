import React, { useState } from 'react' 
import { Route, Routes } from 'react-router-dom'; 
import About from './pages/about/About';  
import Layout from './layouts/Layout';
import CommonRoutes from './CommonRoutes';
import CitizenRoutes from './CitizenRoutes'; 
import AdminRoutes from './AdminRoutes';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <Routes>
      {/*admin */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/*admin */}
      <Route path="/citizen/*" element={<CitizenRoutes />} />

      {/*common */} 
      <Route path="/*" element={<CommonRoutes />} />
    </Routes>
  )
}

export default App

 