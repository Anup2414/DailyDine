import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

// Icons
import { FaSearch, FaMapMarkerAlt, FaUtensils, FaStar } from "react-icons/fa"

// Components
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import NearbyMessCard from "../components/Common/NearbyMessCard"
import LoadingSpinner from "../components/Common/LoadingSpinner"

// Services
import { getAllMesses, getNearbyMesses } from "../services/operations/messAPI"

// Utils
import { getUserLocation } from "../utils/locationUtils"
import { ACCOUNT_TYPE } from "../utils/constants"

const Home = () => {
  const { user } = useSelector((state) => state.profile)
  const [nearbyMesses, setNearbyMesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(false)

  useEffect(() => {
    const fetchDataAndLocation = async () => {
      try {
        setLoading(true)
        
        // Get user location
        const location = await getUserLocation()
        setUserLocation(location)

        // Fetch nearby messes
        const nearbyResponse = await getNearbyMesses({
          latitude: location.latitude,
          longitude: location.longitude,
          radius: 5000, // 5km radius
        })

        if (nearbyResponse?.success) {
          setNearbyMesses(nearbyResponse.messes.slice(0, 6)) // Show only 6 messes
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setLocationError(true)
        
        // Fallback: fetch all messes if location fails
        try {
          const allMessesResponse = await getAllMesses({ limit: 6 })
          if (allMessesResponse?.success) {
            setNearbyMesses(allMessesResponse.messes)
          }
        } catch (fallbackError) {
          console.error("Error fetching fallback data:", fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDataAndLocation()
  }, [])

  const stats = [
    { icon: FaUtensils, number: "500+", label: "Registered Messes" },
    { icon: FaStar, number: "50K+", label: "Happy Users" },
    { icon: FaMapMarkerAlt, number: "100+", label: "Cities Covered" },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-richblack-900">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
          
          {/* Hero Content */}
          <div className="mx-auto flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-20">
            <div className="lg:w-[50%]">
              <h1 className="text-center text-4xl font-semibold lg:text-left lg:text-6xl">
                Find Your Perfect
                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
                  {" "}
                  Mess
                </span>
              </h1>
              
              <p className="mt-4 text-center text-lg font-medium text-richblack-300 lg:text-left">
                Discover nearby messes, explore daily menus, and never waste time 
                deciding where to eat. DailyDine connects you with the best local 
                mess options tailored to your taste and budget.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {!user && (
                  <Link to="/signup">
                    <div className="cursor-pointer rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black hover:bg-yellow-25 transition-all duration-200">
                      Get Started
                    </div>
                  </Link>
                )}
                
                <Link to="/nearby">
                  <div className="cursor-pointer rounded-md border border-richblack-700 bg-richblack-800 px-6 py-3 text-center text-[13px] font-bold text-white hover:bg-richblack-700 transition-all duration-200">
                    <FaSearch className="inline mr-2" />
                    Find Nearby Messes
                  </div>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="mt-10 flex flex-wrap gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-richblack-700 p-3">
                      <stat.icon className="text-xl text-yellow-50" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-yellow-50">{stat.number}</p>
                      <p className="text-sm text-richblack-300">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:w-[50%]">
              <div className="relative mx-auto aspect-square w-[300px] lg:w-[400px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] opacity-20 blur-3xl"></div>
                <img
                  src="/api/placeholder/400/400"
                  alt="DailyDine App"
                  className="relative z-10 w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Messes Section */}
      <section className="bg-richblack-900 py-20">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white">
              {locationError ? "Featured Messes" : "Messes Near You"}
            </h2>
            <p className="mt-3 text-lg text-richblack-300">
              {locationError 
                ? "Discover popular messes in your area"
                : `Found ${nearbyMesses.length} messes within 5km of your location`
              }
            </p>
            {userLocation && !locationError && (
              <p className="mt-2 text-sm text-richblack-400">
                <FaMapMarkerAlt className="inline mr-1" />
                Showing results near your current location
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : nearbyMesses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyMesses.map((mess) => (
                <NearbyMessCard key={mess._id} mess={mess} userLocation={userLocation} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-20">
              <div className="rounded-full bg-richblack-700 p-6 mb-4">
                <FaUtensils className="text-4xl text-richblack-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Messes Found</h3>
              <p className="text-richblack-300 text-center max-w-md">
                {locationError 
                  ? "We couldn't find any messes at the moment. Please try again later."
                  : "No messes found in your area. Try expanding your search radius."
                }
              </p>
              <Link 
                to="/search" 
                className="mt-4 cursor-pointer rounded-md bg-yellow-50 px-6 py-3 text-center text-sm font-bold text-black hover:bg-yellow-25 transition-all duration-200"
              >
                Search All Messes
              </Link>
            </div>
          )}

          {nearbyMesses.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                to="/nearby"
                className="cursor-pointer rounded-md border border-yellow-50 bg-transparent px-6 py-3 text-center text-sm font-bold text-yellow-50 hover:bg-yellow-50 hover:text-black transition-all duration-200"
              >
                View All Nearby Messes
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-richblack-800 py-20">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white">How DailyDine Works</h2>
            <p className="mt-3 text-lg text-richblack-300">
              Simple steps to find your perfect meal
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1FA2FF]">
                <FaMapMarkerAlt className="text-2xl text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">1. Set Your Location</h3>
              <p className="text-richblack-300">
                Allow location access or manually set your area to find nearby messes
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#12D8FA]">
                <FaSearch className="text-2xl text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">2. Browse Menus</h3>
              <p className="text-richblack-300">
                Explore daily menus, prices, and ratings from multiple messes
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#A6FFCB]">
                <FaUtensils className="text-2xl text-richblack-900" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">3. Make Your Choice</h3>
              <p className="text-richblack-300">
                Choose the best option based on menu, distance, and reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Mess Owners Section */}
      {(!user || user?.accountType === ACCOUNT_TYPE.MESS_OWNER) && (
        <section className="bg-richblack-900 py-20">
          <div className="mx-auto w-11/12 max-w-maxContent">
            <div className="rounded-lg bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] p-8">
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <div className="lg:w-2/3">
                  <h2 className="text-3xl font-bold text-white">
                    Are you a Mess Owner?
                  </h2>
                  <p className="mt-3 text-lg text-richblack-100">
                    Join DailyDine and showcase your daily menus to thousands of hungry 
                    students and professionals. Increase your visibility and attract new customers.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-richblack-100">
                      <span className="mr-2">✓</span>
                      Easy menu management
                    </li>
                    <li className="flex items-center text-richblack-100">
                      <span className="mr-2">✓</span>
                      Real-time updates
                    </li>
                    <li className="flex items-center text-richblack-100">
                      <span className="mr-2">✓</span>
                      Customer reviews and feedback
                    </li>
                  </ul>
                </div>
                <div className="lg:w-1/3">
                  {!user ? (
                    <Link to="/signup">
                      <div className="cursor-pointer rounded-md bg-richblack-900 px-6 py-3 text-center text-sm font-bold text-white hover:bg-richblack-800 transition-all duration-200">
                        Register Your Mess
                      </div>
                    </Link>
                  ) : user?.accountType === ACCOUNT_TYPE.MESS_OWNER ? (
                    <Link to="/dashboard">
                      <div className="cursor-pointer rounded-md bg-richblack-900 px-6 py-3 text-center text-sm font-bold text-white hover:bg-richblack-800 transition-all duration-200">
                        Go to Dashboard
                      </div>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="bg-richblack-800 py-20">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <h2 className="mb-4 text-center text-4xl font-bold text-white">
            Reviews from Our Community
          </h2>
          <ReviewSlider />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
