import { useEffect } from "react"
import "./App.css"
// Redux
import { useDispatch, useSelector } from "react-redux"
// React Router
import { Route, Routes, useNavigate } from "react-router-dom"

// Theme Context
import { ThemeProvider } from "./contexts/ThemeContext"

// Components
import Navbar from "./components/Common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MessSignup from "./pages/MessSignup"
import Dashboard from "./pages/Dashboard"
import MessDashboard from "./pages/MessDashboard"
import MessProfile from "./pages/MessProfile"
import UserProfile from "./pages/UserProfile"
import MessDetails from "./pages/MessDetails"
import NearbyMesses from "./pages/NearbyMesses"
import Error from "./pages/Error"

import { getUserDetails } from "./services/operations/authAPI"

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider>
      <div className="flex min-h-screen w-screen flex-col bg-gray-50 dark:bg-gray-900 font-inter transition-colors duration-300">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nearby" element={<NearbyMesses />} />
        <Route path="/mess/:messId" element={<MessDetails />} />
        
        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="mess-signup"
          element={
            <OpenRoute>
              <MessSignup />
            </OpenRoute>
          }
        />

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/profile" element={<UserProfile />} />
          
          {/* Route only for Mess Owners */}
          {user?.accountType === "mess_owner" && (
            <>
              <Route path="dashboard/mess-dashboard" element={<MessDashboard />} />
              <Route path="dashboard/mess-profile" element={<MessProfile />} />
            </>
          )}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
