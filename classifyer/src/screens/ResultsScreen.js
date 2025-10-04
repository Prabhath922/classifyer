import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ClassificationService from '../services/ClassificationService';
import Button from '../components/Button';
import Card from '../components/Card';

const { width } = Dimensions.get('window');

export default function ResultsScreen({ route, navigation }) {
  const { imageUri, inputData, classificationType } = route.params;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    classifyItem();
  }, []);

  const classifyItem = async () => {
    try {
      setLoading(true);
      let classificationResult;
      
      if (classificationType === 'image' && imageUri) {
        classificationResult = await ClassificationService.classifyImage(imageUri);
      } else if (classificationType === 'text' && inputData) {
        classificationResult = await ClassificationService.classifyText(inputData);
      } else {
        throw new Error('Invalid classification data');
      }
      
      setResult(classificationResult);
      
      // Animate results in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (err) {
      setError(err.message);
      Alert.alert('Error', 'Failed to classify item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return '#4CAF50';
    if (confidence >= 0.6) return '#FF9800';
    return '#F44336';
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.gradient}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.loadingText}>Analyzing your item...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.gradient}
        >
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

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
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Image Preview */}
            {imageUri && (
              <Card variant="elevated" style={styles.imageCard}>
                <Image source={{ uri: imageUri }} style={styles.resultImage} />
              </Card>
            )}

            {/* Classification Result */}
            <Card variant="elevated" style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: result.details.color }]}>
                  <Text style={styles.categoryIcon}>{result.details.icon}</Text>
                  <Text style={styles.categoryName}>{result.details.name}</Text>
                </View>
                <Text style={styles.description}>{result.details.description}</Text>
                
                {/* Product Information */}
                {result.productInfo && (
                  <View style={styles.productInfoContainer}>
                    <Text style={styles.productInfoTitle}>📦 Product Details</Text>
                    <View style={styles.productInfoContent}>
                      <Text style={styles.productInfoName}>{result.productInfo.name}</Text>
                      <Text style={styles.productInfoMaterial}>
                        Material: {result.productInfo.material}
                      </Text>
                      <Text style={styles.productInfoDescription}>
                        {result.productInfo.description}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Confidence Meter */}
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Confidence Level</Text>
                <View style={styles.confidenceMeter}>
                  <View style={styles.confidenceBar}>
                    <View 
                      style={[
                        styles.confidenceFill, 
                        { 
                          width: `${result.confidence * 100}%`,
                          backgroundColor: getConfidenceColor(result.confidence)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.confidenceText, { color: getConfidenceColor(result.confidence) }]}>
                    {getConfidenceText(result.confidence)} ({(result.confidence * 100).toFixed(0)}%)
                  </Text>
                </View>
              </View>
            </Card>

            {/* Disposal Instructions */}
            <Card variant="elevated" style={styles.instructionsCard}>
              <Text style={styles.instructionsTitle}>📋 Disposal Instructions</Text>
              {result.disposalInstructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.instructionNumber}>
                    <Text style={styles.instructionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </Card>

            {/* Pro Tips */}
            <Card variant="elevated" style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <Text style={styles.tipIcon}>🧽</Text>
                  <Text style={styles.tipText}>Always clean recyclable items before disposal</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipIcon}>📍</Text>
                  <Text style={styles.tipText}>Check your local recycling guidelines</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipIcon}>♻️</Text>
                  <Text style={styles.tipText}>Consider reducing waste by choosing reusable alternatives</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipIcon}>🌱</Text>
                  <Text style={styles.tipText}>Compost organic waste when possible</Text>
                </View>
              </View>
            </Card>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title="🏠 Home"
                onPress={() => navigation.navigate('Home')}
                variant="primary"
                size="large"
                style={styles.actionButton}
              />
              
              <Button
                title="📷 Classify Another"
                onPress={() => navigation.navigate('Camera')}
                variant="outline"
                size="large"
                style={styles.actionButton}
              />
            </View>
          </Animated.View>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageCard: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  resultImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  resultCard: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  categoryName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  confidenceContainer: {
    width: '100%',
  },
  confidenceLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  confidenceMeter: {
    alignItems: 'center',
  },
  confidenceBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 6,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionsCard: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  instructionsTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
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
  tipsCard: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  tipsTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  tipText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
  productInfoContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  productInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productInfoContent: {
    gap: 4,
  },
  productInfoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productInfoMaterial: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  productInfoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 4,
  },
});
