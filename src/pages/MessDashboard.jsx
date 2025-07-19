import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiUsers, FiStar } from "react-icons/fi";
import { getMyMenu, createMenu, updateMenu } from "../services/operations/menuAPI";
import { getMessReviews } from "../services/operations/messAPI";

const MessDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { menu } = useSelector((state) => state.menu);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menuData, setMenuData] = useState({
    date: new Date().toISOString().split('T')[0],
    items: [],
    specialOffers: []
  });

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "lunch",
    isVegetarian: false,
    isAvailable: true
  });

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    discount: "",
    validUntil: ""
  });

  useEffect(() => {
    fetchMenuData();
    fetchReviews();
  }, []);

  const fetchMenuData = async () => {
    setIsLoading(true);
    try {
      const result = await getMyMenu();
      if (result?.menu) {
        setMenuData({
          date: new Date(result.menu.date).toISOString().split('T')[0],
          items: result.menu.items || [],
          specialOffers: result.menu.specialOffers || []
        });
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const result = await getMessReviews(user?._id);
      if (result?.reviews) {
        setReviews(result.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const item = {
      ...newItem,
      price: parseFloat(newItem.price),
      id: Date.now()
    };

    setMenuData(prev => ({
      ...prev,
      items: [...prev.items, item]
    }));

    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "lunch",
      isVegetarian: false,
      isAvailable: true
    });
  };

  const handleEditItem = (itemId) => {
    const item = menuData.items.find(item => item.id === itemId);
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      isVegetarian: item.isVegetarian,
      isAvailable: item.isAvailable
    });
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    const updatedItems = menuData.items.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            name: newItem.name,
            description: newItem.description,
            price: parseFloat(newItem.price),
            category: newItem.category,
            isVegetarian: newItem.isVegetarian,
            isAvailable: newItem.isAvailable
          }
        : item
    );

    setMenuData(prev => ({
      ...prev,
      items: updatedItems
    }));

    setEditingItem(null);
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "lunch",
      isVegetarian: false,
      isAvailable: true
    });
  };

  const handleDeleteItem = (itemId) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.discount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const offer = {
      ...newOffer,
      discount: parseFloat(newOffer.discount),
      validUntil: new Date(newOffer.validUntil),
      id: Date.now()
    };

    setMenuData(prev => ({
      ...prev,
      specialOffers: [...prev.specialOffers, offer]
    }));

    setNewOffer({
      title: "",
      description: "",
      discount: "",
      validUntil: ""
    });
  };

  const handleDeleteOffer = (offerId) => {
    setMenuData(prev => ({
      ...prev,
      specialOffers: prev.specialOffers.filter(offer => offer.id !== offerId)
    }));
  };

  const handleSaveMenu = async () => {
    if (menuData.items.length === 0) {
      toast.error("Please add at least one menu item");
      return;
    }

    setIsLoading(true);
    try {
      const menuPayload = {
        date: new Date(menuData.date),
        items: menuData.items.map(item => ({
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          isVegetarian: item.isVegetarian,
          isAvailable: item.isAvailable
        })),
        specialOffers: menuData.specialOffers.map(offer => ({
          title: offer.title,
          description: offer.description,
          discount: offer.discount,
          validUntil: offer.validUntil
        }))
      };

      if (menu?._id) {
        await updateMenu(menu._id, menuPayload);
        toast.success("Menu updated successfully!");
      } else {
        await createMenu(menuPayload);
        toast.success("Menu created successfully!");
      }
      
      fetchMenuData();
      setShowMenuForm(false);
    } catch (error) {
      toast.error("Error saving menu");
      console.error("Error saving menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getCategoryCount = (category) => {
    return menuData.items.filter(item => item.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mess Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your daily menus and view analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiCalendar className="text-blue-500 text-2xl" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Menu Items</p>
                <p className="text-2xl font-bold text-gray-900">{menuData.items.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiUsers className="text-green-500 text-2xl" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiStar className="text-yellow-500 text-2xl" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{getAverageRating()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiPlus className="text-purple-500 text-2xl" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Special Offers</p>
                <p className="text-2xl font-bold text-gray-900">{menuData.specialOffers.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Menu Management</h2>
              <button
                onClick={() => setShowMenuForm(!showMenuForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showMenuForm ? "Cancel" : "Add Menu Item"}
              </button>
            </div>
          </div>

          {showMenuForm && (
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                </select>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newItem.isVegetarian}
                      onChange={(e) => setNewItem({...newItem, isVegetarian: e.target.checked})}
                      className="mr-2"
                    />
                    Vegetarian
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newItem.isAvailable}
                      onChange={(e) => setNewItem({...newItem, isAvailable: e.target.checked})}
                      className="mr-2"
                    />
                    Available
                  </label>
                </div>
                <button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </div>
          )}

          {/* Menu Items Display */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["breakfast", "lunch", "dinner", "snacks"].map(category => (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {category} ({getCategoryCount(category)})
                  </h3>
                  {menuData.items
                    .filter(item => item.category === category)
                    .map(item => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-lg font-semibold text-green-600">₹{item.price}</p>
                            <div className="flex space-x-2 mt-2">
                              {item.isVegetarian && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Veg</span>
                              )}
                              {!item.isAvailable && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Unavailable</span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem(item.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FiEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>

            {menuData.items.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleSaveMenu}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Menu"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Special Offers</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder="Offer title"
                value={newOffer.title}
                onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={newOffer.description}
                onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Discount %"
                value={newOffer.discount}
                onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newOffer.validUntil}
                onChange={(e) => setNewOffer({...newOffer, validUntil: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddOffer}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Offer
            </button>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuData.specialOffers.map(offer => (
                <div key={offer.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{offer.title}</h4>
                      <p className="text-sm text-gray-600">{offer.description}</p>
                      <p className="text-lg font-semibold text-green-600">{offer.discount}% off</p>
                      <p className="text-xs text-gray-500">
                        Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteOffer(offer.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
          </div>
          <div className="p-6">
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.slice(0, 5).map(review => (
                  <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={i < review.rating ? "fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({review.rating}/5)</span>
                        </div>
                        <p className="text-gray-900 mt-2">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessDashboard;