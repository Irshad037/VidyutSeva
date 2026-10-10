import React, { useState } from 'react'
import Sidebar from './layouts/sidebar/Sidebar'
import Header from './layouts/header/Header'
import NewComplaint from './pages/citizen/complaint/NewComplaint';
import AllComplaint from './pages/citizen/complaint/AllComplaint'; 
import { Route, Routes } from 'react-router-dom';
import ViewComplaint from './pages/citizen/complaint/ViewComplaint';
import PayBill from './pages/citizen/bill/PayBill';
import About from './pages/about/About';

const App = () => {
   const [isOpen, setIsOpen] = useState (false);
  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <div className='bg-[#fcf6e9] min-h-screen text-foreground'>{/*bg-[#fcf6e9] */}


      <Sidebar   isOpen={isOpen} toggleSidebar={toggleSidebar}  />
      <div className='flex flex-col md:ml-[210px] lg:ml-[290px]'>
        <Header />
        <Routes>
          <Route path='/about' element={<About/>}/>
          <Route path='/citizen/complaint' element={<NewComplaint/>}/>
          <Route path='/citizen/view-complaint' element={<AllComplaint/>}/>
          <Route path='/citizen/view-complaint/:complaintId' element={<ViewComplaint/>}/>
          <Route path='/citizen/View-Pay-Bill' element={<PayBill/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App