# DailyDine - Mess Menu Discovery Platform

**DailyDine** is a comprehensive MERN stack web application that connects hungry students and professionals with nearby messes, helping them discover daily menus, compare prices, read reviews, and make informed dining decisions without the hassle of visiting multiple messes.

## 🌟 Project Story

*"As a hosteller, I found myself spending around half an hour every day just to decide where to eat. Typically, I'd visit 3 to 4 different messes, check their menus, and then decide which one had the best offerings for that day. This daily struggle made me think—why not create a platform where all the messes could showcase their menus in one place? That's when the idea for DailyDine was born."*

DailyDine solves this real-world problem by providing a centralized platform where:
- **Users** can easily find nearby messes, check daily menus, and make informed decisions
- **Mess owners** can showcase their offerings and attract new customers

## 🚀 Key Features

### For Users
- **📍 Location-Based Discovery**: Find nearby messes using GPS or manual location input
- **🗺️ Interactive Maps**: View mess locations with distance calculations on Google Maps
- **📱 Daily Menu Browsing**: Explore real-time daily menus with prices and descriptions
- **⭐ Reviews & Ratings**: Read detailed reviews and ratings from other users
- **🔍 Advanced Filtering**: Filter by dietary preferences, price range, cuisine type, and distance
- **❤️ Favorites**: Save favorite messes for quick access
- **🔔 Notifications**: Get alerts for new menus and special offers

### For Mess Owners
- **🏪 Mess Management**: Create and manage mess profiles with location, contact details, and images
- **📋 Menu Management**: Easily create, update, and schedule daily menus
- **🎯 Real-time Updates**: Instantly update menu items, prices, and availability
- **📊 Analytics Dashboard**: Track views, orders, and customer feedback
- **💰 Special Offers**: Create time-based discounts and promotional offers
- **📱 Mobile-Friendly**: Manage your mess on-the-go with responsive design

### Enhanced Functionality
- **🌍 Geolocation Services**: Automatic location detection with fallback options
- **📏 Distance Calculation**: Show exact distance to each mess
- **⚡ Real-time Search**: Instant search with autocomplete
- **📱 Progressive Web App**: Works offline and can be installed on mobile devices
- **🔐 Secure Authentication**: JWT-based authentication with role-based access control

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with geospatial indexing
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image storage and management
- **Nodemailer** - Email services
- **bcrypt** - Password hashing
- **geolib** - Geolocation utilities

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **React Google Maps API** - Map integration
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

### Additional Libraries
- **@react-google-maps/api** - Google Maps integration
- **geolib** - Distance calculations
- **react-rating-stars-component** - Star ratings
- **react-icons** - Icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Maps API key
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/dailydine.git
cd dailydine
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017/dailydine
JWT_SECRET=your_jwt_secret_here
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=dailydine_uploads
```

### 3. Frontend Setup
```bash
cd ..
npm install
```

Create a `.env` file in the root directory:
```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_OPENCAGE_API_KEY=your_opencage_api_key_for_geocoding
```

### 4. Start the Application
```bash
# Start both frontend and backend
npm run dev

# Or start separately:
# Backend only
npm run server

# Frontend only
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## 🗂️ Project Structure

