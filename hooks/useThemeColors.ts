import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import Colors from '@/constants/Colors';

export default function useThemeColors() {
  const systemTheme = useColorScheme();
  const { theme, isSystemTheme } = useThemeStore();
  
  // Determine which theme to use
  const activeTheme = isSystemTheme ? systemTheme : theme;
  
  // Return the appropriate color palette
  return Colors[activeTheme === 'dark' ? 'dark' : 'light'];
}