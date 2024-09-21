import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const MessMenu = [
  { day: "Monday", menu: ["Chicken Curry", "Rice", "Salad"] },
  { day: "Tuesday", menu: ["Pasta", "Garlic Bread", "Salad"] },
  { day: "Wednesday", menu: ["Vegetable Stir Fry", "Noodles"] },
  { day: "Thursday", menu: ["Fish Fry", "Mashed Potatoes"] },
  { day: "Friday", menu: ["Tacos", "Beans Salad"] },
];

const Footer = () => {
  return (
    <div className="bg-richblack-800 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="Company Logo" className="w-32" />
          <h1 className="text-lg font-semibold mt-2">Your Company Name</h1>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-8">
          <a href="#" aria-label="Facebook" className="hover:text-yellow-400 transition duration-200">
            <FaFacebook size={24} />
          </a>
          <a href="#" aria-label="Google" className="hover:text-yellow-400 transition duration-200">
            <FaGoogle size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-yellow-400 transition duration-200">
            <FaTwitter size={24} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-yellow-400 transition duration-200">
            <FaYoutube size={24} />
          </a>
        </div>

        {/* Bottom Footer Links */}
        <div className="flex justify-center space-x-4 text-sm mb-4">
          {BottomFooter.map((footerLink, index) => (
            <Link key={index} to={footerLink.split(" ").join("-").toLowerCase()} className="hover:text-yellow-400 transition duration-200">
              {footerLink}
            </Link>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm mt-4">
          Made with ❤️ CodeHelp © 2023 Studynotion
        </div>
      </div>
    </div>
  );
};

export default Footer;