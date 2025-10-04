class ProductDatabase {
  constructor() {
    this.products = [
      // Plastic Products
      {
        id: 'plastic-bottle-water',
        name: 'Water Bottle',
        category: 'plastic',
        material: 'PET (Polyethylene Terephthalate)',
        description: 'Clear plastic water bottle, typically made from PET plastic. Usually recyclable.',
        keywords: ['water', 'bottle', 'plastic', 'drink', 'pet', 'clear'],
        recyclable: true,
        disposalInstructions: [
          'Remove cap and label if possible',
          'Rinse thoroughly',
          'Check for recycling symbol #1',
          'Place in plastic recycling bin'
        ],
        icon: '🥤'
      },
      {
        id: 'plastic-bottle-soda',
        name: 'Soda Bottle',
        category: 'plastic',
        material: 'PET (Polyethylene Terephthalate)',
        description: 'Colored plastic soda bottle, typically made from PET plastic. Usually recyclable.',
        keywords: ['soda', 'bottle', 'plastic', 'drink', 'pet', 'colored'],
        recyclable: true,
        disposalInstructions: [
          'Remove cap and label',
          'Rinse thoroughly to remove sticky residue',
          'Check for recycling symbol #1',
          'Place in plastic recycling bin'
        ],
        icon: '🥤'
      },
      {
        id: 'plastic-bag',
        name: 'Plastic Bag',
        category: 'plastic',
        material: 'HDPE (High-Density Polyethylene)',
        description: 'Thin plastic shopping bag, typically made from HDPE. Check local recycling programs.',
        keywords: ['bag', 'plastic', 'shopping', 'grocery', 'hdpe'],
        recyclable: true,
        disposalInstructions: [
          'Check if your local store accepts plastic bag recycling',
          'Remove any receipts or stickers',
          'Take to designated plastic bag collection point',
          'Do not put in regular recycling bin'
        ],
        icon: '🛍️'
      },
      {
        id: 'plastic-container',
        name: 'Food Container',
        category: 'plastic',
        material: 'Various plastics (PP, PS, etc.)',
        description: 'Plastic food storage container, check recycling number on bottom.',
        keywords: ['container', 'food', 'storage', 'plastic', 'tupperware'],
        recyclable: true,
        disposalInstructions: [
          'Clean thoroughly',
          'Check recycling number on bottom',
          'Remove any non-plastic components',
          'Place in appropriate recycling bin'
        ],
        icon: '🥡'
      },

      // Paper Products
      {
        id: 'cardboard-box',
        name: 'Cardboard Box',
        category: 'paper',
        material: 'Corrugated cardboard',
        description: 'Brown corrugated cardboard box, highly recyclable.',
        keywords: ['box', 'cardboard', 'shipping', 'brown', 'corrugated'],
        recyclable: true,
        disposalInstructions: [
          'Remove any tape or labels',
          'Flatten to save space',
          'Keep dry',
          'Place in paper recycling bin'
        ],
        icon: '📦'
      },
      {
        id: 'newspaper',
        name: 'Newspaper',
        category: 'paper',
        material: 'Newsprint paper',
        description: 'Daily newspaper, made from newsprint paper. Highly recyclable.',
        keywords: ['newspaper', 'news', 'paper', 'print', 'daily'],
        recyclable: true,
        disposalInstructions: [
          'Keep dry and clean',
          'Remove any plastic wrapping',
          'Bundle or place in paper recycling bin',
          'Can also be used for composting'
        ],
        icon: '📰'
      },
      {
        id: 'pizza-box',
        name: 'Pizza Box',
        category: 'paper',
        material: 'Corrugated cardboard',
        description: 'Cardboard pizza box, may have grease stains. Check local guidelines.',
        keywords: ['pizza', 'box', 'cardboard', 'food', 'grease'],
        recyclable: false,
        disposalInstructions: [
          'Remove any leftover food',
          'Check if your local program accepts greasy cardboard',
          'If not accepted, place in general waste',
          'Consider composting if clean'
        ],
        icon: '🍕'
      },
      {
        id: 'magazine',
        name: 'Magazine',
        category: 'paper',
        material: 'Glossy paper',
        description: 'Glossy magazine, made from coated paper. Usually recyclable.',
        keywords: ['magazine', 'glossy', 'paper', 'reading', 'coated'],
        recyclable: true,
        disposalInstructions: [
          'Remove any plastic wrapping',
          'Keep dry',
          'Place in paper recycling bin',
          'Glossy coating is usually acceptable'
        ],
        icon: '📖'
      },

      // Organic/Food Products
      {
        id: 'banana-peel',
        name: 'Banana Peel',
        category: 'organic',
        material: 'Organic matter',
        description: 'Banana peel, completely biodegradable and compostable.',
        keywords: ['banana', 'peel', 'fruit', 'organic', 'compost'],
        recyclable: false,
        compostable: true,
        disposalInstructions: [
          'Perfect for home composting',
          'Add to compost bin or pile',
          'Will break down naturally',
          'Can also be used as fertilizer'
        ],
        icon: '🍌'
      },
      {
        id: 'apple-core',
        name: 'Apple Core',
        category: 'organic',
        material: 'Organic matter',
        description: 'Apple core with seeds, completely biodegradable.',
        keywords: ['apple', 'core', 'fruit', 'organic', 'compost'],
        recyclable: false,
        compostable: true,
        disposalInstructions: [
          'Remove any stickers',
          'Add to compost bin',
          'Seeds may sprout in compost',
          'Will decompose naturally'
        ],
        icon: '🍎'
      },
      {
        id: 'food-scraps',
        name: 'Food Scraps',
        category: 'organic',
        material: 'Organic matter',
        description: 'General food scraps and leftovers, perfect for composting.',
        keywords: ['food', 'scraps', 'leftovers', 'organic', 'compost'],
        recyclable: false,
        compostable: true,
        disposalInstructions: [
          'Remove any non-organic materials',
          'Add to compost bin',
          'Avoid meat and dairy in home compost',
          'Mix with brown materials for best results'
        ],
        icon: '🍽️'
      },

      // Glass Products
      {
        id: 'glass-jar',
        name: 'Glass Jar',
        category: 'glass',
        material: 'Glass',
        description: 'Glass jar, typically from food products. Highly recyclable.',
        keywords: ['jar', 'glass', 'food', 'container', 'recyclable'],
        recyclable: true,
        disposalInstructions: [
          'Remove lid and label',
          'Rinse thoroughly',
          'Check for cracks',
          'Place in glass recycling bin'
        ],
        icon: '🍶'
      },
      {
        id: 'wine-bottle',
        name: 'Wine Bottle',
        category: 'glass',
        material: 'Glass',
        description: 'Glass wine bottle, highly recyclable.',
        keywords: ['wine', 'bottle', 'glass', 'alcohol', 'recyclable'],
        recyclable: true,
        disposalInstructions: [
          'Remove cork and label',
          'Rinse thoroughly',
          'Place in glass recycling bin',
          'Can also be reused for crafts'
        ],
        icon: '🍷'
      },

      // Metal Products
      {
        id: 'aluminum-can',
        name: 'Aluminum Can',
        category: 'metal',
        material: 'Aluminum',
        description: 'Aluminum beverage can, highly recyclable and valuable.',
        keywords: ['can', 'aluminum', 'beverage', 'drink', 'metal'],
        recyclable: true,
        disposalInstructions: [
          'Rinse thoroughly',
          'Remove any plastic labels',
          'Flatten to save space',
          'Place in metal recycling bin'
        ],
        icon: '🥫'
      },
      {
        id: 'tin-can',
        name: 'Tin Can',
        category: 'metal',
        material: 'Steel with tin coating',
        description: 'Tin-plated steel can, typically from food products.',
        keywords: ['can', 'tin', 'steel', 'food', 'metal'],
        recyclable: true,
        disposalInstructions: [
          'Remove label and lid',
          'Rinse thoroughly',
          'Place in metal recycling bin',
          'Check for any plastic components'
        ],
        icon: '🥫'
      },

      // Electronics
      {
        id: 'smartphone',
        name: 'Smartphone',
        category: 'electronics',
        material: 'Mixed materials (plastic, metal, glass)',
        description: 'Electronic device containing valuable materials and hazardous components.',
        keywords: ['phone', 'smartphone', 'electronic', 'device', 'battery'],
        recyclable: true,
        specialDisposal: true,
        disposalInstructions: [
          'Remove personal data first',
          'Take to electronic waste collection point',
          'Do not put in regular recycling',
          'Battery must be handled separately'
        ],
        icon: '📱'
      },
      {
        id: 'laptop',
        name: 'Laptop',
        category: 'electronics',
        material: 'Mixed materials (plastic, metal, glass)',
        description: 'Electronic device with valuable materials and hazardous components.',
        keywords: ['laptop', 'computer', 'electronic', 'device', 'battery'],
        recyclable: true,
        specialDisposal: true,
        disposalInstructions: [
          'Remove personal data first',
          'Take to electronic waste collection point',
          'Battery must be handled separately',
          'Consider donating if still functional'
        ],
        icon: '💻'
      },

      // Textiles
      {
        id: 'cotton-shirt',
        name: 'Cotton Shirt',
        category: 'textile',
        material: 'Cotton fabric',
        description: 'Cotton clothing item, can be recycled or donated.',
        keywords: ['shirt', 'cotton', 'clothing', 'fabric', 'textile'],
        recyclable: true,
        disposalInstructions: [
          'Consider donating if in good condition',
          'Take to textile recycling collection point',
          'Remove any non-fabric components',
          'Clean before recycling'
        ],
        icon: '👕'
      },
      {
        id: 'denim-jeans',
        name: 'Denim Jeans',
        category: 'textile',
        material: 'Denim fabric',
        description: 'Denim jeans, can be recycled or donated.',
        keywords: ['jeans', 'denim', 'pants', 'clothing', 'textile'],
        recyclable: true,
        disposalInstructions: [
          'Consider donating if in good condition',
          'Take to textile recycling collection point',
          'Remove any metal components (buttons, zippers)',
          'Clean before recycling'
        ],
        icon: '👖'
      }
    ];
  }

  // Search products by name, description, or keywords
  searchProducts(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return this.products.filter(product => {
      // Search in name
      if (product.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Search in description
      if (product.description.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Search in keywords
      if (product.keywords.some(keyword => keyword.includes(searchTerm))) {
        return true;
      }
      
      // Search in material
      if (product.material.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      return false;
    }).sort((a, b) => {
      // Prioritize exact name matches
      const aNameMatch = a.name.toLowerCase().includes(searchTerm);
      const bNameMatch = b.name.toLowerCase().includes(searchTerm);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // Then prioritize keyword matches
      const aKeywordMatch = a.keywords.some(keyword => keyword.includes(searchTerm));
      const bKeywordMatch = b.keywords.some(keyword => keyword.includes(searchTerm));
      
      if (aKeywordMatch && !bKeywordMatch) return -1;
      if (!aKeywordMatch && bKeywordMatch) return 1;
      
      return 0;
    });
  }

  // Get product by ID
  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  // Get products by category
  getProductsByCategory(category) {
    return this.products.filter(product => product.category === category);
  }

  // Get all categories
  getCategories() {
    const categories = [...new Set(this.products.map(product => product.category))];
    return categories.sort();
  }

  // Get popular products (most common items)
  getPopularProducts() {
    return this.products.slice(0, 10); // Return first 10 as popular
  }

  // Get recycling statistics
  getRecyclingStats() {
    const total = this.products.length;
    const recyclable = this.products.filter(p => p.recyclable).length;
    const compostable = this.products.filter(p => p.compostable).length;
    const specialDisposal = this.products.filter(p => p.specialDisposal).length;
    
    return {
      total,
      recyclable,
      compostable,
      specialDisposal,
      recyclablePercentage: Math.round((recyclable / total) * 100),
      compostablePercentage: Math.round((compostable / total) * 100)
    };
  }

  // Add new product (for future expansion)
  addProduct(product) {
    const newProduct = {
      id: product.id || `product-${Date.now()}`,
      ...product
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Update product
  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return null;
  }

  // Delete product
  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      return this.products.splice(index, 1)[0];
    }
    return null;
  }
}

export default new ProductDatabase();
