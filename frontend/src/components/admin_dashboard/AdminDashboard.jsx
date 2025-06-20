import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
    const { data } = useSelector(store => store.admin);

    const uniqueCompanies = data.reduce((acc, item) => {
        if (item?.company && !acc[item?.company._id]) {
            acc[item?.company._id] = item?.company;
        }
        return acc;
    }, {});

    return (
        <div className="max-w-5xl p-4 mx-auto md:h-[55vh]">
            <h1 className="mb-4 text-xl font-bold text-center">Admin Dashboard - Companies</h1>

            <div className="overflow-x-auto">
                <table className="table w-full rounded bg-base-100">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Company Name</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object?.values(uniqueCompanies).map((company) => (
                            <tr key={company._id}>
                                <td>
                                    <img src={company?.logo} alt="logo" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="font-semibold">{company?.name}</td>
                                <td>{company?.location}</td>
                                <td>
                                    <Link
                                        to={`/admin/dashboard/company/${company?._id}`}
                                        className="text-blue-600 underline"
                                    >
                                        View Jobs
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
