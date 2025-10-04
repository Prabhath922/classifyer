import * as FileSystem from 'expo-file-system';
import axios from 'axios';

class AIService {
  constructor() {
    this.googleVisionApiKey = process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY;
    this.awsConfig = {
      accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: process.env.EXPO_PUBLIC_AWS_REGION || 'us-east-1'
    };
    this.customModel = null;
    this.isModelLoaded = false;
  }

  // Initialize AI services
  async initializeAI() {
    try {
      console.log('AI services initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize AI services:', error);
      return false;
    }
  }

  // Load custom waste classification model
  async loadCustomModel() {
    try {
      if (this.isModelLoaded && this.customModel) {
        return this.customModel;
      }

      // In a real implementation, you would load a pre-trained model
      // For now, we'll create a simple model structure
      const modelUrl = 'https://your-model-url.com/waste-classifier-model.json';
      
      // Uncomment when you have a real model
      // this.customModel = await tf.loadLayersModel(modelUrl);
      
      // For demo purposes, we'll simulate a model
      this.customModel = this.createDemoModel();
      this.isModelLoaded = true;
      
      return this.customModel;
    } catch (error) {
      console.error('Failed to load custom model:', error);
      return null;
    }
  }

  // Create a demo model for testing
  createDemoModel() {
    return {
      predict: async (imageTensor) => {
        // Simulate model prediction
        const predictions = tf.randomUniform([1, 6]); // 6 waste categories
        return predictions;
      }
    };
  }

  // Google Vision API integration
  async classifyWithGoogleVision(imageUri) {
    try {
      if (!this.googleVisionApiKey) {
        throw new Error('Google Vision API key not configured');
      }

      // Convert image to base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${this.googleVisionApiKey}`,
        {
          requests: [
            {
              image: {
                content: base64Image
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10
                },
                {
                  type: 'OBJECT_LOCALIZATION',
                  maxResults: 5
                }
              ]
            }
          ]
        }
      );

      const labels = response.data.responses[0].labelAnnotations || [];
      const objects = response.data.responses[0].localizedObjectAnnotations || [];

