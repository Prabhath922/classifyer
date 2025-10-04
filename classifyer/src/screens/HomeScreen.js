import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import Card from '../components/Card';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {

  const features = [
    {
      icon: '📷',
      title: 'Photo Classification',
      description: 'Take a photo and get instant AI-powered waste classification',
    },
    {
      icon: '✏️',
      title: 'Text Description',
      description: 'Describe your item and get smart classification results',
    },
    {
      icon: '🎯',
      title: 'Smart Categories',
      description: 'Classify into Plastic, Paper, Organic, Glass, Metal, or Garbage',
    },
    {
      icon: '📋',
      title: 'Disposal Guide',
      description: 'Get step-by-step instructions for proper waste disposal',
    },
  ];

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
              {/* Header Section */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logo}>♻️</Text>
                </View>
                <Text style={styles.title}>Waste Classifier</Text>
                <Text style={styles.subtitle}>
                  Smart waste classification made simple
                </Text>
              </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <Button
              title="📷 Take Photo"
              onPress={() => navigation.navigate('Camera')}
              variant="primary"
              size="large"
              style={styles.actionButton}
            />
            
            <Button
              title="✏️ Describe Item"
              onPress={() => navigation.navigate('TextInput')}
              variant="outline"
              size="large"
              style={styles.actionButton}
            />
          </View>

              {/* Features Section */}
              <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>How It Works</Text>
                {features.slice(0, 3).map((feature, index) => (
                  <Card key={index} variant="elevated" style={styles.featureCard}>
                    <View style={styles.featureContent}>
                      <Text style={styles.featureIcon}>{feature.icon}</Text>
                      <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <Text style={styles.featureDescription}>{feature.description}</Text>
                      </View>
                    </View>
                  </Card>
                ))}
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
    paddingBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
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
    marginBottom: 20,
  },
  actionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    marginBottom: 16,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureCard: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
