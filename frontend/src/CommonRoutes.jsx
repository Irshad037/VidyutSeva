import React from 'react'
import Layout from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import About from './pages/about/About'

const CommonRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path='about' element={<About />} />
            </Routes>
        </Layout>
    )
}

export default CommonRoutes;