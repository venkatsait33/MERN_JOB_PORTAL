import { IoArrowBack } from 'react-icons/io5'
import { englishLevel, jobCategory, jobType, locations, gender, jobShifts, department } from '../../selectOptionsData'
import MDEditor, { commands } from '@uiw/react-md-editor';


const PostForm = ({ submitHandler, input, handleDescriptionChange, navigate, changeEventHandler, companies, handleSelectHandler, loading, name, button }) => {
    // const callback = useCallback()
    return (
        <div className='p-4 border border-gray-300 rounded-lg '>
            <button onClick={() => navigate('/recruiter/jobs')} className='flex items-center gap-3 font-semibold btn sm:btn-sm btn-outline'>
                <IoArrowBack /> <span>Back</span>
            </button>
            <form onSubmit={submitHandler}
                className='flex flex-col gap-6 w-[80%] mx-auto'>
                <div >
                    <h1 className='font-bold text-center max-sm:mt-6 max-sm:text-lg md:text-xl'>{name}</h1>
                </div>

                <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                    <label htmlFor="" className="block mb-2 text-lg font-medium text-center">Title</label>
                    <input type="text" className=' input input-bordered' name='title' value={input.title} onChange={changeEventHandler} />
                </div>
                {/* <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                    <label htmlFor="" className="block mb-2 text-lg font-medium text-center">Description</label>
                    <input type="text" name='description' value={input.description} className=' input input-bordered' onChange={changeEventHandler} />
                </div> */}
                <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                    <label htmlFor="" className="block mb-2 text-lg font-medium text-center">Requirements</label>
                    <input type="text" value={input.requirements} className=' input input-bordered' name='requirements' onChange={changeEventHandler} />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className="block mb-2 text-lg font-medium text-center">Job Role</p>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label className="block mb-2 text-lg font-medium">Department</label>

                        <select
                            className="select select-bordered"
                            name="department"
                            value={input.department}
                            onChange={changeEventHandler}
                        >
                            <option value="" disabled>Select Department</option>
                            {department.map((dep, index) => (
                                <option key={index} value={dep}>
                                    {dep}
                                </option>
                            ))}
                        </select>
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
                        <label className="block mb-2 text-lg font-medium">Employment Type</label>
                        <select
                            className="select select-bordered"
                            name="jobType"
                            value={input.jobType}
                            onChange={changeEventHandler}
                        >
                            <option value="" disabled>Select Employment Type</option>
                            {jobType.map((job, index) => (
                                <option key={index} value={job}>
                                    {job}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label className="block mb-2 text-lg font-medium">Job-Shifts</label>
                        <select
                            className="select select-bordered"
                            name="jobShifts"
                            value={input.jobShifts}
                            onChange={changeEventHandler}
                        >
                            <option value="" disabled>Select Job Shifts</option>
                            {jobShifts.map((job, index) => (
                                <option key={index} value={job}>
                                    {job}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <p className="block mb-2 text-lg font-medium text-center">Job Requirements</p>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label htmlFor="" className="block mb-2 text-lg font-medium text-center">Year of Experience</label>
                        <input type="number" value={input.experience} className=' input input-bordered' name='experience' onChange={changeEventHandler} />
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label htmlFor="" className="block mb-2 text-lg font-medium text-center">Education</label>
                        <input type="text" value={input.education} className=' input input-bordered' name='education' onChange={changeEventHandler} />
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label className="block mb-2 text-lg font-medium">English Level</label>
                        <select
                            className="select select-bordered"
                            name="englishLevel"
                            value={input.englishLevel}
                            onChange={changeEventHandler}
                        >
                            <option value="" disabled>Select Level of english</option>
                            {englishLevel.map((english, index) => (
                                <option key={index} value={english}>
                                    {english}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label className="block mb-2 text-lg font-medium">Gender</label>
                        <select
                            className="select select-bordered"
                            name="gender"
                            value={input.gender}
                            onChange={changeEventHandler}
                        >
                            <option value="" disabled>Select Gender</option>
                            {gender.map((gen, index) => (
                                <option key={index} value={gen}>
                                    {gen}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                    <label htmlFor="" className="block mb-2 text-lg font-medium text-center">Salary</label>
                    <input type="text" value={input.salary} className=' input input-bordered' name='salary' onChange={changeEventHandler} />
                </div>
                <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                    <label htmlFor="" className="block mb-2 text-lg font-medium text-center">No of Position</label>
                    <input type="number" value={input.positions} className=' input input-bordered' name='positions' onChange={changeEventHandler} />
                </div>
                <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                    <label htmlFor="" className="block mb-2 text-lg font-medium text-center">Company</label>
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

                <div>
                    <MDEditor value={input.description} onChange={handleDescriptionChange} name='description' commands={[
                        commands.bold,
                        commands.italic,
                        commands.strikethrough,
                        commands.code,
                        commands.link,
                        commands.divider,
                        commands.image,
                        commands.unorderedListCommand,
                        commands.orderedListCommand,
                        commands.checkedListCommand,
                        commands.title
                    ]} hideMenu={true} />
                </div>

                {
                    companies.length === 0 && <p className='my-3 text-xs font-bold text-center text-red-600'>*Please register a company first, before posting a jobs</p>
                }


            </form></div>
    )
}

export default PostForm