import UseGetAllJobs from "../hooks/UseGetAllJobs";
import { useNavigate } from "react-router-dom";
import {
  HomeCoverSection,
  JobOpeningsSection,
  LatestJobs,
  PlayStoreApp,
  PopularSearch,
  Reviews,
} from "../components/home_page";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const HomePage = () => {
  
  UseGetAllJobs();
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="">
        <HomeCoverSection />
        <PopularSearch />
        <JobOpeningsSection />
        <LatestJobs />
        <div className="flex items-center justify-center w-full h-[300px] bg-white text-black ">
          <div className="flex flex-col gap-10">
            <h1 className="text-2xl font-bold">Trending job roles</h1>
            <button
              onClick={() => navigate("/jobs")}
              className="btn hover:bg-[#1F8268] btn-outline border border-[#1F8268]"
            >
              View all
            </button>
          </div>
        </div>
        <PlayStoreApp />
        <Reviews />
        
      </div>
    </div>
  );
};

export default HomePage;
