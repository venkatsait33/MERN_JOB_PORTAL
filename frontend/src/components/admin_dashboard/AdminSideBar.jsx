
const AdminSideBar = ({ activeMenu, setActiveMenu, setIsSidebarOpen }) => {
    const menuItems = ['Dashboard', 'Companies', 'Jobs'];

    const handleMenuClick = (item) => {
        setActiveMenu(item);

        // 👇 Close sidebar if on small screens
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="mb-4 text-xl font-bold">Admin Panel</h2>
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

export default AdminSideBar;
