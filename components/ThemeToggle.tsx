import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import useThemeColors from '@/hooks/useThemeColors';
import { Moon, Sun, Smartphone } from 'lucide-react-native';
import Typography from '@/constants/typography';

export default function ThemeToggle() {
  const systemTheme = useColorScheme();
  const { theme, isSystemTheme, setTheme, setIsSystemTheme } = useThemeStore();
  const colors = useThemeColors();
  
  const isDarkMode = isSystemTheme 
    ? systemTheme === 'dark' 
    : theme === 'dark';

  const toggleTheme = () => {
    if (isSystemTheme) {
      // If currently using system theme, switch to manual and set opposite of system
      setIsSystemTheme(false);
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      // If manually set, just toggle between light and dark
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const toggleSystemTheme = () => {
    setIsSystemTheme(!isSystemTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.themeRow}>
        <View style={styles.themeOption}>
          <Sun size={24} color={isDarkMode ? colors.textSecondary : colors.primary} />
          <Text style={[
            styles.themeText, 
            { color: isDarkMode ? colors.textSecondary : colors.primary }
          ]}>
            Light
          </Text>
        </View>
        
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.lightGray, true: colors.primary }}
          thumbColor={colors.background}
        />
        
        <View style={styles.themeOption}>
          <Moon size={24} color={isDarkMode ? colors.primary : colors.textSecondary} />
          <Text style={[
            styles.themeText, 
            { color: isDarkMode ? colors.primary : colors.textSecondary }
          ]}>
            Dark
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.systemRow, 
          { 
            backgroundColor: isSystemTheme ? colors.primary : colors.lightGray,
            borderColor: colors.border
          }
        ]}
        onPress={toggleSystemTheme}
        activeOpacity={0.7}
      >
        <Smartphone size={20} color={isSystemTheme ? colors.background : colors.textSecondary} />
        <Text style={[
          styles.systemText,
          { color: isSystemTheme ? colors.background : colors.text }
        ]}>
          Use system settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  themeOption: {
    alignItems: 'center',
  },
  themeText: {
    marginTop: 4,
    fontWeight: '500',
  },
  systemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  systemText: {
    marginLeft: 8,
    fontWeight: '500',
  },
});