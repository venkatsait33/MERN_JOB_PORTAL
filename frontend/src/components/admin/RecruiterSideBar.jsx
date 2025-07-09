import { useSelector } from "react-redux";

const RecruiterSideBar = ({ activeMenu, setActiveMenu, setIsSidebarOpen }) => {
    const { user } = useSelector(store => store.auth)
    const menuItems = ['Dashboard', 'New Company', 'Companies', 'Jobs',];

    const handleMenuClick = (item) => {
        setActiveMenu(item);

        // 👇 Close sidebar if on small screens
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="mb-2 text-xl font-semibold">Recruiter Panel</h2>
            <div className="flex items-center justify-center mx-auto" >
                <picture className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full cursor-pointer md:w-18 md:h-18">
                    <img src={user?.profile?.profilePhoto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Recruiter profile picture" />
                </picture>
            </div>
            <h2 className="mb-4 text-xl font-bold">{user?.fullname || "Recruiter"}</h2>
            {menuItems.map((item) => (
                <button
                    key={item}
                    className={`p-2 rounded text-left transition ${activeMenu === item
                        ? 'bg-blue-500 text-white font-semibold'
                        : 'bg-transparent text-gray-700 hover:bg-blue-100'
                        }`}
                    onClick={() => handleMenuClick(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default RecruiterSideBar