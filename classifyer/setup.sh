#!/bin/bash

echo "🚀 Setting up Waste Classifier Mobile App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install Expo CLI globally if not already installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

# Create placeholder asset files if they don't exist
echo "🎨 Creating placeholder assets..."
mkdir -p assets

# Create a simple icon placeholder
if [ ! -f "assets/icon.png" ]; then
    echo "Creating placeholder icon..."
    # You can replace this with actual icon generation
    touch assets/icon.png
fi

if [ ! -f "assets/splash.png" ]; then
    echo "Creating placeholder splash screen..."
    touch assets/splash.png
fi

if [ ! -f "assets/adaptive-icon.png" ]; then
    echo "Creating placeholder adaptive icon..."
    touch assets/adaptive-icon.png
fi

if [ ! -f "assets/favicon.png" ]; then
    echo "Creating placeholder favicon..."
    touch assets/favicon.png
fi

echo "✅ Setup complete!"
echo ""
echo "📱 To start the development server:"
echo "   npm start"
echo ""
echo "📱 To run on iOS simulator:"
echo "   npm run ios"
echo ""
echo "📱 To run on Android emulator:"
echo "   npm run android"
echo ""
echo "📱 To run on web browser:"
echo "   npm run web"
echo ""
echo "🔧 Make sure you have:"
echo "   - iOS Simulator (for iOS development)"
echo "   - Android Studio with emulator (for Android development)"
echo "   - Expo Go app on your phone (for testing)"
echo ""
echo "🎉 Happy coding!"
