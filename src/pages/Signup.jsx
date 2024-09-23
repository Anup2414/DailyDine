import signupImg from "../assets/Images/signup.webp";
import Template from "../components/core/Auth/Template";

function Signup() {
  return (
    <Template
      title="Join DailyDine and discover the best mess options around you"
      description1="Find the best food choices for today, every day."
      description2="Whether you're a visitor or a mess owner, connect through DailyDine."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
