import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import ProductDatabase from '../services/ProductDatabase';
import Card from './Card';

const ProductSearch = ({
  onProductSelect,
  placeholder = "Search for a product...",
  style = {},
  navigation = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = ProductDatabase.searchProducts(searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchQuery(product.name);
    setShowResults(false);
    onProductSelect(product);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedProduct(null);
    setSearchResults([]);
    setShowResults(false);
    onProductSelect(null);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductSelect(item)}
    >
      <View style={styles.productContent}>
        <Text style={styles.productIcon}>{item.icon}</Text>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.productMeta}>
            <Text style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
              {item.category}
            </Text>
            <Text style={styles.materialText}>{item.material}</Text>
            {navigation && (
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9E9E9E"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {selectedProduct && (
        <Card variant="elevated" style={styles.selectedProductCard}>
          <View style={styles.selectedProductContent}>
            <Text style={styles.selectedProductIcon}>{selectedProduct.icon}</Text>
            <View style={styles.selectedProductInfo}>
              <Text style={styles.selectedProductName}>{selectedProduct.name}</Text>
              <Text style={styles.selectedProductDescription}>
                {selectedProduct.description}
              </Text>
              <View style={styles.selectedProductMeta}>
                <Text style={[styles.selectedCategoryBadge, { backgroundColor: getCategoryColor(selectedProduct.category) }]}>
                  {selectedProduct.category}
                </Text>
                <Text style={styles.selectedMaterialText}>{selectedProduct.material}</Text>
              </View>
            </View>
          </View>
        </Card>
      )}

      {showResults && searchResults.length > 0 && (
        <Card variant="elevated" style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>
            Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
          </Text>
          <FlatList
            data={searchResults.slice(0, 5)} // Limit to 5 results
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            style={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        </Card>
      )}

      {showResults && searchResults.length === 0 && searchQuery.length >= 2 && (
        <Card variant="elevated" style={styles.noResultsCard}>
          <Text style={styles.noResultsText}>
            No products found for "{searchQuery}"
          </Text>
          <Text style={styles.noResultsSubtext}>
            Try searching with different keywords or describe the item manually
          </Text>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: 'transparent',
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
  selectedProductCard: {
    marginTop: 12,
    backgroundColor: 'white',
  },
  selectedProductContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedProductIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  selectedProductInfo: {
    flex: 1,
  },
  selectedProductName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  selectedProductDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  selectedProductMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCategoryBadge: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  selectedMaterialText: {
    fontSize: 12,
    color: '#999',
  },
  resultsCard: {
    marginTop: 12,
    backgroundColor: 'white',
    maxHeight: 300,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  resultsList: {
    maxHeight: 200,
  },
  productItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 6,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },
  materialText: {
    fontSize: 12,
    color: '#999',
  },
  detailsButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  noResultsCard: {
    marginTop: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProductSearch;
