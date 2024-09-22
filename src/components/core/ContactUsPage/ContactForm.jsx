import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Have Questions or Suggestions? Let’s Connect!
      </h1>
      <p className="">
        Whether you’re a mess owner or a diner, tell us more about what you’re
        thinking, and we’ll get back to you as soon as we can.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
