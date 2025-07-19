# DailyDine - Mess Menu Web Application

DailyDine is a comprehensive web application that connects mess owners with customers, allowing users to discover daily menus from nearby messes and helping mess owners showcase their offerings.

## 🚀 Features

### For Users
- **Browse Daily Menus**: View today's menus from all registered messes
- **Location-Based Discovery**: Find messes near your location with distance information
- **Interactive Maps**: Google Maps integration showing mess locations
- **Menu Filtering**: Filter menus by date and meal categories (breakfast, lunch, dinner, snacks)
- **Reviews & Ratings**: Read and write reviews for messes with detailed ratings
- **User Authentication**: Secure login/signup system with JWT
- **Profile Management**: Update personal information and location preferences
- **Real-time Distance Calculation**: See exact distance to messes from your location

### For Mess Owners
- **Menu Management**: Create and update daily menus with items and prices
- **Business Profile**: Manage mess information, contact details, and location
- **Dashboard Analytics**: Overview of menu performance and customer reviews
- **Location Services**: Set and update mess location with coordinates
- **Special Offers**: Add promotional offers and discounts
- **Review Management**: View and respond to customer feedback
- **Real-time Updates**: Instant menu updates and notifications

### Technical Features
- **Real-time Updates**: Instant menu updates and notifications
- **Geolocation**: Automatic location detection and nearby mess search
- **Responsive Design**: Mobile-first design for all devices
- **Secure Authentication**: JWT-based authentication system
- **Database Indexing**: Optimized queries for fast performance
- **Google Maps Integration**: Interactive maps with custom markers
- **Advanced Search**: Filter by location, rating, and cuisine type

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling and responsive design
- **React Router** - Navigation and routing
- **React Icons** - Icon library
- **Google Maps API** - Location services
- **React Hot Toast** - Notifications
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with geospatial indexing
- **Mongoose** - Object modeling for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Google Maps API key

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
```

#### Frontend Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
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

### 5. Google Maps API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Maps JavaScript API
4. Create API key
5. Add the API key to your frontend `.env` file

### 6. Run the Application

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

## 📱 Usage

### For Users
1. **Browse Menus**: Visit the homepage to see today's menus from all messes
2. **Find Nearby**: Use the "Nearby" feature to find messes close to your location
3. **View Details**: Click on any mess to see detailed menu and information
4. **Leave Reviews**: Rate and review messes after visiting them
5. **Set Location**: Update your location to get accurate distance calculations

### For Mess Owners
1. **Register**: Sign up as a mess owner with your business details
2. **Set Location**: Provide your mess location coordinates
3. **Create Menus**: Add daily menu items with prices and categories
4. **Manage Profile**: Update your mess information and contact details
5. **View Analytics**: Monitor reviews and menu performance

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
    image: String
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
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing protection
- **Helmet Security**: Additional security headers
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account and install Heroku CLI
2. Create a new Heroku app
3. Set environment variables in Heroku dashboard
4. Deploy using Git:
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

### Database Deployment (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string and update your environment variables

## 📁 Project Structure

```
dailydine/
├── public/
├── src/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   └── ...
│   │   ├── core/
│   │   │   └── Auth/
│   │   └── GoogleMap.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── MessSignup.jsx
│   │   ├── MessDashboard.jsx
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
│   ├── App.jsx
│   └── index.js
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Menu.js
│   │   ├── Review.js
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menus.js
│   │   ├── messes.js
│   │   ├── reviews.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Project**: DailyDine - Mess Menu Web Application
- **Version**: 1.0.0

## 📞 Support

For support and questions, please contact:
- Email: support@dailydine.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/dailydine/issues)

## 🔮 Future Enhancements

- **Real-time Notifications**: Push notifications for menu updates
- **Payment Integration**: Online payment for meal bookings
- **Advanced Analytics**: Detailed insights for mess owners
- **Mobile App**: Native mobile applications
- **AI Recommendations**: Personalized menu recommendations
- **Multi-language Support**: Internationalization
- **Advanced Search**: Filter by cuisine, price range, dietary preferences
- **Order Management**: Online ordering system
- **Loyalty Program**: Customer rewards and points
- **Social Features**: Mess following and social sharing

## 🐛 Known Issues

- Google Maps API key needs to be configured for map functionality
- Some npm packages may show deprecation warnings (non-blocking)
- MongoDB connection should be secured in production

## 📝 Changelog

### Version 1.0.0
- Initial release with core features
- User and mess owner authentication
- Menu management system
- Location-based search
- Review and rating system
- Google Maps integration
- Responsive design

---

**DailyDine** - Making meal decisions easier, one mess at a time! 🍽️