      return this.processGoogleVisionResults(labels, objects);
    } catch (error) {
      console.error('Google Vision API error:', error);
      throw new Error('Failed to classify image with Google Vision');
    }
  }

  // Process Google Vision results
  processGoogleVisionResults(labels, objects) {
    const allLabels = [
      ...labels.map(label => label.description.toLowerCase()),
      ...objects.map(obj => obj.name.toLowerCase())
    ];

    let category = 'garbage';
    let confidence = 0.5;

    // Enhanced pattern matching with Google Vision labels
    if (this.containsAny(allLabels, ['plastic', 'bottle', 'container', 'bag', 'wrapper', 'packaging'])) {
      category = 'plastic';
      confidence = 0.85;
    } else if (this.containsAny(allLabels, ['paper', 'cardboard', 'box', 'newspaper', 'magazine', 'document'])) {
      category = 'paper';
      confidence = 0.85;
    } else if (this.containsAny(allLabels, ['food', 'fruit', 'vegetable', 'organic', 'banana', 'apple', 'orange'])) {
      category = 'organic';
      confidence = 0.90;
    } else if (this.containsAny(allLabels, ['glass', 'jar', 'bottle', 'container'])) {
      category = 'glass';
      confidence = 0.80;
    } else if (this.containsAny(allLabels, ['metal', 'can', 'aluminum', 'tin', 'steel'])) {
      category = 'metal';
      confidence = 0.80;
    }

    return {
      category,
      confidence,
      labels: allLabels,
      details: this.getCategoryDetails(category),
      disposalInstructions: this.getDisposalInstructions(category)
    };
  }

  // AWS Rekognition integration
  async classifyWithAWSRekognition(imageUri) {
    try {
      if (!this.awsConfig.accessKeyId) {
        throw new Error('AWS credentials not configured');
      }

      // Convert image to base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const AWS = require('aws-sdk');
      AWS.config.update(this.awsConfig);
      
      const rekognition = new AWS.Rekognition();

      const params = {
        Image: {
          Bytes: Buffer.from(base64Image, 'base64')
        },
        MaxLabels: 10,
        MinConfidence: 50
      };

      const result = await rekognition.detectLabels(params).promise();
      return this.processAWSRekognitionResults(result.Labels);
    } catch (error) {
      console.error('AWS Rekognition error:', error);
      throw new Error('Failed to classify image with AWS Rekognition');
    }
  }

  // Process AWS Rekognition results
  processAWSRekognitionResults(labels) {
    const allLabels = labels.map(label => label.Name.toLowerCase());
    
    let category = 'garbage';
    let confidence = 0.5;

    // Enhanced classification with AWS labels
    if (this.containsAny(allLabels, ['plastic', 'bottle', 'container', 'bag', 'wrapper'])) {
      category = 'plastic';
      confidence = 0.85;
    } else if (this.containsAny(allLabels, ['paper', 'cardboard', 'box', 'newspaper', 'magazine'])) {
      category = 'paper';
      confidence = 0.85;
    } else if (this.containsAny(allLabels, ['food', 'fruit', 'vegetable', 'organic', 'banana', 'apple'])) {
      category = 'organic';
      confidence = 0.90;
    } else if (this.containsAny(allLabels, ['glass', 'jar', 'bottle', 'container'])) {
      category = 'glass';
      confidence = 0.80;
    } else if (this.containsAny(allLabels, ['metal', 'can', 'aluminum', 'tin', 'steel'])) {
      category = 'metal';
      confidence = 0.80;
    }

    return {
      category,
      confidence,
      labels: allLabels,
      details: this.getCategoryDetails(category),
      disposalInstructions: this.getDisposalInstructions(category)
    };
  }

  // Custom ML model classification (placeholder for future implementation)
  async classifyWithCustomModel(imageUri) {
    try {
      // In a real implementation, you would:
      // 1. Load a pre-trained model (TensorFlow.js, ONNX, etc.)
      // 2. Preprocess the image
      // 3. Run inference
      // 4. Post-process results
      
      // For now, we'll simulate with enhanced pattern matching
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Simulate model prediction based on image characteristics
      const categories = ['plastic', 'paper', 'organic', 'glass', 'metal', 'garbage'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence

      return {
        category: randomCategory,
        confidence,
        modelType: 'custom',
        details: this.getCategoryDetails(randomCategory),
        disposalInstructions: this.getDisposalInstructions(randomCategory)
      };
    } catch (error) {
      console.error('Custom model classification error:', error);
      throw new Error('Failed to classify image with custom model');
    }
  }

  // Enhanced text classification with AI
  async classifyTextWithAI(inputData) {
    try {
      const { description, productName, material } = inputData;
      const combinedText = `${description} ${productName} ${material}`.toLowerCase();
      
      // Use a more sophisticated text analysis
      const textAnalysis = await this.analyzeTextWithNLP(combinedText);
      
      return {
        category: textAnalysis.category,
        confidence: textAnalysis.confidence,
        analysis: textAnalysis,
        details: this.getCategoryDetails(textAnalysis.category),
        disposalInstructions: this.getDisposalInstructions(textAnalysis.category)
      };
    } catch (error) {
      console.error('AI text classification error:', error);
      // Fallback to pattern matching
      return this.fallbackTextClassification(inputData);
    }
  }

  // Simulate NLP text analysis
  async analyzeTextWithNLP(text) {
    // In a real implementation, you would use:
    // - Google Natural Language API
    // - AWS Comprehend
    // - Azure Text Analytics
    // - Custom NLP model
    
    // For demo, we'll use enhanced pattern matching
    const keywords = {
      plastic: ['plastic', 'bottle', 'bag', 'container', 'wrapper', 'packaging', 'polyethylene', 'pvc'],
      paper: ['paper', 'cardboard', 'box', 'newspaper', 'magazine', 'document', 'tissue', 'napkin'],
      organic: ['food', 'fruit', 'vegetable', 'organic', 'banana', 'apple', 'orange', 'scraps', 'compost'],
      glass: ['glass', 'jar', 'bottle', 'container', 'crystal', 'transparent'],
      metal: ['metal', 'can', 'aluminum', 'tin', 'steel', 'iron', 'copper']
    };

    let bestMatch = { category: 'garbage', confidence: 0.5 };
    
    for (const [category, words] of Object.entries(keywords)) {
      const matches = words.filter(word => text.includes(word)).length;
      const confidence = Math.min(matches / words.length + 0.3, 0.95);
      
      if (confidence > bestMatch.confidence) {
        bestMatch = { category, confidence };
      }
    }

    return bestMatch;
  }

  // Fallback text classification
  fallbackTextClassification(inputData) {
    const { description, productName, material } = inputData;
    const combinedText = `${description} ${productName} ${material}`.toLowerCase();
    
    let category = 'garbage';
    let confidence = 0.5;
    
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

  // Helper methods
  containsKeywords(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }

  containsAny(textArray, keywords) {
    return keywords.some(keyword => 
      textArray.some(text => text.includes(keyword))
    );
  }

  getCategoryDetails(category) {
    const details = {
      plastic: {
        name: 'Plastic',
        icon: '🔄',
        description: 'Recyclable plastic materials',
        color: '#2196F3',
        recyclable: true
      },
      paper: {
        name: 'Paper/Cardboard',
        icon: '📄',
        description: 'Paper and cardboard materials',
        color: '#8BC34A',
        recyclable: true
      },
      organic: {
        name: 'Organic/Wet Waste',
        icon: '🍎',
        description: 'Biodegradable food and organic materials',
        color: '#FF9800',
        recyclable: false,
        compostable: true
      },
      glass: {
        name: 'Glass',
        icon: '🍶',
        description: 'Glass containers and bottles',
        color: '#9C27B0',
        recyclable: true
      },
      metal: {
        name: 'Metal',
        icon: '🥫',
        description: 'Metal cans and containers',
        color: '#607D8B',
        recyclable: true
      },
      garbage: {
        name: 'General Garbage',
        icon: '🗑️',
        description: 'Non-recyclable waste',
        color: '#795548',
        recyclable: false
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
        'Look for recycling symbols (1-7) on the item',
        'Place in recycling bin or take to recycling center'
      ],
      paper: [
        'Remove any plastic or metal components',
        'Keep paper dry and clean',
        'Flatten cardboard boxes to save space',
        'Remove any food contamination',
        'Place in paper recycling bin'
      ],
      organic: [
        'Remove any non-organic materials (plastic, metal)',
        'Compost at home if possible',
        'Use municipal composting service',
        'Avoid putting meat or dairy in home compost',
        'Consider worm composting for food scraps'
      ],
      glass: [
        'Remove caps and lids (recycle separately)',
        'Rinse glass containers',
        'Check for cracks - broken glass may need special handling',
        'Separate by color if required by local program',
        'Place in glass recycling bin'
      ],
      metal: [
        'Rinse metal containers',
        'Remove any plastic or paper labels',
        'Flatten aluminum cans to save space',
        'Separate ferrous and non-ferrous metals if required',
        'Place in metal recycling bin'
      ],
      garbage: [
        'Ensure item is completely non-recyclable',
        'Remove any recyclable components first',
        'Consider if item can be donated or repurposed',
        'Check if item can be taken to special collection',
        'Place in general waste bin'
      ]
    };
    
    return instructions[category] || instructions.garbage;
  }
}

export default new AIService();
