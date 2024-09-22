import React from "react"

import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <h1 className="text-4xl font-semibold mb-8">
            Get in Touch with DailyDine
          </h1>
          <p className="mb-4 text-lg text-richblack-300">
            Have questions, suggestions, or need assistance? Our team at
            DailyDine is here to help! Whether you’re a mess owner looking to
            join the platform or a user wanting to learn more about our
            services, feel free to reach out.
          </p>
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <h2 className="text-3xl font-semibold mb-6">
            We'd Love to Hear from You
          </h2>
          <p className="text-lg text-richblack-300 mb-6">
            Fill out the form below, and we’ll get back to you as soon as
            possible. Whether it's feedback or inquiries, your voice matters!
          </p>
          <ContactForm />
        </div>
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviews from Users */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          What Mess Owners and Diners Are Saying
        </h1>
        <p className="text-center text-lg text-richblack-300 mt-4">
          Check out what our satisfied customers are saying about their experience with DailyDine.
        </p>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  )
}

export default Contact
