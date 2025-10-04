import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import Card from '../components/Card';
import ProductDatabase from '../services/ProductDatabase';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productId) {
      const productData = ProductDatabase.getProductById(productId);
      setProduct(productData);
      
      if (productData) {
        // Get related products from the same category
        const related = ProductDatabase.getProductsByCategory(productData.category)
          .filter(p => p.id !== productId)
          .slice(0, 3);
        setRelatedProducts(related);
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
        <LinearGradient
          colors={['#2E7D32', '#4CAF50', '#66BB6A']}
          style={styles.gradient}
        >
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Product not found</Text>
            <Button
              title="← Go Back"
              onPress={() => navigation.goBack()}
              variant="primary"
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      plastic: '#2196F3',
      paper: '#8BC34A',
      organic: '#FF9800',
      glass: '#9C27B0',
      metal: '#607D8B',
      electronics: '#E91E63',
      textile: '#795548',
    };
    return colors[category] || '#9E9E9E';
  };

  const handleClassifyProduct = () => {
    navigation.navigate('Results', {
      inputData: {
        selectedProduct: product,
        productName: product.name,
        description: product.description,
        material: product.category,
      },
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
          {/* Product Header */}
          <View style={styles.header}>
            <Text style={styles.productIcon}>{product.icon}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productCategory}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Text>
          </View>

          {/* Product Information */}
          <Card variant="elevated" style={styles.infoCard}>
            <Text style={styles.sectionTitle}>📋 Product Information</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Material:</Text>
              <Text style={styles.infoValue}>{product.material}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Description:</Text>
              <Text style={styles.infoValue}>{product.description}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Recyclable:</Text>
              <Text style={[styles.infoValue, { color: product.recyclable ? '#4CAF50' : '#F44336' }]}>
                {product.recyclable ? 'Yes' : 'No'}
              </Text>
            </View>
            {product.compostable && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Compostable:</Text>
                <Text style={[styles.infoValue, { color: '#4CAF50' }]}>Yes</Text>
              </View>
            )}
            {product.specialDisposal && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Special Disposal:</Text>
                <Text style={[styles.infoValue, { color: '#FF9800' }]}>Required</Text>
              </View>
            )}
          </Card>

          {/* Disposal Instructions */}
          <Card variant="elevated" style={styles.instructionsCard}>
            <Text style={styles.sectionTitle}>📋 Disposal Instructions</Text>
            {product.disposalInstructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </Card>

          {/* Keywords */}
          <Card variant="elevated" style={styles.keywordsCard}>
            <Text style={styles.sectionTitle}>🏷️ Keywords</Text>
            <View style={styles.keywordsContainer}>
              {product.keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordTag}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <Card variant="elevated" style={styles.relatedCard}>
              <Text style={styles.sectionTitle}>🔗 Related Products</Text>
              {relatedProducts.map((relatedProduct) => (
                <TouchableOpacity
                  key={relatedProduct.id}
                  style={styles.relatedProductItem}
                  onPress={() => navigation.push('ProductDetails', { productId: relatedProduct.id })}
                >
                  <Text style={styles.relatedProductIcon}>{relatedProduct.icon}</Text>
                  <View style={styles.relatedProductInfo}>
                    <Text style={styles.relatedProductName}>{relatedProduct.name}</Text>
                    <Text style={styles.relatedProductDescription} numberOfLines={2}>
                      {relatedProduct.description}
                    </Text>
                  </View>
                  <Text style={styles.relatedProductArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="🔍 Classify This Product"
              onPress={handleClassifyProduct}
              variant="primary"
              size="large"
              style={styles.actionButton}
            />
            
            <Button
              title="← Go Back"
              onPress={() => navigation.goBack()}
              variant="outline"
              size="large"
              style={styles.actionButton}
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
  productIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  productCategory: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  instructionsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  keywordsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  relatedCard: {
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
  infoItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    lineHeight: 22,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  keywordText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  relatedProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  relatedProductIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  relatedProductInfo: {
    flex: 1,
  },
  relatedProductName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  relatedProductDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  relatedProductArrow: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
});
