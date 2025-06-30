import React from 'react'
import AdminDashboard from './AdminDashboard'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
    return (
        <div>
            <h1 className='text-2xl font-bold text-center'>Admin</h1>

            <div className='p-8'>
                <Link className='text-xl font-bold text-blue-300 hover:text-blue-500'>
                    Companies
                </Link>
            </div>
        </div>
    )
}

export default AdminSideBar