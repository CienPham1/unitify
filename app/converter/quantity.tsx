import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnitConverter from '@/components/UnitConverter';
import { quantityUnits } from '@/constants/units';
import { convertQuantity } from '@/utils/converters';
import { useUserStore } from '@/store/user-store';
import Colors from '@/constants/colors';

export default function QuantityConverterScreen() {
  const addRecentConversion = useUserStore((state) => state.addRecentConversion);

  const handleConversion = (value: number, fromUnit: string, toUnit: string) => {
    const result = convertQuantity(value, fromUnit, toUnit);
    
    // Add to recent conversions
    addRecentConversion({
      category: 'Quantity',
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
          title: 'Quantity Converter',
          headerTintColor: Colors.primary,
        }} 
      />
      <UnitConverter 
        units={quantityUnits} 
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