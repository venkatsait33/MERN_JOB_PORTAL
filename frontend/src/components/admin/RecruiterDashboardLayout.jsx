import { useState } from "react";
import Companies from "./company/Companies";
import AdminJobPosts from "./job/AdminJobPosts";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import RecruiterSideBar from "./RecruiterSideBar";
import CreateCompany from "./company/CreateComapny";

const RecruiterDashboardLayout = () => {
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderActiveComponent = () => {
    switch (activeMenu) {

      case 'Companies':
        return <Companies />;
      case 'New Company':
        return <CreateCompany />;
      case 'Jobs':
        return <AdminJobPosts />;
      default:
        return <Companies />;
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
          className={`fixed z-10 max-sm:top-20 left-0 h-full max-sm:bg-base-300 sm:w-1/2 shadow-md transform transition-transform duration-300 ease-in-out
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