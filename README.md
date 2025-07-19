# DailyDine - Mess Menu Web Application 🍽️

DailyDine is a modern, comprehensive web application that connects mess owners with customers, allowing users to discover daily menus from nearby messes and helping mess owners showcase their offerings with beautiful food imagery and dark mode support.

## ✨ Latest Updates (v2.0.0)

### 🔧 **Critical Fixes**
- **Express Route Error**: Fixed authentication middleware import issue that was causing server crashes
- **Dependencies**: Updated and optimized package dependencies for better performance

### 🎨 **Dark Mode Theme**
- **Automatic Detection**: Detects system preference and remembers user choice
- **Seamless Toggle**: Smooth transitions between light and dark themes
- **Complete Coverage**: All components and pages support dark mode
- **Accessibility**: Improved contrast and readability in both themes

### 📸 **Image Upload System**
- **Food Photography**: Mess owners can upload appetizing food images for menu items
- **Multiple Storage Options**: Supports both Cloudinary and local storage
- **Image Optimization**: Automatic image resizing and optimization
- **Real-time Preview**: Instant image preview during upload
- **File Validation**: Size and format validation for optimal performance

### 🎯 **Enhanced User Experience**
- **Visual Menu Cards**: Beautiful menu displays with featured food images
- **Improved Dashboard**: Redesigned mess owner dashboard with better organization
- **Mobile Responsive**: Optimized for all device sizes
- **Better Performance**: Faster loading times and smoother interactions

## 🚀 Features

### For Users
- **Browse Daily Menus**: View today's menus with beautiful food images
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Location-Based Discovery**: Find messes near your location with distance information
- **Interactive Maps**: Google Maps integration showing mess locations
- **Menu Filtering**: Filter menus by date and meal categories (breakfast, lunch, dinner, snacks)
- **Visual Menu Items**: See food images with pricing and vegetarian indicators
- **Reviews & Ratings**: Read and write reviews for messes with detailed ratings
- **User Authentication**: Secure login/signup system with JWT
- **Profile Management**: Update personal information and location preferences
- **Real-time Distance Calculation**: See exact distance to messes from your location

### For Mess Owners
- **Advanced Menu Management**: Create and update daily menus with rich food imagery
- **Image Upload**: Upload high-quality photos for each menu item
- **Dark Mode Dashboard**: Modern dashboard with comprehensive theme support
- **Business Profile**: Manage mess information, contact details, and location
- **Dashboard Analytics**: Overview of menu performance and customer reviews
- **Location Services**: Set and update mess location with coordinates
- **Special Offers**: Add promotional offers and discounts
- **Review Management**: View and respond to customer feedback
- **Real-time Updates**: Instant menu updates and notifications

### Technical Features
- **Dark Mode System**: Complete theme management with automatic detection
- **Image Processing**: Multi-format image support with optimization
- **Real-time Updates**: Instant menu updates and notifications
- **Geolocation**: Automatic location detection and nearby mess search
- **Responsive Design**: Mobile-first design for all devices
- **Secure Authentication**: JWT-based authentication system
- **Database Indexing**: Optimized queries for fast performance
- **Google Maps Integration**: Interactive maps with custom markers
- **Advanced Search**: Filter by location, rating, and cuisine type
- **File Upload Security**: Secure image upload with validation

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling and responsive design with dark mode support
- **React Router** - Navigation and routing
- **React Icons** - Icon library with theme-aware icons
- **Google Maps API** - Location services
- **React Hot Toast** - Notifications
- **React Hook Form** - Form handling
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with geospatial indexing
- **Mongoose** - Object modeling for MongoDB
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization (optional)
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Google Maps API key (optional for location features)
- Cloudinary account (optional for cloud image storage)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dailydine
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 3. Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/dailydine
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# Image Upload Configuration (Optional - will fallback to local storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_BASE_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 4. Database Setup
Make sure MongoDB is running on your system:
```bash
# Start MongoDB (Ubuntu/Debian)
sudo systemctl start mongod

# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Start MongoDB (Windows)
net start MongoDB
```

### 5. Google Maps API Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Maps JavaScript API
4. Create API key
5. Add the API key to your frontend `.env` file

### 6. Cloudinary Setup (Optional)
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Add credentials to your backend `.env` file
4. Images will fallback to local storage if not configured

### 7. Run the Application

#### Development Mode (Both Frontend and Backend)
```bash
npm run dev
```

