import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnitConverter from '@/components/UnitConverter';
import { areaUnits } from '@/constants/units';
import { convertArea } from '@/utils/converters';
import { useUserStore } from '@/store/user-store';
import Colors from '@/constants/colors';

export default function AreaConverterScreen() {
  const addRecentConversion = useUserStore((state) => state.addRecentConversion);

  const handleConversion = (value: number, fromUnit: string, toUnit: string) => {
    const result = convertArea(value, fromUnit, toUnit);
    
    // Add to recent conversions
    addRecentConversion({
      category: 'Area',
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
          title: 'Area Converter',
          headerTintColor: Colors.primary,
        }} 
      />
      <UnitConverter 
        units={areaUnits} 
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