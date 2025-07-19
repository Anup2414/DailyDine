#!/bin/bash

# DailyDine Project Setup Script
# This script helps you set up the DailyDine project quickly

echo "🍽️  Welcome to DailyDine Setup!"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if MongoDB is available (optional)
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB detected locally"
else
    echo "⚠️  MongoDB not detected locally. You can use MongoDB Atlas cloud database."
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🔧 Setting up environment files..."

# Create frontend .env file
if [ ! -f .env ]; then
    cat > .env << EOL
# DailyDine Frontend Environment Variables
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_OPENCAGE_API_KEY=your_opencage_api_key
EOL
    echo "✅ Created frontend .env file"
else
    echo "⚠️  Frontend .env file already exists"
fi

# Create backend .env file
if [ ! -f server/.env ]; then
    cat > server/.env << EOL
# DailyDine Backend Environment Variables
PORT=4000
MONGODB_URL=mongodb://localhost:27017/dailydine
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=dailydine_uploads
EOL
    echo "✅ Created backend .env file"
else
    echo "⚠️  Backend .env file already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📝 Next Steps:"
echo "1. Update the .env files with your actual API keys:"
echo "   - Google Maps API key"
echo "   - MongoDB connection string"
echo "   - Cloudinary credentials"
echo "   - Email service credentials"
echo ""
echo "2. Start the development servers:"
echo "   Frontend & Backend: npm run dev"
echo "   Frontend only:     npm start"
echo "   Backend only:      npm run server"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For detailed setup instructions, check README.md"
echo ""
echo "🍽️  Happy coding with DailyDine!"