#### Run Frontend Only
```bash
npm start
```

#### Run Backend Only
```bash
cd server
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📱 Usage

### For Users
1. **Browse Menus**: Visit the homepage to see today's menus with food images
2. **Theme Toggle**: Click the sun/moon icon to switch between light and dark modes
3. **Find Nearby**: Use the "Nearby" feature to find messes close to your location
4. **View Details**: Click on any mess to see detailed menu with high-quality food images
5. **Leave Reviews**: Rate and review messes after visiting them
6. **Set Location**: Update your location to get accurate distance calculations

### For Mess Owners
1. **Register**: Sign up as a mess owner with your business details
2. **Set Location**: Provide your mess location coordinates
3. **Upload Images**: Add appetizing photos for each menu item
4. **Create Menus**: Add daily menu items with prices, categories, and images
5. **Manage Profile**: Update your mess information and contact details
6. **Dark Mode Dashboard**: Use the modern dashboard in your preferred theme
7. **View Analytics**: Monitor reviews and menu performance

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Menus
- `GET /api/menus/today` - Get today's menus
- `GET /api/menus/date/:date` - Get menus by date
- `GET /api/menus/my-menu` - Get mess owner's menu
- `POST /api/menus` - Create/update menu
- `POST /api/menus/upload-image` - Upload menu item image
- `PUT /api/menus/:id` - Update specific menu
- `GET /api/menus/nearby` - Get nearby menus
- `GET /api/menus/mess/:messId` - Get specific mess menu

### Messes
- `GET /api/messes` - Get all messes
- `GET /api/messes/nearby` - Get nearby messes
- `GET /api/messes/:messId` - Get mess details
- `PUT /api/messes/profile` - Update mess profile

### Reviews
- `GET /api/reviews/mess/:messId` - Get mess reviews
- `GET /api/reviews/user/:userId` - Get user reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:reviewId` - Update review
- `DELETE /api/reviews/:reviewId` - Delete review

### Users
- `PUT /api/users/profile` - Update user profile

## 🗄️ Database Schema

