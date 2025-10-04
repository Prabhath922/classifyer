import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  icon = null,
  style = {},
  textStyle = {},
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (variant === 'primary') {
      return [...baseStyle, styles.primary];
    } else if (variant === 'secondary') {
      return [...baseStyle, styles.secondary];
    } else if (variant === 'outline') {
      return [...baseStyle, styles.outline];
    } else if (variant === 'ghost') {
      return [...baseStyle, styles.ghost];
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'primary') {
      return [...baseTextStyle, styles.primaryText];
    } else if (variant === 'secondary') {
      return [...baseTextStyle, styles.secondaryText];
    } else if (variant === 'outline') {
      return [...baseTextStyle, styles.outlineText];
    } else if (variant === 'ghost') {
      return [...baseTextStyle, styles.ghostText];
    }
    
    return baseTextStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? 'white' : '#4CAF50'} 
          />
          <Text style={[getTextStyle(), { marginLeft: 8 }]}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {icon && <Text style={[getTextStyle(), { marginRight: 8 }]}>{icon}</Text>}
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      </View>
    );
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyle(), disabled && styles.disabled, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={disabled ? ['#BDBDBD', '#9E9E9E'] : ['#4CAF50', '#45a049']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), disabled && styles.disabled, style]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sizes
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 48,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  // Variants
  primary: {
    backgroundColor: '#4CAF50',
  },
  secondary: {
    backgroundColor: '#2196F3',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  largeText: {
    fontSize: 18,
  },
  mediumText: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: '#4CAF50',
  },
  ghostText: {
    color: '#4CAF50',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
