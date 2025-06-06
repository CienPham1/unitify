import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnitConverter from '@/components/UnitConverter';
import { densityUnits } from '@/constants/units';
import { convertDensity } from '@/utils/converters';
import { useUserStore } from '@/store/user-store';
import Colors from '@/constants/Colors';

export default function DensityConverterScreen() {
  const addRecentConversion = useUserStore((state) => state.addRecentConversion);

  const handleConversion = (value: number, fromUnit: string, toUnit: string) => {
    const result = convertDensity(value, fromUnit, toUnit);
    
    // Add to recent conversions
    addRecentConversion({
      category: 'Density',
      fromUnit,
      toUnit,
      value,
      result,
    });
    
    return result;
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <Stack.Screen 
        options={{ 
          title: 'Density Converter',
          headerTintColor: Colors.primary,
        }} 
      />
      <UnitConverter 
        units={densityUnits} 
        convert={handleConversion}
        category="Density"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});