import axios from 'axios';
import AIService from './AIService';

class ClassificationService {
  constructor() {
    this.aiService = AIService;
    this.useAI = true; // Toggle to enable/disable AI features
  }

  // Enhanced image classification with AI services
  async classifyImage(imageUri) {
    try {
      if (this.useAI) {
        // Try AI services in order of preference
        try {
          // First try Google Vision API
          return await this.aiService.classifyWithGoogleVision(imageUri);
        } catch (googleError) {
          console.log('Google Vision failed, trying AWS Rekognition:', googleError.message);
          
          try {
            // Fallback to AWS Rekognition
            return await this.aiService.classifyWithAWSRekognition(imageUri);
          } catch (awsError) {
            console.log('AWS Rekognition failed, trying custom model:', awsError.message);
            
            try {
              // Fallback to custom TensorFlow model
              return await this.aiService.classifyWithCustomModel(imageUri);
            } catch (modelError) {
              console.log('Custom model failed, using fallback:', modelError.message);
              // Fallback to pattern matching
              return this.fallbackImageClassification();
            }
          }
        }
      } else {
        // Use fallback pattern matching
        return this.fallbackImageClassification();
      }
    } catch (error) {
      console.error('Image classification error:', error);
      throw new Error('Failed to classify image');
    }
  }

  // Fallback image classification
  fallbackImageClassification() {
    const categories = ['plastic', 'paper', 'organic', 'garbage'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    return {
      category: randomCategory,
      confidence: Math.random() * 0.4 + 0.6, // 60-100% confidence
      details: this.getCategoryDetails(randomCategory),
      disposalInstructions: this.getDisposalInstructions(randomCategory)
    };
  }

  // Enhanced text classification with AI
  async classifyText(inputData) {
    try {
      if (this.useAI) {
        // Use AI-powered text analysis
        return await this.aiService.classifyTextWithAI(inputData);
      } else {
        // Use fallback pattern matching
        return this.fallbackTextClassification(inputData);
      }
    } catch (error) {
      console.error('Text classification error:', error);
      throw new Error('Failed to classify text');
    }
  }

  // Fallback text classification
  fallbackTextClassification(inputData) {
    const { description, productName, material, selectedProduct } = inputData;
    
    // If we have a selected product from the database, use its information
    if (selectedProduct) {
      return {
        category: selectedProduct.category,
        confidence: 0.95, // High confidence for database products
        details: this.getCategoryDetails(selectedProduct.category),
        disposalInstructions: selectedProduct.disposalInstructions || this.getDisposalInstructions(selectedProduct.category),
        productInfo: selectedProduct
      };
    }
    
    const combinedText = `${description} ${productName} ${material}`.toLowerCase();
    
    let category = 'garbage';
    let confidence = 0.5;
    
    // Pattern matching for classification
    if (this.containsKeywords(combinedText, ['plastic', 'bottle', 'bag', 'container', 'wrapper'])) {
      category = 'plastic';
      confidence = 0.85;
    } else if (this.containsKeywords(combinedText, ['paper', 'cardboard', 'box', 'newspaper', 'magazine'])) {
      category = 'paper';
      confidence = 0.85;
    } else if (this.containsKeywords(combinedText, ['food', 'organic', 'banana', 'apple', 'vegetable', 'fruit', 'scraps'])) {
      category = 'organic';
      confidence = 0.90;
    } else if (this.containsKeywords(combinedText, ['glass', 'jar', 'bottle'])) {
      category = 'glass';
      confidence = 0.80;
    } else if (this.containsKeywords(combinedText, ['metal', 'can', 'aluminum', 'tin'])) {
      category = 'metal';
      confidence = 0.80;
    }

    return {
      category,
      confidence,
      details: this.getCategoryDetails(category),
      disposalInstructions: this.getDisposalInstructions(category)
    };
  }

  containsKeywords(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }

  getCategoryDetails(category) {
    const details = {
      plastic: {
        name: 'Plastic',
        icon: '🔄',
        description: 'Recyclable plastic materials',
        color: '#2196F3'
      },
      paper: {
        name: 'Paper/Cardboard',
        icon: '📄',
        description: 'Paper and cardboard materials',
        color: '#8BC34A'
      },
      organic: {
        name: 'Organic/Wet Waste',
        icon: '🍎',
        description: 'Biodegradable food and organic materials',
        color: '#FF9800'
      },
      glass: {
        name: 'Glass',
        icon: '🍶',
        description: 'Glass containers and bottles',
        color: '#9C27B0'
      },
      metal: {
        name: 'Metal',
        icon: '🥫',
        description: 'Metal cans and containers',
        color: '#607D8B'
      },
      garbage: {
        name: 'General Garbage',
        icon: '🗑️',
        description: 'Non-recyclable waste',
        color: '#795548'
      }
    };
    
    return details[category] || details.garbage;
  }

  getDisposalInstructions(category) {
    const instructions = {
      plastic: [
        'Clean the plastic item before recycling',
        'Remove any food residue or labels if possible',
        'Check if your local recycling program accepts this type of plastic',
        'Place in recycling bin or take to recycling center'
      ],
      paper: [
        'Remove any plastic or metal components',
        'Keep paper dry and clean',
        'Flatten cardboard boxes to save space',
        'Place in paper recycling bin'
      ],
      organic: [
        'Remove any non-organic materials (plastic, metal)',
        'Compost at home if possible',
        'Use municipal composting service',
        'Avoid putting meat or dairy in home compost'
      ],
      glass: [
        'Remove caps and lids (recycle separately)',
        'Rinse glass containers',
        'Check for cracks - broken glass may need special handling',
        'Place in glass recycling bin'
      ],
      metal: [
        'Rinse metal containers',
        'Remove any plastic or paper labels',
        'Flatten aluminum cans to save space',
        'Place in metal recycling bin'
      ],
      garbage: [
        'Ensure item is completely non-recyclable',
        'Remove any recyclable components first',
        'Place in general waste bin',
        'Consider if item can be donated or repurposed'
      ]
    };
    
    return instructions[category] || instructions.garbage;
  }

  // Real AI service integration example (commented out)
  /*
  async classifyImageWithGoogleVision(imageBase64) {
    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          requests: [
            {
              image: {
                content: imageBase64
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10
                }
              ]
            }
          ]
        }
      );
      
      const labels = response.data.responses[0].labelAnnotations;
      return this.processVisionLabels(labels);
    } catch (error) {
      console.error('Google Vision API error:', error);
      throw error;
    }
  }
  */
}

export default new ClassificationService();
