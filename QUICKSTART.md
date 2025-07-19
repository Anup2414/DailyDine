# 🍽️ DailyDine - Quick Start Guide

Welcome to DailyDine! This guide will help you get the project running in under 10 minutes.

## 🚀 Super Quick Setup (Automated)

1. **Extract the project** to your desired location
2. **Open terminal** in the project directory
3. **Run the setup script**:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
4. **Update environment variables** (see below)
5. **Start the application**:
   ```bash
   npm run dev
   ```

## 🔧 Manual Setup (Step by Step)

### Prerequisites
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- MongoDB (local or Atlas) - [Get Atlas free](https://www.mongodb.com/atlas)

### 1. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Setup

**Frontend (.env)**
```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_OPENCAGE_API_KEY=your_opencage_api_key
```

**Backend (server/.env)**
```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017/dailydine
JWT_SECRET=your_super_secret_jwt_key
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=dailydine_uploads
```

### 3. Get API Keys (Required for full functionality)

**Google Maps API Key**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Maps JavaScript API and Geocoding API
4. Create credentials → API Key
5. Add to `REACT_APP_GOOGLE_MAPS_API_KEY`

**MongoDB Atlas (Recommended)**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string
4. Add to `MONGODB_URL`

**Cloudinary (For image uploads)**
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get cloud name, API key, and API secret from dashboard
3. Add to respective environment variables

**Email Service (Optional)**
1. Use Gmail with app password
2. Or any SMTP service
3. Add credentials to mail variables

### 4. Start the Application

**Development Mode (Both servers)**
```bash
npm run dev
```

**Individual Servers**
```bash
# Frontend only (React)
npm start

# Backend only (Node.js)
npm run server
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api/v1

## 🎯 Quick Test

1. **Open** http://localhost:3000
2. **Allow location** access when prompted
3. **Sign up** as a User or Mess Owner
4. **Explore** nearby messes or create your mess

## 📱 Key Features to Test

### For Users
- **Location Detection**: Allow GPS access to find nearby messes
- **Browse Messes**: View mess cards with distance and ratings
- **Menu Exploration**: Check daily menus and prices
- **Reviews**: Read and write reviews for messes

### For Mess Owners
- **Create Mess**: Add your mess with location and details
- **Menu Management**: Create daily menus with items and pricing
- **Image Uploads**: Add photos of your mess and food
- **Analytics**: View customer reviews and feedback

## 🛠️ Troubleshooting

**Port Already in Use**
```bash
# Kill process on port 3000 or 4000
npx kill-port 3000
npx kill-port 4000
```

**MongoDB Connection Error**
- Check if MongoDB is running locally: `mongod`
- Or use MongoDB Atlas connection string
- Ensure correct database URL in server/.env

**Location Not Working**
- Enable location access in browser
- Use HTTPS in production for geolocation
- Check Google Maps API key

**Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# For backend
cd server
rm -rf node_modules package-lock.json
npm install
```

## 📚 Project Structure

```
dailydine/
├── src/                    # React frontend
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── utils/            # Utility functions
├── server/               # Node.js backend
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── middleware/      # Auth middleware
├── public/              # Static assets
└── docs/               # Documentation
```

## 🔗 Important URLs

- **Documentation**: [README.md](./README.md)
- **API Endpoints**: Check `src/services/apis.js`
- **Backend Routes**: Check `server/routes/`

## 🎉 You're All Set!

DailyDine should now be running successfully. If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all services (MongoDB, etc.) are running
4. Review the detailed README.md for more information

**Happy dining with DailyDine! 🍽️**

---

*For detailed development guidelines and advanced features, check the main [README.md](./README.md)*