import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaPlus, FaTrash, FaImage, FaSave, FaEye } from 'react-icons/fa'
import toast from 'react-hot-toast'
import axios from 'axios'

const MenuManager = () => {
  const { token } = useSelector((state) => state.auth)
  const [menu, setMenu] = useState({ date: new Date().toISOString().split('T')[0], items: [] })
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'breakfast',
    isVegetarian: false,
    image: ''
  })
  const [imagePreview, setImagePreview] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const categories = [
    { value: 'breakfast', label: 'Breakfast', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'lunch', label: 'Lunch', color: 'bg-green-100 text-green-800' },
    { value: 'dinner', label: 'Dinner', color: 'bg-blue-100 text-blue-800' },
    { value: 'snacks', label: 'Snacks', color: 'bg-purple-100 text-purple-800' }
  ]

  useEffect(() => {
    fetchTodaysMenu()
  }, [])

  const fetchTodaysMenu = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/menus/my-menu`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.menu) {
        setMenu(response.data.menu)
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error)
      toast.error('Failed to fetch menu')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setIsUploading(true)
    setImagePreview(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/menus/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      
      setNewItem(prev => ({ ...prev, image: response.data.imageUrl }))
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Image upload failed:', error)
      toast.error('Failed to upload image')
      setImagePreview('')
    } finally {
      setIsUploading(false)
    }
  }

  const addMenuItem = () => {
    if (!newItem.name || !newItem.price) {
      toast.error('Please fill in name and price')
      return
    }

    const item = {
      ...newItem,
      price: parseFloat(newItem.price),
      id: Date.now() // Temporary ID for frontend
    }

    setMenu(prev => ({
      ...prev,
      items: [...prev.items, item]
    }))

    // Reset form
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: 'breakfast',
      isVegetarian: false,
      image: ''
    })
    setImagePreview('')
    toast.success('Item added to menu!')
  }

  const removeMenuItem = (index) => {
    setMenu(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
    toast.success('Item removed from menu!')
  }

  const saveMenu = async () => {
    setIsSaving(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/menus`,
        {
          date: menu.date,
          items: menu.items.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            isVegetarian: item.isVegetarian,
            image: item.image
          }))
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      toast.success('Menu saved successfully!')
      setMenu(response.data.menu)
    } catch (error) {
      console.error('Failed to save menu:', error)
      toast.error('Failed to save menu')
    } finally {
      setIsSaving(false)
    }
  }

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.color : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Menu Manager</h2>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={menu.date}
            onChange={(e) => setMenu(prev => ({ ...prev, date: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={saveMenu}
            disabled={isSaving || menu.items.length === 0}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <FaSave />
            <span>{isSaving ? 'Saving...' : 'Save Menu'}</span>
          </button>
        </div>
      </div>

      {/* Add New Item Form */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add New Menu Item</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
              placeholder="Enter item name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
            placeholder="Describe the item (optional)"
            rows="3"
          />
        </div>

        <div className="flex items-center space-x-6 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newItem.isVegetarian}
              onChange={(e) => setNewItem(prev => ({ ...prev, isVegetarian: e.target.checked }))}
              className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Vegetarian</span>
          </label>

          <div className="flex items-center space-x-4">
            <label className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-600 flex items-center space-x-2">
              <FaImage />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            
            {isUploading && (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Uploading...</span>
              </div>
            )}
          </div>
        </div>

        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-24 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}

        <button
          onClick={addMenuItem}
          disabled={!newItem.name || !newItem.price}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Item</span>
        </button>
      </div>

      {/* Current Menu Items */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Current Menu ({menu.items.length} items)
        </h3>
        
        {menu.items.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FaEye className="mx-auto text-4xl mb-4" />
            <p>No items in your menu yet. Add some delicious items!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menu.items.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                {item.image && (
                  <img
                    src={item.image.startsWith('http') ? item.image : `${process.env.REACT_APP_BASE_URL}${item.image}`}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{item.name}</h4>
                  <button
                    onClick={() => removeMenuItem(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-500">₹{item.price}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(item.category)}`}>
                      {categories.find(c => c.value === item.category)?.label}
                    </span>
                    {item.isVegetarian && (
                      <span className="text-green-500 text-xs">🌱 Veg</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuManager