import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";
import imagelofo from "./Logo-Full-Light.png"; // Corrected import statement

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

      {/* Section 1 */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-[470px]">
        {backgroundGradient}

        {/* Image with styling */}
        <img
          src={imagelofo}
          alt="Logo - Mess logo"
          className="w-auto max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default CodeBlocks;