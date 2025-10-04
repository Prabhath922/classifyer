import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import ProductDatabase from '../services/ProductDatabase';

const { width } = Dimensions.get('window');

export default function TextInputScreen({ navigation }) {
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [material, setMaterial] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const quickOptions = [
    { label: 'Plastic Bottle', value: 'plastic bottle', icon: '🥤' },
    { label: 'Cardboard Box', value: 'cardboard box', icon: '📦' },
    { label: 'Food Scraps', value: 'food scraps', icon: '🍎' },
    { label: 'Glass Jar', value: 'glass jar', icon: '🍶' },
    { label: 'Aluminum Can', value: 'aluminum can', icon: '🥫' },
    { label: 'Paper', value: 'paper', icon: '📄' },
    { label: 'Plastic Bag', value: 'plastic bag', icon: '🛍️' },
    { label: 'Banana Peel', value: 'banana peel', icon: '🍌' },
    { label: 'Coffee Cup', value: 'coffee cup', icon: '☕' },
    { label: 'Pizza Box', value: 'pizza box', icon: '🍕' },
  ];

  const materialOptions = [
    { label: 'Plastic', value: 'plastic', icon: '🔄', color: '#2196F3' },
    { label: 'Paper/Cardboard', value: 'paper', icon: '📄', color: '#8BC34A' },
    { label: 'Metal', value: 'metal', icon: '🥫', color: '#607D8B' },
    { label: 'Glass', value: 'glass', icon: '🍶', color: '#9C27B0' },
    { label: 'Organic/Food', value: 'organic', icon: '🍎', color: '#FF9800' },
    { label: 'Textile', value: 'textile', icon: '👕', color: '#E91E63' },
    { label: 'Unknown', value: 'unknown', icon: '❓', color: '#9E9E9E' },
  ];

  const handleQuickSelect = (value) => {
    setDescription(value);
    setProductName(value);
    setSelectedProduct(null); // Clear selected product when using quick select
  };

  const handleMaterialSelect = (value) => {
    setMaterial(value);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    if (product) {
      setProductName(product.name);
      setDescription(product.description);
      setMaterial(product.category);
    }
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = ProductDatabase.searchProducts(query);
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    setSelectedProduct(null);
  };

  const classifyText = () => {
    if (!description.trim() && !productName.trim() && !material.trim() && !selectedProduct) {
      Alert.alert('Error', 'Please provide at least one piece of information about the item');
      return;
    }

    const inputData = {
      description: description.trim(),
      productName: productName.trim(),
      material: material.trim(),
      selectedProduct: selectedProduct, // Include selected product data
    };

    navigation.navigate('Results', {
      inputData,
      classificationType: 'text'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Describe Your Item</Text>
            <Text style={styles.subtitle}>
              Provide details about the waste item for AI classification
            </Text>
          </View>

          {/* Product Search Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>🔍 Search Products</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a product (e.g., water bottle, pizza box, banana peel)"
                placeholderTextColor="#9E9E9E"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                  <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {/* Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <View style={styles.searchResultsContainer}>
                <Text style={styles.searchResultsTitle}>
                  Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                </Text>
                {searchResults.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.searchResultItem}
                    onPress={() => handleProductSelect(product)}
                  >
                    <Text style={styles.searchResultIcon}>{product.icon}</Text>
                    <View style={styles.searchResultInfo}>
                      <Text style={styles.searchResultName}>{product.name}</Text>
                      <Text style={styles.searchResultDescription} numberOfLines={2}>
                        {product.description}
                      </Text>
                      <Text style={styles.searchResultCategory}>
                        {product.category} • {product.material}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Selected Product Display */}
            {selectedProduct && (
              <View style={styles.selectedProductContainer}>
                <Text style={styles.selectedProductTitle}>✅ Selected Product</Text>
                <View style={styles.selectedProductItem}>
                  <Text style={styles.selectedProductIcon}>{selectedProduct.icon}</Text>
                  <View style={styles.selectedProductInfo}>
                    <Text style={styles.selectedProductName}>{selectedProduct.name}</Text>
                    <Text style={styles.selectedProductDescription}>
                      {selectedProduct.description}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Card>

          {/* Quick Select Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>⚡ Quick Select</Text>
            <View style={styles.quickOptionsContainer}>
              {quickOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickOption}
                  onPress={() => handleQuickSelect(option.value)}
                >
                  <Text style={styles.quickOptionIcon}>{option.icon}</Text>
                  <Text style={styles.quickOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Product Name Input */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Input
              label="Product Name"
              placeholder="e.g., Coca Cola bottle, iPhone box"
              value={productName}
              onChangeText={setProductName}
            />
          </Card>

          {/* Material Type Selection */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>🏷️ Material Type</Text>
            <View style={styles.materialOptionsContainer}>
              {materialOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.materialOption,
                    material === option.value && styles.materialOptionSelected,
                    { borderColor: option.color }
                  ]}
                  onPress={() => handleMaterialSelect(option.value)}
                >
                  <Text style={styles.materialOptionIcon}>{option.icon}</Text>
                  <Text style={[
                    styles.materialOptionText,
                    material === option.value && styles.materialOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Description Input */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Input
              label="Description"
              placeholder="Describe the item in detail (color, size, condition, etc.)"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </Card>

          {/* Classify Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="🔍 Classify Item"
              onPress={classifyText}
              variant="primary"
              size="large"
              style={styles.classifyButton}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickOption: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickOptionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  quickOptionText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  materialOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  materialOption: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  materialOptionSelected: {
    backgroundColor: 'white',
    borderColor: '#4CAF50',
  },
  materialOptionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  materialOptionText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  materialOptionTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  classifyButton: {
    marginBottom: 20,
  },
  // Search styles
  searchContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchResultsContainer: {
    marginTop: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  searchResultsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchResultIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  searchResultDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  searchResultCategory: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  selectedProductContainer: {
    marginTop: 12,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  selectedProductTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  selectedProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedProductIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  selectedProductInfo: {
    flex: 1,
  },
  selectedProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  selectedProductDescription: {
    fontSize: 14,
    color: '#4CAF50',
    lineHeight: 18,
  },
});
