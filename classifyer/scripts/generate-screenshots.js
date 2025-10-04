const fs = require('fs');
const path = require('path');

// Generate app store screenshots
const generateScreenshots = () => {
  console.log('📱 Generating app store screenshots...');
  
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // iPhone screenshot sizes
  const iphoneSizes = [
    { name: 'iPhone 6.7"', width: 1290, height: 2796 },
    { name: 'iPhone 6.5"', width: 1242, height: 2688 },
    { name: 'iPhone 5.5"', width: 1242, height: 2208 }
  ];

  // Android screenshot sizes
  const androidSizes = [
    { name: 'Phone', width: 1080, height: 1920 },
    { name: 'Tablet', width: 1200, height: 1920 }
  ];

  // Generate iPhone screenshots
  iphoneSizes.forEach((size, index) => {
    const screenshot = generateScreenshotSVG(size.width, size.height, `iPhone Screenshot ${index + 1}`);
    const filename = `iphone-${size.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.svg`;
    fs.writeFileSync(path.join(screenshotsDir, filename), screenshot);
    console.log(`✅ Generated ${filename} (${size.width}x${size.height})`);
  });

  // Generate Android screenshots
  androidSizes.forEach((size, index) => {
    const screenshot = generateScreenshotSVG(size.width, size.height, `Android Screenshot ${index + 1}`);
    const filename = `android-${size.name.toLowerCase()}.svg`;
    fs.writeFileSync(path.join(screenshotsDir, filename), screenshot);
    console.log(`✅ Generated ${filename} (${size.width}x${size.height})`);
  });

  console.log('🎉 All screenshots generated successfully!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Convert SVG files to PNG using an online converter');
  console.log('2. Take actual screenshots of your app running on devices');
  console.log('3. Use tools like Fastlane or App Store Connect to upload');
};

const generateScreenshotSVG = (width, height, title) => {
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  
  <!-- Status bar -->
  <rect width="${width}" height="${height * 0.05}" fill="rgba(0,0,0,0.1)"/>
  <text x="${width * 0.05}" y="${height * 0.03}" font-family="Arial, sans-serif" font-size="${width * 0.03}" fill="white">9:41</text>
  <text x="${width * 0.95}" y="${height * 0.03}" font-family="Arial, sans-serif" font-size="${width * 0.03}" fill="white" text-anchor="end">100%</text>
  
  <!-- App content area -->
  <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.8}" height="${height * 0.8}" rx="${width * 0.02}" fill="white" opacity="0.95"/>
  
  <!-- App header -->
  <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.8}" height="${height * 0.15}" rx="${width * 0.02}" fill="#4CAF50"/>
  <text x="${width * 0.5}" y="${height * 0.2}" font-family="Arial, sans-serif" font-size="${width * 0.05}" font-weight="bold" text-anchor="middle" fill="white">Waste Classifier</text>
  
  <!-- Main content -->
  <circle cx="${width * 0.5}" cy="${height * 0.4}" r="${width * 0.08}" fill="#4CAF50" opacity="0.3"/>
  <text x="${width * 0.5}" y="${height * 0.45}" font-family="Arial, sans-serif" font-size="${width * 0.08}" text-anchor="middle">♻️</text>
  
  <text x="${width * 0.5}" y="${height * 0.55}" font-family="Arial, sans-serif" font-size="${width * 0.04}" font-weight="bold" text-anchor="middle" fill="#333">${title}</text>
  <text x="${width * 0.5}" y="${height * 0.6}" font-family="Arial, sans-serif" font-size="${width * 0.03}" text-anchor="middle" fill="#666">AI-Powered Waste Classification</text>
  
  <!-- Buttons -->
  <rect x="${width * 0.2}" y="${height * 0.7}" width="${width * 0.25}" height="${height * 0.08}" rx="${width * 0.01}" fill="#4CAF50"/>
  <text x="${width * 0.325}" y="${height * 0.75}" font-family="Arial, sans-serif" font-size="${width * 0.025}" text-anchor="middle" fill="white">📷 Take Photo</text>
  
  <rect x="${width * 0.55}" y="${height * 0.7}" width="${width * 0.25}" height="${height * 0.08}" rx="${width * 0.01}" fill="white" stroke="#4CAF50" stroke-width="2"/>
  <text x="${width * 0.675}" y="${height * 0.75}" font-family="Arial, sans-serif" font-size="${width * 0.025}" text-anchor="middle" fill="#4CAF50">✏️ Describe</text>
  
  <!-- Footer -->
  <text x="${width * 0.5}" y="${height * 0.95}" font-family="Arial, sans-serif" font-size="${width * 0.02}" text-anchor="middle" fill="white" opacity="0.7">Available on iOS and Android</text>
</svg>`;
};

// Run the script
generateScreenshots();
