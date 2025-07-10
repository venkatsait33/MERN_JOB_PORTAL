import AdminSideBar from './AdminSideBar'
import CompaniesDataDashboard from './CompaniesDataDashboard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ADMIN_DETAILS } from '../../utils/axiosApiConstants'
import AdminDashboard from './AdminDashboard'
import AdminJobsDataDashboard from './AdminJobsDataDashboard'
import { IoClose } from 'react-icons/io5'
import { FaBars } from 'react-icons/fa'

const AdminDashBoardLayout = () => {
    const [dashboardData, setDashboardData] = useState()
    const [loading, setLoading] = useState(true)
    const [activeMenu, setActiveMenu] = useState(() => {
        return localStorage.getItem('activeMenu') || 'Dashboard';
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchAdminData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${ADMIN_DETAILS}/recruiters-jobs-candidates`, {
                withCredentials: true
            })

            if (res.data.success) {
                setDashboardData(res.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAdminData();
    }, [])

    useEffect(() => {
        localStorage.setItem('activeMenu', activeMenu);
    }, [activeMenu]);

    const renderActiveComponent = () => {
        switch (activeMenu) {
            case 'Dashboard':
                return <AdminDashboard dashboardData={dashboardData} />;
            case 'Companies':
                return <CompaniesDataDashboard dashboardData={dashboardData} />;
            case 'Jobs':
                return <AdminJobsDataDashboard dashboardData={dashboardData} />;
            default:
                return <AdminDashboard dashboardData={dashboardData} />;
        }
    };

    return (
        <div className='flex w-full h-auto'>
            <div className='p-4 md:w-[300px] '>
                <div className="absolute z-20 top-20 left-1 md:hidden">
                    <button
                        className="p-2 text-white bg-blue-600 rounded"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <IoClose size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Sidebar */}
                <div
                    className={`fixed z-10 max-sm:top-16 left-0 h-full max-sm:bg-base-300 max-sm:w-[200px] shadow-md transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:w-full `}
                >
                    <AdminSideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            </div>
            <div className='w-full p-4 '>
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                ) : (
                    <>
                        {renderActiveComponent()}
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminDashBoardLayout