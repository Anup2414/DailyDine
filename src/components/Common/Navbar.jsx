import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaStore, FaMapMarkerAlt, FaMoon, FaSun } from "react-icons/fa"
import { logoutUser } from "../../services/operations/authAPI"
import { useTheme } from "../../contexts/ThemeContext"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token } = useSelector((state) => state.auth)
  const { isDarkMode, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser(navigate))
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">DailyDine</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/nearby"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <FaMapMarkerAlt className="mr-1" />
              Nearby
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>
            
            {token ? (
              <div className="flex items-center space-x-4">
                {user?.accountType === "mess_owner" && (
                                      <Link
                      to="/dashboard/mess-dashboard"
                      className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      <FaStore className="mr-1" />
                      Dashboard
                    </Link>
                )}
                
                                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      <FaUser />
                      <span>{user?.name || "User"}</span>
                    </button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                          <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/mess-signup"
                  className="bg-gray-800 dark:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-700 transition-colors"
                >
                  Register Mess
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none focus:text-orange-500 dark:focus:text-orange-400"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/nearby"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaMapMarkerAlt className="mr-2" />
              Nearby
            </Link>
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full text-left"
            >
              {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            {token ? (
              <>
                                  {user?.accountType === "mess_owner" && (
                    <Link
                      to="/dashboard/mess-dashboard"
                      className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaStore className="mr-2" />
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/dashboard/profile"
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
              </>
            ) : (
                              <>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/mess-signup"
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register Mess
                  </Link>
                </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar