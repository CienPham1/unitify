import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnitConverter from '@/components/UnitConverter';
import { angleUnits } from '@/constants/units';
import { convertAngle } from '@/utils/converters';
import { useUserStore } from '@/store/user-store';
import Colors from '@/constants/colors';

export default function AngleConverterScreen() {
  const addRecentConversion = useUserStore((state) => state.addRecentConversion);

  const handleConversion = (value: number, fromUnit: string, toUnit: string) => {
    const result = convertAngle(value, fromUnit, toUnit);
    
    // Add to recent conversions
    addRecentConversion({
      category: 'Angle',
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
          title: 'Angle Converter',
          headerTintColor: Colors.primary,
        }} 
      />
      <UnitConverter 
        units={angleUnits} 
        convert={handleConversion} 
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