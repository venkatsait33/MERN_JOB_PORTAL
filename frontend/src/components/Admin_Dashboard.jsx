import { useSelector } from "react-redux";
import UseGetAllDataForAdmin from "../hooks/UseGetAllDataForAdmin";



const Admin_Dashboard = () => {
    const { user } = useSelector(store => store.auth);
    const { data } = useSelector(store => store.admin);

    if (!user || user.role !== 'admin') {
        return null; // or redirect, or show "Access Denied"
    }

    UseGetAllDataForAdmin(user); // Safe to use now


    return (
        <div className="max-w-4xl p-4 mx-auto">
            <h1 className="text-xl text-center ">Admin DashBoard</h1>
           
            {data.map((item, index) => (
                <div key={index} className="p-4 my-4 border rounded-lg bg-base-100 ">
                    
                    <div>

                        <div className=' max-w-screen'>
                            <div className="overflow-x-auto border rounded-box border-base-content/5 bg-base-100">
                                <h1 className='mt-2 text-center '> Company Details</h1>

                                <table className="table">

                                    <thead>
                                        <tr>
                                            <th>Logo</th>
                                            <th>Name</th>
                                            <th>Location</th>
                                            <th>Web Site</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={index}>
                                            <td>{
                                                item?.company?.logo && <figure className="w-10 h-10 rounded-full btn btn-circle btn-ghost">
                                                    <img src={item?.company?.logo} alt="" />
                                                </figure>
                                            }</td>

                                            <td>
                                                Name {item?.company?.name}
                                            </td>
                                            <td>
                                                Location {item?.company?.location || "N/A"}
                                            </td>
                                            <td><a href={item?.company?.website || "#"} target="_blank" rel="noreferrer" className="link">
                                                Website
                                            </a></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3 border collapse collapse-arrow bg-base-100 ">
                        <input type="checkbox" />
                        <div className="font-semibold collapse-title">Job Post and Applicants </div>
                        <div className="text-sm collapse-content">
                            <div className='mt-2 max-w-screen'>
                                <div className="overflow-x-auto border rounded-box border-base-content/5 bg-base-100">
                                    <div className="flex items-center justify-between p-4 ">

                                        <h1>Recruiter Name: {item?.created_by?.fullname || "N/A"}</h1>
                                        <h1>Email: {item?.created_by?.email || "N/A"}</h1>
                                        <h1>Phone Number: {item?.created_by?.phoneNumber || "N/A"}</h1>

                                    </div>
                                    <div className=" divider">

                                    </div>
                                    <h1 className='text-center '>Job Details</h1>


                                    <table className="table">

                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                               
                                                <th>Location</th>
                                                <th>Type</th>
                                                <th>Salary</th>
                                                <th>Experience</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={index}>
                                                <td> {item?.title}</td>
                                               
                                                <td> {item?.location}</td>
                                                <td> {item?.jobType}</td>
                                                <td> {item?.salary}</td>
                                                <td> {item?.experience || "0 Yr"} yr</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {
                                item?.applications.length > 0 ? (
                                    <div className="mt-2 border collapse-arrow collapse bg-base-100 border-base-300">
                                    <input type="checkbox" />
                                    <div className="font-semibold collapse-title">Job Applied Candidate details</div>
                                    <div className="text-sm collapse-content">
                                        <div >
                                            {item?.applications?.map((app, i) => (
                                                <div key={i} className="p-2 my-2 mt-2 ml-2">

                                                    <div className=' max-w-screen'>
                                                        <div className="overflow-x-auto border rounded-box border-base-content/5 bg-base-100">
                                                            <h1 className='mt-2 text-center '>Candidate / Applicant Details</h1>

                                                            <table className="table">

                                                                <thead>
                                                                    <tr>
                                                                        <th> Name</th>
                                                                        <th> Email</th>
                                                                        <th> PhoneNumber:</th>
                                                                        <th> Resume:</th>
                                                                        <th> Status:</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={index}>
                                                                        <td> {app?.applicant?.fullname}</td>
                                                                        <td> {app?.applicant?.email}</td>
                                                                        <td> {app?.applicant?.phoneNumber}</td>
                                                                        <td>
                                                                            {" "}
                                                                            <a
                                                                                href={app?.applicant?.resume}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-600 underline"
                                                                            >
                                                                                View Resume
                                                                            </a>
                                                                        </td>
                                                                        <td>
                                                                            {app?.status}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>) :
                                    <div className="p-4 mt-2 border rounded border-base-400 ">No Applications</div>
                            }
                        </div>
                    </div>



                   




                </div>
            ))
            }
        </div >

    )
}

export default Admin_Dashboard