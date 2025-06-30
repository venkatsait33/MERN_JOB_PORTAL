import React from 'react'
import { useSelector } from 'react-redux'
import UseGetAppliedJobs from '../../hooks/UseGetAppliedJobs'

const AppliedJobTable = () => {
    UseGetAppliedJobs()
    const { allAppliedJobs } = useSelector(store => store.job)


    return (
        <div className='h-auto'>
            {
                allAppliedJobs.length <= 0 ?
                    <div className="md:h-[40vh]"><p className="text-xl">  No active job applications.</p></div>
                    :
                    <div className="mt-4 overflow-x-auto border rounded-box border-base-content/5 bg-base-100">
                        <h1 className='my-2 text-lg font-semibold text-center '>Applied Jobs</h1>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Date</th>
                                    <th>Job</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allAppliedJobs.map((item, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.createdAt.split("T")[0]}</td>
                                        <td>{item?.job?.title || "N/A"}</td>
                                        <td>{item?.job?.company?.name || "N/A"}</td>
                                        <td>
                                            <div className={`badge ${item?.status === "rejected" ? "bg-red-400 " : item?.status === "pending" ? "bg-gray-400" : "bg-green-400"}`}>{item?.status || "N/A"}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default AppliedJobTable