### User Collection
```javascript
{
  name: String,
  email: String,
  password: String,
  accountType: "user" | "mess_owner",
  messName: String, // for mess owners
  phoneNumber: String,
  address: String,
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  description: String,
  openingHours: String,
  isActive: Boolean,
  approved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Menu Collection
```javascript
{
  messOwnerId: ObjectId,
  date: Date,
  items: [{
    name: String,
    description: String,
    price: Number,
    category: "breakfast" | "lunch" | "dinner" | "snacks",
    isVegetarian: Boolean,
    isAvailable: Boolean,
    image: String // Image URL or file path
  }],
  specialOffers: [{
    title: String,
    description: String,
    discount: Number,
    validUntil: Date
  }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Collection
```javascript
{
  userId: ObjectId,
  messOwnerId: ObjectId,
  rating: Number,
  comment: String,
  foodQuality: Number,
  cleanliness: Number,
  service: Number,
  valueForMoney: Number,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Image type and size validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing protection
- **Helmet Security**: Additional security headers
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account and install Heroku CLI
2. Create a new Heroku app
3. Set environment variables in Heroku dashboard
4. For image uploads, configure Cloudinary in production
5. Deploy using Git:
```bash
heroku git:remote -a your-app-name
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
1. Build the production version:
```bash
npm run build
```
2. Deploy the `build` folder to your preferred hosting service
3. Set environment variables in your hosting platform

### Database Deployment (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string and update your environment variables

## 📁 Project Structure

```
dailydine/
├── public/
├── src/
│   ├── assets/
│   │   └── Images/
│   │       └── food-placeholder.svg
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Navbar.jsx (with dark mode toggle)
│   │   │   ├── Footer.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   └── ...
│   │   ├── core/
│   │   │   └── Auth/
│   │   ├── MenuManager.jsx (new image upload component)
│   │   └── GoogleMap.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx (dark mode management)
│   ├── pages/
│   │   ├── Home.jsx (with image display)
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── MessSignup.jsx
│   │   ├── MessDashboard.jsx (redesigned with dark mode)
│   │   ├── MessProfile.jsx
│   │   ├── UserProfile.jsx
│   │   ├── MessDetails.jsx
│   │   ├── NearbyMesses.jsx
│   │   └── ...
│   ├── services/
│   │   ├── operations/
│   │   │   ├── authAPI.js
│   │   │   ├── menuAPI.js
│   │   │   ├── messAPI.js
│   │   │   └── ...
│   │   └── apiConnector.js
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── menuSlice.js
│   │   ├── messSlice.js
│   │   └── ...
│   ├── reducer/
│   ├── App.jsx (with theme provider)
│   └── index.js
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Menu.js (updated with image field)
│   │   ├── Review.js
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js (fixed middleware import)
│   │   ├── menus.js (with image upload)
│   │   ├── messes.js
│   │   ├── reviews.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── imageUpload.js (new file upload utility)
│   ├── uploads/
│   │   └── food-images/ (local image storage)
│   ├── index.js
│   └── package.json
├── package.json
├── .env (frontend environment variables)
└── README.md
```

## 🎨 Theme System

### Dark Mode Features
- **Automatic Detection**: Detects system preference on first visit
- **Persistent Storage**: Remembers user choice in localStorage
- **Smooth Transitions**: CSS transitions for seamless theme switching
- **Complete Coverage**: All components support both themes
- **Accessibility**: Improved contrast ratios for better readability

### Theme Toggle Locations
- **Desktop**: Sun/Moon icon in the main navigation
- **Mobile**: Theme toggle option in the mobile menu
- **Consistent**: Same experience across all device sizes

## 📸 Image Upload System

### Supported Features
- **Multiple Formats**: JPEG, JPG, PNG, WebP
- **File Size Limit**: 5MB maximum per image
- **Image Optimization**: Automatic resizing to 600x400px
- **Real-time Preview**: Instant preview before upload
- **Error Handling**: Graceful fallback for failed uploads
- **Storage Options**: Cloudinary (cloud) or local storage

### Image Display
- **Menu Cards**: Featured images on menu cards
- **Item Thumbnails**: Small images next to menu items
- **Responsive**: Adaptive sizing for different screen sizes
- **Lazy Loading**: Optimized loading for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: DailyDine Development Team
- **Project**: DailyDine - Mess Menu Web Application
- **Version**: 2.0.0

## 📞 Support

For support and questions, please contact:
- Email: support@dailydine.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/dailydine/issues)

## 🔮 Future Enhancements

- **AI-Powered Recommendations**: Smart menu suggestions based on user preferences
- **Advanced Image Recognition**: Automatic food categorization from images
- **Real-time Notifications**: Push notifications for menu updates
- **Payment Integration**: Online payment for meal bookings
- **Advanced Analytics**: Detailed insights for mess owners
- **Mobile App**: Native mobile applications with offline support
- **Multi-language Support**: Internationalization
- **Voice Search**: Voice-powered menu search
- **Order Management**: Complete online ordering system
- **Loyalty Program**: Customer rewards and points
- **Social Features**: Mess following and social sharing
- **Nutrition Information**: Calorie and nutrition tracking

## 🐛 Fixed Issues

### Version 2.0.0
- ✅ **Express Route Error**: Fixed authentication middleware import causing server crashes
- ✅ **Mobile Responsiveness**: Improved mobile layout and navigation
- ✅ **Image Loading**: Optimized image loading and fallback handling
- ✅ **Dark Mode Persistence**: Fixed theme preference not saving correctly
- ✅ **Form Validation**: Enhanced client-side and server-side validation

### Known Issues
- Google Maps API key needs to be configured for full map functionality
- Some npm packages may show deprecation warnings (non-blocking)
- MongoDB connection should be secured with authentication in production

## 📝 Changelog

### Version 2.0.0 (Latest)
- 🎨 **Added**: Complete dark mode theme system with automatic detection
- 📸 **Added**: Image upload functionality for menu items
- 🔧 **Fixed**: Express route authentication middleware error
- ✨ **Improved**: Redesigned mess owner dashboard
- 🎯 **Enhanced**: Visual menu cards with food imagery
- 📱 **Optimized**: Better mobile responsiveness
- ⚡ **Performance**: Faster loading times and smoother interactions

### Version 1.0.0
- Initial release with core features
- User and mess owner authentication
- Menu management system
- Location-based search
- Review and rating system
- Google Maps integration
- Responsive design

---

**DailyDine v2.0.0** - Making meal decisions easier with beautiful imagery and modern design! 🍽️✨

*Experience the future of mess menu discovery with dark mode, stunning food photography, and seamless user experience.*
