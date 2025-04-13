import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnitConverter from '@/components/UnitConverter';
import { energyUnits } from '@/constants/units';
import { convertEnergy } from '@/utils/converters';
import { useUserStore } from '@/store/user-store';
import Colors from '@/constants/Colors';

export default function EnergyConverterScreen() {
  const addRecentConversion = useUserStore((state) => state.addRecentConversion);

  const handleConversion = (value: number, fromUnit: string, toUnit: string) => {
    const result = convertEnergy(value, fromUnit, toUnit);
    
    // Add to recent conversions
    addRecentConversion({
      category: 'Energy',
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
          title: 'Energy Converter',
          headerTintColor: Colors.primary,
        }} 
      />
      <UnitConverter 
        units={energyUnits} 
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