```
dailydine/
├── server/                     # Backend code
│   ├── controllers/           # Route controllers
│   │   ├── auth.js           # Authentication logic
│   │   ├── mess.js           # Mess management
│   │   ├── menu.js           # Menu operations
│   │   └── review.js         # Review system
│   ├── models/               # Database models
│   │   ├── User.js           # User schema
│   │   ├── Mess.js           # Mess schema
│   │   ├── Menu.js           # Menu schema
│   │   ├── Review.js         # Review schema
│   │   └── Profile.js        # Profile schema
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── config/               # Database & external service configs
│   └── utils/                # Utility functions
├── src/                      # Frontend code
│   ├── components/           # React components
│   │   ├── Common/           # Shared components
│   │   ├── core/             # Feature-specific components
│   │   └── ui/               # UI components
│   ├── pages/                # Page components
│   ├── services/             # API service functions
│   ├── utils/                # Utility functions
│   ├── hooks/                # Custom React hooks
│   └── slices/               # Redux slices
└── public/                   # Static assets
```

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/sendotp` - Send OTP for verification
- `POST /api/v1/auth/changepassword` - Change password

### Mess Management
- `GET /api/v1/mess` - Get all messes
- `POST /api/v1/mess/nearby` - Get nearby messes
- `GET /api/v1/mess/:messId` - Get specific mess details
- `POST /api/v1/mess/create` - Create new mess (Mess Owner only)
- `PUT /api/v1/mess/update/:messId` - Update mess (Mess Owner only)

### Menu Management
- `GET /api/v1/mess/:messId/menu/today` - Get today's menu
- `GET /api/v1/mess/:messId/menus` - Get all menus for a mess
- `POST /api/v1/mess/:messId/menu/create` - Create menu (Mess Owner only)
- `PUT /api/v1/mess/:messId/menu/update/:menuId` - Update menu (Mess Owner only)

### Reviews
- `POST /api/v1/review/create` - Create review
- `GET /api/v1/review/mess/:messId` - Get reviews for a mess
- `GET /api/v1/review/user/my-reviews` - Get user's reviews

## 🎯 Usage Guide

### For New Users
1. **Sign Up**: Create an account choosing between "User" or "Mess Owner"
2. **Set Location**: Allow location access or manually set your area
3. **Explore Messes**: Browse nearby messes with their daily menus
4. **Read Reviews**: Check ratings and reviews from other users
5. **Make Choice**: Select the best mess based on menu, price, and distance

### For Mess Owners
1. **Register as Mess Owner**: Sign up with mess owner account type
2. **Create Mess Profile**: Add mess details, location, and contact information
3. **Upload Photos**: Add appealing images of your mess and food
4. **Create Daily Menus**: Add menu items with prices and descriptions
5. **Manage Reviews**: Respond to customer feedback and improve services

### Key Features Usage
- **Location Search**: Use the search bar or "Find Nearby" button
- **Filtering**: Apply filters for dietary preferences, price range, or cuisine
- **Reviews**: Rate messes on food quality, service, cleanliness, and value
- **Favorites**: Save frequently visited messes for quick access

## 🌟 Unique Selling Points

1. **Real-time Menu Updates**: Mess owners can update menus instantly
2. **Geolocation Integration**: Accurate distance calculations and map integration
3. **Comprehensive Filtering**: Filter by dietary needs, budget, and preferences
4. **Multi-category Ratings**: Rate different aspects of mess experience
5. **Mobile-First Design**: Optimized for mobile usage patterns
6. **Offline Capability**: Basic functionality works without internet
7. **Scalable Architecture**: Built to handle growth and new features

## 🔮 Future Enhancements

### Planned Features
- **🔔 Push Notifications**: Real-time alerts for new menus and offers
- **💳 Payment Integration**: Online payment for advance booking
- **📊 Advanced Analytics**: Detailed insights for mess owners
- **🤖 AI Recommendations**: Personalized mess suggestions
- **🗣️ Multi-language Support**: Support for local languages
- **📱 Mobile App**: Native iOS and Android applications
- **🎯 Loyalty Programs**: Reward frequent customers
- **📈 Subscription Plans**: Premium features for mess owners

### Technical Improvements
- **🚀 Performance Optimization**: Implement caching strategies
- **🔒 Enhanced Security**: Add two-factor authentication
- **📱 PWA Features**: Full offline support and app-like experience
- **🔄 Real-time Updates**: WebSocket integration for live updates
- **🧪 Testing Coverage**: Comprehensive unit and integration tests

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design for new UI components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js, UI/UX Design
- **Backend Development**: Node.js, MongoDB, API Design
- **Mobile Development**: React Native (Future)
- **DevOps**: Deployment, CI/CD, Monitoring

## 📞 Support

For support, email support@dailydine.com or join our Slack channel.

## 🙏 Acknowledgments

- Google Maps API for location services
- Cloudinary for image management
- MongoDB Atlas for database hosting
- All the beta testers and early adopters

---

**DailyDine** - *Making dining decisions effortless, one menu at a time!* 🍽️

## 📊 Project Statistics

- **Lines of Code**: 10,000+
- **API Endpoints**: 25+
- **Database Collections**: 5
- **Third-party Integrations**: 4
- **Responsive Breakpoints**: 5
- **Supported Browsers**: Chrome, Firefox, Safari, Edge

---

*Built with ❤️ by the DailyDine Team*
