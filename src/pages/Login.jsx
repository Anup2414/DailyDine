import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back to DailyDine"
      description1="Find the best daily mess menu, curated for your needs."
      description2="Sign in to explore mess options and rate the food."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login

