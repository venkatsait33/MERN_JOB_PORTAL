import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingText = () => {
  return (
    <div className="text-3xl font-bold  my-4">
      <span>Handpicked Premium - </span>
      <span className="text-[#1F8268]">
        <TypeAnimation
          sequence={[
            "Software",
            2000,
            "Remote",
            2000,
            "Marketing",
            2000,
            "Design",
            2000,
            "Frontend Developer",
            2000,
            "Backend Developer",
            2000,
            "Full Stack Developer",
            2000,
            "Data Scientist",
            2000,
            "Machine Learning Engineer",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </span>
      <span> jobs</span>
    </div>
  );
};

export default TypingText;
