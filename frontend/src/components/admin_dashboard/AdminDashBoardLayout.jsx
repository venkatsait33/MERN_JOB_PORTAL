import AdminSideBar from './AdminSideBar'
import AdminDashboard from './AdminDashboard'

const AdminDashBoardLayout = () => {
    return (
        <div className='flex h-auto md:h-[60vh]'>
            <div className='w-1/5 p-4 max-sm:hidden'>
                <AdminSideBar />
            </div>
            <div className='p-4 md:w-4/5'>
                <AdminDashboard />
            </div>
        </div>
    )
}

export default AdminDashBoardLayout