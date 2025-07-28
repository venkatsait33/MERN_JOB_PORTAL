import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../../utils/axiosApiConstants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../../../redux/applicationSlice";
import { IoArrowBack } from "react-icons/io5";

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  const fetchAllApplicants = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setApplicants(res.data.job));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllApplicants();
  }, []);
  return (
    <div className="max-w-7xl p-4 mx-auto  ">
      <div className="mt-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-xl btn btn-circle btn-sm"
        >
          <IoArrowBack />
        </button>
      </div>
      <div className="">
        <h1 className="mt-2 text-xl font-bold ">
          Applicants: {applicants?.applications?.length}
        </h1>
        <div className="mt-2">
          {applicants?.applications?.length === 0 ? (
            <p>No applicants found</p>
          ) : (
            <ApplicantsTable fetchAllApplicants={fetchAllApplicants} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
