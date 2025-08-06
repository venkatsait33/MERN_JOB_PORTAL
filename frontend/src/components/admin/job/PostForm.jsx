import {
  englishLevel,
  jobCategory,
  jobType,
  locations,
  gender,
  jobShifts,
  department,
} from "../../../utils/UtilsData";
import MDEditor, { commands } from "@uiw/react-md-editor";

const PostForm = ({
  submitHandler,
  input,
  cancelButton,
  handleDescriptionChange,
  changeEventHandler,
  companies,
  handleSelectHandler,
  loading,
  name,
  button,
  navigate,
}) => {
  // const callback = useCallback()
  return (
    <div className="p-4 border border-gray-300 rounded-lg ">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 w-[80%] mx-auto"
      >
        <div>
          <h1 className="font-bold text-center max-sm:mt-6 max-sm:text-lg md:text-xl">
            {name}
          </h1>
        </div>

        <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
          <label
            htmlFor=""
            className="block mb-2 text-lg font-medium text-center max-sm:text-base"
          >
            Title
          </label>
          <input
            type="text"
            className=" input input-bordered"
            name="title"
            required
            value={input.title}
            onChange={changeEventHandler}
          />
        </div>
        {/* <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                    <label htmlFor="" className="block mb-2 text-lg font-medium text-center max-sm:text-base">Description</label>
                    required<input type="text" name='description' value={input.description} className=' input input-bordered' 
                    onChange={changeEventHandler} />
                </div> */}
        <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
          <label
            htmlFor=""
            className="block mb-2 text-lg font-medium text-center max-sm:text-base"
          >
            Requirements
          </label>
          <input
            type="text"
            value={input.requirements}
            className=" input input-bordered"
            name="requirements"
            required
            onChange={changeEventHandler}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="block mb-2 text-lg font-medium text-center max-sm:text-base">
            Job Role
          </p>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label className="block mb-2 text-lg font-medium max-sm:text-base">
              Department
            </label>

            <select
              className="select select-bordered"
              name="department"
              value={input.department}
              required
              onChange={changeEventHandler}
            >
              <option value="" disabled>
                Select Department
              </option>
              {department.map((dep, index) => (
                <option key={index} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label className="block mb-2 text-lg font-medium max-sm:text-base">
              Category
            </label>

            <select
              className="select select-bordered"
              name="category"
              value={input.category}
              required
              onChange={changeEventHandler}
            >
              <option value="" disabled>
                Select Job Category
              </option>
              {jobCategory.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label className="block mb-2 text-lg font-medium max-sm:text-base">
              Locations
            </label>
            <select
              className="select select-bordered"
              name="location"
              value={input.location}
              required
              onChange={changeEventHandler}
            >
              <option value="" disabled>
                Select Job Location
              </option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label className="block mb-2 text-lg font-medium max-sm:text-base">
              Employment Type
            </label>
            <select
              className="select select-bordered"
              name="jobType"
              value={input.jobType}
              required
              onChange={changeEventHandler}
            >
              <option value="" disabled>
                Select Employment Type
              </option>
              {jobType.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label className="block mb-2 text-lg font-medium max-sm:text-base">
              Job-Shifts
            </label>
            <select
              className="select select-bordered"
              name="jobShifts"
              value={input.jobShifts}
              required
              onChange={changeEventHandler}
            >
              <option value="" disabled>
                Select Job Shifts
              </option>
              {jobShifts.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="block mb-2 text-lg font-medium text-center max-sm:text-base">
            Job Requirements
          </p>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label
              htmlFor=""
              className="block mb-2 text-lg font-medium text-center max-sm:text-base"
            >
              Year of Experience
            </label>
            <input
              type="number"
              value={input.experience}
              className=" input input-bordered"
              name="experience"
              required
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label
              htmlFor=""
              className="block mb-2 text-lg font-medium text-center max-sm:text-base"
            >
              Education
            </label>
            <input
              type="text"
              value={input.education}
              className=" input input-bordered"
              name="education"
              required
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label className="block mb-2 text-lg font-medium max-sm:text-base">
              English Level
            </label>
            <select
              className="select select-bordered"
              name="englishLevel"
              value={input.englishLevel}
              required
              onChange={changeEventHandler}
            >
              <option value="" disabled>
                Select Level of english
              </option>
              {englishLevel.map((english, index) => (
                <option key={index} value={english}>
                  {english}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
            <label className="block mb-2 text-lg font-medium max-sm:text-base">
              Gender
            </label>
            <select
              className="select select-bordered"
              name="gender"
              value={input.gender}
              onChange={changeEventHandler}
            >
              <option value="" disabled>
                Select Gender
              </option>
              {gender.map((gen, index) => (
                <option key={index} value={gen}>
                  {gen}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
          <label
            htmlFor=""
            className="block mb-2 text-lg font-medium text-center max-sm:text-base"
          >
            Salary
          </label>
          <input
            type="text"
            value={input.salary}
            className=" input input-bordered"
            name="salary"
            onChange={changeEventHandler}
          />
        </div>
        <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
          <label
            htmlFor=""
            className="block mb-2 text-lg font-medium text-center max-sm:text-base"
          >
            No of Position
          </label>
          <input
            type="number"
            value={input.positions}
            className=" input input-bordered"
            name="positions"
            onChange={changeEventHandler}
          />
        </div>
        <div className="flex items-center justify-between gap-4 max-sm:flex-col ">
          <label
            htmlFor=""
            className="block mb-2 text-lg font-medium text-center max-sm:text-base"
          >
            Company
          </label>
          {companies.length >= 0 && (
            <div>
              <select
                defaultValue=""
                className="select"
                onChange={handleSelectHandler}
              >
                <option value="" disabled>
                  Select company
                </option>
                {companies.map((company) => (
                  <option key={company._id} value={company.name.toLowerCase()}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <p className="block mb-2 text-lg font-medium text-center max-sm:text-base">
            Job Description
          </p>
          <MDEditor
            value={input.description}
            onChange={handleDescriptionChange}
            name="description"
            commands={[
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
              commands.title,
            ]}
            hideMenu={true}
          />
        </div>

        <div className="flex items-center justify-between gap-4 mx-auto">
          {loading ? (
            <button className="mt-4 btn btn-neutral">
              <span className="loading loading-spinner loading-lg"></span>
            </button>
          ) : (
            <button type="submit" className="mt-4 btn btn-neutral">
              {button}
            </button>
          )}
          {cancelButton ? (
            loading ? (
              <button className="mt-4 btn btn-neutral">
                <span className="loading loading-spinner loading-lg"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="mt-4 btn btn-error"
                onClick={() => navigate("/recruiter/dashboard")}
              >
                {cancelButton}
              </button>
            )
          ) : null}
        </div>

        {companies.length === 0 && (
          <p className="my-3 text-xs font-bold text-center text-red-600">
            *Please register a company first, before posting a jobs
          </p>
        )}
      </form>
    </div>
  );
};

export default PostForm;
