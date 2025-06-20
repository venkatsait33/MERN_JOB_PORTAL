import { IoArrowBack } from 'react-icons/io5'
import { jobCategory, jobType, locations } from '../../selectOptionsData'

const PostForm = ({ navigate, submitHandler, input, changeEventHandler, companies, handleSelectHandler, loading, name, button }) => {
    return (
        <div>   <form onSubmit={submitHandler} className='flex flex-col gap-6 w-[80%] p-8 mx-auto border border-gray-300 rounded-lg'>
            <div className='' >
                <button onClick={() => navigate('/admin/jobs')} className='flex items-center gap-3 font-semibold btn sm:btn-sm btn-outline'>
                    <IoArrowBack /> <span>Back</span>
                </button>
                <h1 className='font-bold text-center max-sm:mt-6 max-sm:text-lg md:text-xl'>{name}</h1>
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label htmlFor="">Title</label>
                <input type="text" className=' input input-bordered' name='title' value={input.title} onChange={changeEventHandler} />
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label htmlFor="">Description</label>
                <input type="text" name='description' value={input.description} className=' input input-bordered' onChange={changeEventHandler} />
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label htmlFor="">Requirements</label>
                <input type="text" value={input.requirements} className=' input input-bordered' name='requirements' onChange={changeEventHandler} />
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label className="block mb-2 text-lg font-medium">Category</label>

                <select
                    className="select select-bordered"
                    name="category"
                    value={input.category}
                    onChange={changeEventHandler}
                >
                    <option value="" disabled>Select Job Category</option>
                    {jobCategory.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label className="block mb-2 text-lg font-medium">Locations</label>
                <select
                    className="select select-bordered"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                >
                    <option value="" disabled>Select Job Location</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>            
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label className="block mb-2 text-lg font-medium">JobType</label>
                <select
                    className="select select-bordered"
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                >
                    <option value="" disabled>Select Job Type</option>
                    {jobType.map((job, index) => (
                        <option key={index} value={job}>
                            {job}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label htmlFor="">Salary</label>
                <input type="text" value={input.salary} className=' input input-bordered' name='salary' onChange={changeEventHandler} />
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label htmlFor="">Year of Experience</label>
                <input type="number" value={input.experience} className=' input input-bordered' name='experience' onChange={changeEventHandler} />
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label htmlFor="">No of Position</label>
                <input type="number" value={input.positions} className=' input input-bordered' name='positions' onChange={changeEventHandler} />
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                <label htmlFor="">Company</label>
                {
                    companies.length >= 0 && <div>
                        <select defaultValue="" className="select" onChange={handleSelectHandler}>
                            <option value="" disabled>Select company</option>
                            {companies.map((company) => (
                                <option key={company._id} value={company.name.toLowerCase()}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }
            </div>

            <div className='flex items-center justify-between mx-auto'>

                {loading ? <button className='mt-4 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                    <button type='submit' className="mt-4 btn btn-neutral">{button}</button>
                }
            </div>

            {
                companies.length === 0 && <p className='my-3 text-xs font-bold text-center text-red-600'>*Please register a company first, before posting a jobs</p>
            }


        </form></div>
    )
}

export default PostForm