import { useEffect, useState } from "react";
import Companies from "./company/Companies";
import AdminJobPosts from "./job/AdminJobPosts";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import RecruiterSideBar from "./RecruiterSideBar";
import CreateCompany from "./company/CreateComapny";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/axiosApiConstants";
import RecruiterDashboard from "./RecruiterDashboard";
import { useLocation } from "react-router-dom";
import JobPost from "./job/JobPost";

const RecruiterDashboardLayout = () => {
  const [dashboardData, setDashboardData] = useState({});
  const location = useLocation()
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(location.state?.activeMenu || 'Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchRecruiterDetails = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${USER_API_END_POINT}/recruiterDetails`, {
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
    fetchRecruiterDetails();
  }, [])

  useEffect(() => {
    localStorage.setItem('activeMenu', activeMenu);
  }, [activeMenu]);

  const renderActiveComponent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <RecruiterDashboard dashboardData={dashboardData} />;
      case 'New Company':
        return <CreateCompany />;
      case 'New Job':
        return <JobPost />;
      case 'Companies':
        return <Companies />;
      case 'Jobs':
        return <AdminJobPosts />;
      default:
        return <RecruiterDashboard dashboardData={dashboardData} />;
    }
  };

  return (
    <div className='flex w-full h-auto'>
      <div className='p-4 md:w-[300px] '>
        <div className="absolute z-20 top-17 left-1 md:hidden">
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
          <RecruiterSideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} setIsSidebarOpen={setIsSidebarOpen} />
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

export default RecruiterDashboardLayout