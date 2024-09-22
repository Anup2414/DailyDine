import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Footer from "../components/Common/Footer"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"

const About = () => {
  return (
    <div>
      {/* <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Revolutionizing the Mess Experience with 
            <HighlightText text={"DailyDine"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              DailyDine is transforming the way hostellers and local diners find their daily meals by bringing mess menus and rates to one accessible platform. We are here to make meal planning easy and convenient.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section> */}

      {/* <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section> */}

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                DailyDine was born from the challenges faced by hostellers, especially the daily hassle of finding the best mess menus and rates. The founders, themselves hostellers, realized that there was a better way to streamline meal choices by offering a platform where users can view mess information in one place, saving time and effort.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Whether you're a student, worker, or just someone in search of a local meal, DailyDine was designed to bridge the gap between mess owners and customers. Our platform empowers both users to make informed decisions and mess owners to showcase their offerings to a larger audience.
              </p>
            </div>

            <div>
              <img
                src={FoundingStory}
                alt="Founding Story"
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>

          <div className="flex flex-col items-center    lg:gap-8 lg:flex-row justify-between">
            <div className=" my-16 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our vision is to become the go-to platform for anyone looking to quickly decide on where to eat, ensuring they get the best value and quality. We aim to revolutionize the mess experience by providing transparency, convenience, and seamless access to daily menus and rates in one app.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission is to simplify the meal decision process for our users while giving mess owners an effective way to engage with potential customers. We provide a reliable and user-friendly platform to ensure daily dining choices are informed, easy, and enjoyable for everyone involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <Footer />
    </div>
  )
}

export default About
