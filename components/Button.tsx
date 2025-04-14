import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import useThemeColors from '@/hooks/useThemeColors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const colors = useThemeColors();
  
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = { 
          backgroundColor: colors.primary,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        };
        break;
      case 'secondary':
        buttonStyle = { 
          backgroundColor: colors.secondary,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        };
        break;
      case 'outline':
        buttonStyle = { 
          backgroundColor: 'transparent',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        };
        break;
      case 'text':
        buttonStyle = { 
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 8,
        };
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = { ...buttonStyle, paddingVertical: 6, paddingHorizontal: 12 };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, paddingVertical: 10, paddingHorizontal: 16 };
        break;
      case 'large':
        buttonStyle = { ...buttonStyle, paddingVertical: 14, paddingHorizontal: 24 };
        break;
    }
    
    // Full width
    if (fullWidth) {
      buttonStyle = { ...buttonStyle, width: '100%' };
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle = { ...buttonStyle, opacity: 0.6 };
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleVar: TextStyle = {};
    
    switch (variant) {
      case 'primary':
        textStyleVar = { 
          color: colors.background,
          fontWeight: '600',
          textAlign: 'center',
        };
        break;
      case 'secondary':
        textStyleVar = { 
          color: colors.background,
          fontWeight: '600',
          textAlign: 'center',
        };
        break;
      case 'outline':
        textStyleVar = { 
          color: colors.primary,
          fontWeight: '600',
          textAlign: 'center',
        };
        break;
      case 'text':
        textStyleVar = { 
          color: colors.primary,
          fontWeight: '600',
          textAlign: 'center',
        };
        break;
    }
    
    switch (size) {
      case 'small':
        textStyleVar = { ...textStyleVar, fontSize: 14 };
        break;
      case 'medium':
        textStyleVar = { ...textStyleVar, fontSize: 16 };
        break;
      case 'large':
        textStyleVar = { ...textStyleVar, fontSize: 18 };
        break;
    }
    
    if (disabled) {
      textStyleVar = { ...textStyleVar, opacity: 0.8 };
    }
    
    return textStyleVar;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'text' ? colors.primary : colors.background} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}