import { Link } from "react-router-dom";

const CompaniesDataDashboard = ({ dashboardData }) => {

    // const uniqueCompanies = data.reduce((acc, item) => {
    //     // if (item?.company && !acc[item?.company._id]) {
    //     //     acc[item?.company._id] = item?.company;
    //     // }
    //     console.log(item.company?.name);
    //     return acc;
    // }, {});

    return (
        <>
            <div className="h-auto max-w-5xl p-4 mx-auto">
                <p className="m-2 text-lg font-bold text-center ">Companies</p>
                <p className="m-4 ">List of companies  registered </p>

                <div className="overflow-x-auto ">
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
                            {dashboardData?.companies.map((company) => (
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
                                            View Job Posts
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CompaniesDataDashboard;
