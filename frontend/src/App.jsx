import React, { useState } from 'react' 
import { Route, Routes } from 'react-router-dom'; 
import About from './pages/about/About'; 
import Admin from './Admin';
import Citizen from './citizen';
import Layout from './layouts/Layout';
import CommonRoutes from './CommonRoutes';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <Routes>
      {/*admin */}
      <Route path="/admin/*" element={<Admin />} />

      {/*admin */}
      <Route path="/citizen/*" element={<Citizen />} />

      {/*common */} 
      <Route path="/*" element={<CommonRoutes />} />
    </Routes>
  )
}

export default App