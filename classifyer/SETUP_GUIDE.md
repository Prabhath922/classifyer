# 🚀 Waste Classifier Mobile App - Complete Setup Guide

This guide will walk you through setting up the Waste Classifier mobile app with real AI integration, creating professional assets, and deploying to app stores.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **EAS CLI** (`npm install -g eas-cli`)
- **iOS Simulator** (for iOS development)
- **Android Studio** with emulator (for Android development)
- **Expo Go app** on your mobile device (for testing)

## 🔧 Initial Setup

### 1. Install Dependencies

```bash

# Install project dependencies
npm install

# Install EAS CLI globally
npm install -g eas-cli
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp env.example .env
```

Edit `.env` with your API keys:

```env
# Google Vision API
EXPO_PUBLIC_GOOGLE_VISION_API_KEY=your-google-vision-api-key-here

# AWS Rekognition
EXPO_PUBLIC_AWS_ACCESS_KEY_ID=your-aws-access-key-id-here
EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key-here
EXPO_PUBLIC_AWS_REGION=us-east-1

# App Configuration
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_BUILD_NUMBER=1
```

## 🤖 AI Service Setup

### Google Vision API Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable Vision API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Vision API" and enable it

3. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key to your `.env` file

4. **Restrict API Key** (Recommended)
   - Click on your API key
   - Under "Application restrictions", select "Android apps" or "iOS apps"
   - Add your app's bundle identifier

### AWS Rekognition Setup

1. **Create AWS Account**
   - Sign up at [AWS Console](https://aws.amazon.com/console/)

2. **Create IAM User**
   - Go to IAM > Users > Create User
   - Attach policy: `AmazonRekognitionFullAccess`
   - Create access keys

3. **Configure AWS Credentials**
   - Add credentials to your `.env` file
   - Set region (e.g., `us-east-1`)

### Custom ML Model (Optional)

For advanced users who want to implement custom models:

1. **Train a Model**
   - Use TensorFlow, PyTorch, or other ML frameworks
   - Train on waste classification dataset
   - Export model in compatible format

2. **Deploy Model**
   - Host model on cloud service (AWS S3, Google Cloud Storage)
   - Update model URL in configuration

## 🎨 Asset Generation

### 1. Generate App Assets

```bash
# Generate professional app icons and splash screens
node scripts/generate-assets.js
```

### 2. Convert SVG to PNG

The generated SVG files need to be converted to PNG:

**Option A: Online Converter**
- Upload SVG files to [convertio.co](https://convertio.co/svg-png/)
- Download PNG versions

**Option B: ImageMagick (Command Line)**
```bash
# Install ImageMagick
brew install imagemagick  # macOS
# or
sudo apt-get install imagemagick  # Ubuntu

# Convert files
convert assets/icon.svg assets/icon.png
convert assets/splash.svg assets/splash.png
convert assets/adaptive-icon.svg assets/adaptive-icon.png
```

### 3. Generate Screenshots

```bash
# Generate app store screenshots
node scripts/generate-screenshots.js
```

## 🏗️ Build Configuration

### 1. Configure EAS Build

```bash
# Login to Expo
eas login

# Configure EAS Build
eas build:configure
```

### 2. Update App Configuration

Edit `app.json` with your app details:

```json
{
  "expo": {
    "name": "Waste Classifier",
    "slug": "waste-classifier",
    "ios": {
      "bundleIdentifier": "com.yourcompany.wasteclassifier"
    },
    "android": {
      "package": "com.yourcompany.wasteclassifier"
    }
  }
}
```

## 🚀 Development

### 1. Start Development Server

```bash
# Start Expo development server
npm start

# Or run on specific platforms
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

### 2. Test AI Features

1. **Test Google Vision API**
   - Take a photo of a waste item
   - Check console logs for API responses
   - Verify classification accuracy

2. **Test AWS Rekognition**
   - Try different types of waste items
   - Compare results with Google Vision

3. **Test Fallback System**
   - Disable API keys temporarily
   - Verify fallback pattern matching works

## 📱 Building for Production

### 1. Development Build

```bash
# Build for testing
eas build --platform all --profile development
```

### 2. Preview Build

```bash
# Build for internal testing
eas build --platform all --profile preview
```

### 3. Production Build

```bash
# Build for app stores
eas build --platform all --profile production
```

## 🏪 App Store Deployment

### iOS App Store

1. **Configure App Store Connect**
   ```bash
   # Submit to App Store
   eas submit --platform ios --profile production
   ```

2. **App Store Connect Setup**
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Create new app
   - Fill in app information from `app-store-metadata.json`
   - Upload screenshots and app description
   - Submit for review

### Google Play Store

1. **Configure Google Play Console**
   ```bash
   # Submit to Play Store
   eas submit --platform android --profile production
   ```

2. **Play Console Setup**
   - Go to [Google Play Console](https://play.google.com/console)
   - Create new app
   - Fill in store listing from `app-store-metadata.json`
   - Upload app bundle and screenshots
   - Set up content rating and pricing
   - Submit for review

## 🔄 Over-the-Air Updates

For updates that don't require native code changes:

```bash
# Publish OTA update
eas update --branch production --message "Bug fixes and improvements"
```

## 📊 Monitoring and Analytics

### 1. Enable Expo Analytics

```bash
# Enable analytics
eas analytics:enable
```

### 2. Add Crash Reporting

```bash
# Install Sentry for crash reporting
npm install @sentry/react-native
```

### 3. Performance Monitoring

Consider adding:
- Firebase Performance
- New Relic Mobile
- Custom analytics

## 🧪 Testing

### 1. Unit Tests

```bash
# Run tests
npm test
```

### 2. E2E Tests

```bash
# Install Detox for E2E testing
npm install -g detox-cli
detox test
```

### 3. Manual Testing

- Test on various devices and screen sizes
- Test with different network conditions
- Test AI classification accuracy
- Test offline functionality

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check `app.json` configuration
   - Verify all dependencies are compatible
   - Check for missing assets

2. **AI Service Errors**
   - Verify API keys are correct
   - Check API quotas and billing
   - Test API endpoints independently

3. **App Store Rejection**
   - Review Apple/Google guidelines
   - Fix any policy violations
   - Update app description and screenshots

### Support Resources

- [Expo Documentation](https://docs.expo.dev)
- [Apple Developer Guidelines](https://developer.apple.com/app-store/review/guidelines)
- [Google Play Policy](https://support.google.com/googleplay/android-developer/answer/9859348)

## 📈 Future Enhancements

### Planned Features

- [ ] Barcode scanning for product identification
- [ ] Local recycling center finder
- [ ] Waste tracking and statistics
- [ ] Social sharing of eco-friendly practices
- [ ] Multi-language support
- [ ] Voice input for waste description
- [ ] AR features for waste identification

### AI Improvements

- [ ] Custom trained models
- [ ] Real-time model updates
- [ ] Offline AI capabilities
- [ ] Multi-modal input (image + text + voice)

## 🎉 Success!

Your Waste Classifier mobile app is now ready for production! 

### Next Steps

1. **Test thoroughly** on various devices
2. **Gather user feedback** during beta testing
3. **Monitor performance** and crash reports
4. **Iterate and improve** based on user data
5. **Scale AI services** as usage grows

### Support

For questions or issues:
- Check the documentation
- Review the troubleshooting section
- Create an issue in the repository
- Contact support at support@wasteclassifier.com

---

**Happy coding and thank you for helping make the world more sustainable! 🌱♻️**
