const fs = require('fs');
const path = require('path');

// This script generates professional app assets
// Run with: node scripts/generate-assets.js

const generateAssets = () => {
  console.log('🎨 Generating professional app assets...');
  
  // Create assets directory if it doesn't exist
  const assetsDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Generate SVG-based assets
  const generateIcon = (size, filename) => {
    const svg = `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad1)"/>
  <circle cx="${size * 0.5}" cy="${size * 0.4}" r="${size * 0.15}" fill="white" opacity="0.9"/>
  <path d="M${size * 0.35} ${size * 0.5} L${size * 0.65} ${size * 0.5} L${size * 0.6} ${size * 0.7} L${size * 0.4} ${size * 0.7} Z" fill="white" opacity="0.9"/>
  <text x="${size * 0.5}" y="${size * 0.85}" font-family="Arial, sans-serif" font-size="${size * 0.12}" font-weight="bold" text-anchor="middle" fill="white">♻️</text>
</svg>`;
    
    fs.writeFileSync(path.join(assetsDir, filename), svg);
    console.log(`✅ Generated ${filename} (${size}x${size})`);
  };

  // Generate splash screen
  const generateSplash = (width, height, filename) => {
    const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#splashGrad)"/>
  <circle cx="${width * 0.5}" cy="${height * 0.4}" r="${width * 0.08}" fill="white" opacity="0.9"/>
  <path d="M${width * 0.42} ${height * 0.45} L${width * 0.58} ${height * 0.45} L${width * 0.55} ${height * 0.55} L${width * 0.45} ${height * 0.55} Z" fill="white" opacity="0.9"/>
  <text x="${width * 0.5}" y="${height * 0.6}" font-family="Arial, sans-serif" font-size="${width * 0.06}" font-weight="bold" text-anchor="middle" fill="white">♻️</text>
  <text x="${width * 0.5}" y="${height * 0.7}" font-family="Arial, sans-serif" font-size="${width * 0.08}" font-weight="bold" text-anchor="middle" fill="white">Waste Classifier</text>
  <text x="${width * 0.5}" y="${height * 0.75}" font-family="Arial, sans-serif" font-size="${width * 0.04}" text-anchor="middle" fill="white" opacity="0.8">AI-Powered Recycling Assistant</text>
</svg>`;
    
    fs.writeFileSync(path.join(assetsDir, filename), svg);
    console.log(`✅ Generated ${filename} (${width}x${height})`);
  };

  // Generate all required assets
  generateIcon(1024, 'icon.png');
  generateIcon(512, 'adaptive-icon.png');
  generateIcon(32, 'favicon.png');
  generateSplash(1242, 2436, 'splash.png');

  console.log('🎉 All assets generated successfully!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Convert SVG files to PNG using an online converter or ImageMagick');
  console.log('2. For iOS: Create 1024x1024 icon.png');
  console.log('3. For Android: Create 512x512 adaptive-icon.png');
  console.log('4. Create splash screens for different device sizes');
  console.log('5. Generate app store screenshots');
};

// Run the script
generateAssets();
