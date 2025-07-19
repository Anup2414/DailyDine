import { useEffect } from "react"
import "./App.css"
// Redux
import { useDispatch, useSelector } from "react-redux"
// React Router
import { Route, Routes, useNavigate } from "react-router-dom"

// Components
import Navbar from "./components/Common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"

// Mess related pages
import MessDetails from "./pages/MessDetails"
import SearchMesses from "./pages/SearchMesses"
import NearbyMesses from "./pages/NearbyMesses"

// Dashboard components for mess owners
import MessOwnerDashboard from "./components/core/Dashboard/MessOwner/MessOwnerDashboard"
import MessProfile from "./components/core/Dashboard/MessOwner/MessProfile"
import MenuManagement from "./components/core/Dashboard/MessOwner/MenuManagement"
import CreateMenu from "./components/core/Dashboard/MessOwner/CreateMenu"
import EditMenu from "./components/core/Dashboard/MessOwner/EditMenu"
import MessReviews from "./components/core/Dashboard/MessOwner/MessReviews"
import MessSettings from "./components/core/Dashboard/MessOwner/MessSettings"

// Dashboard components for users
import UserDashboard from "./components/core/Dashboard/User/UserDashboard"
import MyProfile from "./components/core/Dashboard/MyProfile"
import UserSettings from "./components/core/Dashboard/Settings"
import FavoriteMesses from "./components/core/Dashboard/User/FavoriteMesses"
import MyReviews from "./components/core/Dashboard/User/MyReviews"

// Services
import { getUserDetails } from "./services/operations/profileAPI"
import { ACCOUNT_TYPE } from "./utils/constants"

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchMesses />} />
        <Route path="/nearby" element={<NearbyMesses />} />
        <Route path="/mess/:messId" element={<MessDetails />} />
        
        {/* Auth Routes (accessible only when not logged in) */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<UserSettings />} />

          {/* Routes only for Users */}
          {user?.accountType === ACCOUNT_TYPE.USER && (
            <>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/dashboard/favorites" element={<FavoriteMesses />} />
              <Route path="/dashboard/my-reviews" element={<MyReviews />} />
            </>
          )}

          {/* Routes only for Mess Owners */}
          {user?.accountType === ACCOUNT_TYPE.MESS_OWNER && (
            <>
              <Route path="/dashboard" element={<MessOwnerDashboard />} />
              <Route path="/dashboard/mess-profile" element={<MessProfile />} />
              <Route path="/dashboard/menu-management" element={<MenuManagement />} />
              <Route path="/dashboard/create-menu" element={<CreateMenu />} />
              <Route path="/dashboard/edit-menu/:menuId" element={<EditMenu />} />
              <Route path="/dashboard/mess-reviews" element={<MessReviews />} />
              <Route path="/dashboard/mess-settings" element={<MessSettings />} />
            </>
          )}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
