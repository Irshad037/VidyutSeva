import React from 'react'
import Layout from './layouts/Layout'
import { Route, Routes } from 'react-router-dom' 
import AdminDashboard from './pages/admin/dashboard/AdminDashboard'
import ComplaintManagement from './pages/admin/complaint/ComplaintManagement'

const Admin = () => {
    return (
        <Layout>
            <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="complaints" element={<ComplaintManagement />} />
            </Routes>
        </Layout>
    )
}

export default Admin