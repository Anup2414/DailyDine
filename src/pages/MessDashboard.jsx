import { useState } from "react";
import { useSelector } from "react-redux";
import { FiCalendar, FiUsers, FiStar, FiSettings } from "react-icons/fi";
import MenuManager from "../components/MenuManager";

const MessDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('menu');
  const dashboardStats = {
    totalMenuItems: 0,
    totalReviews: 0,
    averageRating: 0
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.messName || user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your mess menu and view performance metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <div className="flex items-center">
              <FiCalendar className="text-blue-500 text-3xl" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Menu Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalMenuItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <div className="flex items-center">
              <FiUsers className="text-green-500 text-3xl" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalReviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <div className="flex items-center">
              <FiStar className="text-yellow-500 text-3xl" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 transition-colors duration-300">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('menu')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'menu'
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Menu Management
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <FiSettings className="inline mr-2" />
                Settings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'menu' && <MenuManager />}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <FiSettings className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Settings Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced settings and configuration options will be available here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessDashboard;