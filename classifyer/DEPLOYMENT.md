# Deployment Guide - Waste Classifier Mobile App

This guide will help you deploy the Waste Classifier app to both iOS and Android app stores.

## Prerequisites

1. **Expo Account**: Sign up at [expo.dev](https://expo.dev)
2. **Apple Developer Account**: For iOS App Store deployment
3. **Google Play Console Account**: For Android Play Store deployment
4. **EAS CLI**: Install with `npm install -g eas-cli`

## Initial Setup

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Initialize EAS
```bash
eas build:configure
```

## iOS Deployment

### 1. Configure iOS Build
Update `app.json` with your iOS configuration:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.wasteclassifier",
      "buildNumber": "1.0.0"
    }
  }
}
```

### 2. Build for iOS
```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

### 3. Submit to App Store
```bash
eas submit --platform ios
```

### 4. App Store Connect Setup
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create a new app
3. Fill in app information:
   - Name: "Waste Classifier"
   - Bundle ID: Your configured bundle identifier
   - SKU: Unique identifier
4. Upload screenshots and app description
5. Submit for review

## Android Deployment

### 1. Configure Android Build
Update `app.json` with your Android configuration:
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.wasteclassifier",
      "versionCode": 1
    }
  }
}
```

### 2. Build for Android
```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform android --profile production
```

### 3. Submit to Play Store
```bash
eas submit --platform android
```

### 4. Google Play Console Setup
1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in store listing:
   - App name: "Waste Classifier"
   - Short description: "AI-powered waste classification app"
   - Full description: Detailed description of features
4. Upload app bundle and screenshots
5. Set up content rating and pricing
6. Submit for review

## Build Profiles

### Development Profile
```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal"
  }
}
```

### Production Profile
```json
{
  "production": {
    "distribution": "store"
  }
}
```

## Environment Variables

Create `.env` file for sensitive data:
```env
# AI Service Keys
GOOGLE_VISION_API_KEY=your-google-vision-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# App Configuration
APP_VERSION=1.0.0
BUILD_NUMBER=1
```

## App Store Assets

### Required Assets
- **App Icon**: 1024x1024 PNG (iOS), 512x512 PNG (Android)
- **Splash Screen**: 1242x2436 PNG (iOS), 1080x1920 PNG (Android)
- **Screenshots**: Various sizes for different devices
- **App Store Screenshots**: 6.7", 6.5", 5.5" displays

### Screenshot Requirements

#### iOS Screenshots
- iPhone 6.7" Display: 1290 x 2796 pixels
- iPhone 6.5" Display: 1242 x 2688 pixels
- iPhone 5.5" Display: 1242 x 2208 pixels

#### Android Screenshots
- Phone: 1080 x 1920 pixels
- Tablet: 1200 x 1920 pixels

## Testing Before Deployment

### 1. TestFlight (iOS)
```bash
# Build and submit to TestFlight
eas build --platform ios --profile production
eas submit --platform ios
```

### 2. Internal Testing (Android)
```bash
# Build and upload to Play Console
eas build --platform android --profile production
eas submit --platform android
```

## App Store Optimization (ASO)

### Keywords
- waste classification
- recycling app
- eco-friendly
- sustainability
- AI waste detection
- environmental app

### Description Template
```
Waste Classifier - AI-Powered Recycling Assistant

Transform your waste management with our intelligent classification app! 

🔍 FEATURES:
• AI-powered photo recognition
• Smart text-based classification
• Comprehensive disposal instructions
• Location-based recycling guidelines
• Educational tips and best practices

📱 HOW IT WORKS:
1. Take a photo or describe your waste item
2. Get instant AI classification
3. Follow detailed disposal instructions
4. Learn proper recycling practices

🌱 CATEGORIES:
• Plastic (recyclable)
• Paper/Cardboard (recyclable)
• Organic/Wet Waste (compostable)
• Glass (recyclable)
• Metal (recyclable)
• General Garbage

Join thousands of users making a positive environmental impact!
```

## Monitoring and Analytics

### 1. Expo Analytics
```bash
# Enable analytics
eas analytics:enable
```

### 2. Crash Reporting
Add crash reporting service:
```bash
npm install @sentry/react-native
```

### 3. Performance Monitoring
Monitor app performance with:
- Expo Analytics
- Firebase Performance
- New Relic Mobile

## Updates and Maintenance

### 1. Over-the-Air Updates
```bash
# Publish update
eas update --branch production --message "Bug fixes and improvements"
```

### 2. New Builds
For native code changes:
```bash
# Build new version
eas build --platform all --profile production
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check `app.json` configuration
   - Verify all dependencies are compatible
   - Check for missing assets

2. **App Store Rejection**
   - Review Apple/Google guidelines
   - Fix any policy violations
   - Update app description and screenshots

3. **Performance Issues**
   - Optimize images and assets
   - Review bundle size
   - Test on various devices

### Support Resources
- [Expo Documentation](https://docs.expo.dev)
- [Apple Developer Guidelines](https://developer.apple.com/app-store/review/guidelines)
- [Google Play Policy](https://support.google.com/googleplay/android-developer/answer/9859348)

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Permissions**: Only request necessary permissions
3. **Data Privacy**: Implement proper data handling
4. **Code Obfuscation**: Consider for production builds

## Post-Launch

1. **Monitor Reviews**: Respond to user feedback
2. **Analytics**: Track usage and performance
3. **Updates**: Regular bug fixes and feature updates
4. **Marketing**: Promote through social media and partnerships
