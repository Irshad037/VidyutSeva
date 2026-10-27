import React from 'react'
import Layout from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/admin/dashboard/AdminDashboard'
import ComplaintManagement from './pages/admin/complaint/ComplaintManagement'
import ActivityLog from './pages/admin/activityLog/ActivityLog'

const AdminRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="complaints" element={<ComplaintManagement />} />
                <Route path="activity-log" element={<ActivityLog />} />
            </Routes>
        </Layout>
    )
}

export default AdminRoutes  