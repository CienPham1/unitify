import { ColorSchemeName } from 'react-native';

const lightColors = {
  primary: '#4A6FA5', // Soft blue
  secondary: '#F9A26C', // Soft coral
  background: '#FFFFFF',
  card: '#F8F9FA',
  text: '#333333',
  textSecondary: '#6C757D',
  border: '#E9ECEF',
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  lightGray: '#E9ECEF',
  mediumGray: '#CED4DA',
  darkGray: '#6C757D',
};

const darkColors = {
  primary: '#5D8AC3', // Lighter blue for dark mode
  secondary: '#F9A26C', // Same coral
  background: '#121212', // Dark background
  card: '#1E1E1E', // Dark card
  text: '#E0E0E0', // Light text
  textSecondary: '#A0A0A0', // Secondary text
  border: '#2C2C2C', // Dark border
  success: '#2E8B57', // Dark success
  error: '#CF6679', // Dark error
  warning: '#F9A825', // Dark warning
  info: '#0288D1', // Dark info
  lightGray: '#2C2C2C', // Dark light gray
  mediumGray: '#505050', // Dark medium gray
  darkGray: '#909090', // Dark dark gray
};

export const getColors = (theme: ColorSchemeName) => {
  return theme === 'dark' ? darkColors : lightColors;
};

export default {
  light: lightColors,
  dark: darkColors,
};