import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({
  children,
  variant = 'default',
  style = {},
  gradient = false,
  gradientColors = ['#ffffff', '#f8f9fa'],
}) => {
  const getCardStyle = () => {
    const baseStyle = [styles.card];
    
    if (variant === 'elevated') {
      return [...baseStyle, styles.elevated];
    } else if (variant === 'outlined') {
      return [...baseStyle, styles.outlined];
    } else if (variant === 'glass') {
      return [...baseStyle, styles.glass];
    }
    
    return baseStyle;
  };

  if (gradient) {
    return (
      <LinearGradient
        colors={gradientColors}
        style={[getCardStyle(), style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
  },
  elevated: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  outlined: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
});

export default Card;
