import React from 'react'
import Layout from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import About from './pages/about/About'
import NewComplaint from './pages/citizen/complaint/NewComplaint'
import AllComplaint from './pages/citizen/complaint/AllComplaint'
import ViewComplaint from './pages/citizen/complaint/ViewComplaint'
import PayBill from './pages/citizen/bill/PayBill'
import NearbyComplaints from './pages/citizen/complaint/NearbyComplaints'

const CitizenRoutes = () => {
    return (
        <Layout>
            <Routes>

                <Route path='complaint' element={<NewComplaint />} />
                <Route path='view-complaint' element={<AllComplaint />} />
                <Route path='view-complaint/:complaintId' element={<ViewComplaint />} />
                <Route path='View-Pay-Bill' element={<PayBill />} />
                <Route path="nearby-complaints" element={<NearbyComplaints />} />

            </Routes>
        </Layout>
    )
}

export default CitizenRoutes
