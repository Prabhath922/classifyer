# Waste Classifier Mobile App

An AI-powered mobile application for iOS and Android that helps users classify waste materials into proper disposal categories. The app can analyze photos, text descriptions, and material information to determine whether items should be disposed of as garbage, wet waste, plastic, paper, or other recyclable materials.

## Features

- 📷 **Photo Classification**: Take photos of waste items for AI-powered classification
- ✏️ **Text Input**: Describe items or enter product names for classification
- 🎯 **Smart Categorization**: Classifies items into:
  - Plastic (recyclable)
  - Paper/Cardboard (recyclable)
  - Organic/Wet Waste (compostable)
  - Glass (recyclable)
  - Metal (recyclable)
  - General Garbage (non-recyclable)
- 📋 **Disposal Instructions**: Provides step-by-step disposal guidance
- 💡 **Pro Tips**: Educational content about proper waste management
- 📍 **Location Awareness**: Uses device location for local disposal guidelines

## Technology Stack

- **React Native** with **Expo** for cross-platform development
- **Expo Camera** for photo capture
- **Expo Image Picker** for gallery access
- **Expo Location** for location services
- **React Navigation** for screen navigation
- **Linear Gradient** for beautiful UI design
- **AI Classification Service** (simulated with pattern matching - ready for real AI integration)

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo Go app on your mobile device (for testing)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd waste-classifier-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web (for testing)
   npm run web
   ```

## Project Structure

```
src/
├── screens/
│   ├── HomeScreen.js          # Main landing screen
│   ├── CameraScreen.js        # Camera and photo capture
│   ├── TextInputScreen.js     # Text-based classification
│   └── ResultsScreen.js       # Classification results display
├── services/
│   └── ClassificationService.js # AI classification logic
└── components/                # Reusable UI components
```

## AI Integration

The app currently uses pattern matching for classification. To integrate with real AI services:

### Google Vision API
```javascript
// Uncomment and configure in ClassificationService.js
const GOOGLE_VISION_API_KEY = 'your-api-key';
```

### AWS Rekognition
```javascript
// Add AWS SDK and configure
import AWS from 'aws-sdk';
```

### Custom ML Model
```javascript
// Integrate TensorFlow.js or other ML frameworks
import * as tf from '@tensorflow/tfjs';
```

## Building for Production

### iOS Build
1. **Configure app.json** with your bundle identifier
2. **Build with EAS**
   ```bash
   npx eas build --platform ios
   ```

### Android Build
1. **Configure app.json** with your package name
2. **Build with EAS**
   ```bash
   npx eas build --platform android
   ```

### App Store Deployment
1. **Configure EAS Submit**
   ```bash
   npx eas submit --platform ios
   npx eas submit --platform android
   ```

## Configuration

### App Configuration (app.json)
- Update `bundleIdentifier` for iOS
- Update `package` for Android
- Configure app icons and splash screens
- Set up permissions for camera and location

### Environment Variables
Create a `.env` file for sensitive configuration:
```
GOOGLE_VISION_API_KEY=your-api-key
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## Permissions

The app requires the following permissions:

### iOS (Info.plist)
- `NSCameraUsageDescription`: Camera access for photo capture
- `NSLocationWhenInUseUsageDescription`: Location access for local guidelines
- `NSPhotoLibraryUsageDescription`: Photo library access

### Android (AndroidManifest.xml)
- `CAMERA`: Camera access
- `READ_EXTERNAL_STORAGE`: Read photos
- `WRITE_EXTERNAL_STORAGE`: Save photos
- `ACCESS_FINE_LOCATION`: Location access

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# Install Detox for E2E testing
npm install -g detox-cli
detox test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Real AI/ML model integration
- [ ] Barcode scanning for product identification
- [ ] Local recycling center finder
- [ ] Waste tracking and statistics
- [ ] Social sharing of eco-friendly practices
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Push notifications for disposal reminders

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@wasteclassifier.com or create an issue in the repository.

## Acknowledgments

- Expo team for the excellent development platform
- React Native community for resources and support
- Environmental organizations for waste management guidelines