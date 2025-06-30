import AdminSideBar from './AdminSideBar'
import AdminDashboard from './AdminDashboard'

const AdminDashBoardLayout = () => {
  return (
        <div className='flex h-auto md:h-[60vh]'>
            <div className='w-1/5 p-4 '>
                <AdminSideBar />
            </div>
            <div className='w-4/5 p-4'>
                <AdminDashboard />
            </div>
        </div>
    )
}

export default AdminDashBoardLayout