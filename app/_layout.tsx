import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './error-boundary';
import { useThemeStore } from '@/store/theme-store';
import { useColorScheme } from 'react-native';
import useThemeColors from '@/hooks/useThemeColors';

export default function RootLayout() {
  const systemTheme = useColorScheme();
  const { theme, isSystemTheme } = useThemeStore();
  const activeTheme = isSystemTheme ? systemTheme : theme;
  const colors = useThemeColors();

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: '600',
            color: colors.text,
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen 
            name="onboarding/welcome" 
            options={{ 
              headerShown: false,
              animation: 'fade',
            }} 
          />
          <Stack.Screen 
            name="onboarding/features" 
            options={{ 
              headerShown: false,
              animation: 'fade',
            }} 
          />
          <Stack.Screen 
            name="auth/login" 
            options={{ 
              title: 'Login',
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              animation: 'fade',
            }} 
          />
        </Stack>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}