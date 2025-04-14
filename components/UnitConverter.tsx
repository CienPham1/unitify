import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Input from './Input';
import { ChevronDown, ArrowLeftRight, Star } from 'lucide-react-native';
import UnitPicker from './UnitPicker';
import useThemeColors from '@/hooks/useThemeColors';
import { useUserStore } from '@/store/user-store';

interface UnitConverterProps {
  units: { label: string; value: string; symbol?: string }[];
  convert: (value: number, fromUnit: string, toUnit: string) => number;
  category: string;
}

export default function UnitConverter({ units, convert, category }: UnitConverterProps) {
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState(units[0].value);
  const [toUnit, setToUnit] = useState(units[1].value);
  const [result, setResult] = useState('0');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const colors = useThemeColors();
  
  const { 
    addFavoriteConversion, 
    removeFavoriteConversion, 
    isFavoriteConversion 
  } = useUserStore();
  
  const isFavorite = isFavoriteConversion(category, fromUnit, toUnit);

  const fromUnitSymbol = units.find(unit => unit.value === fromUnit)?.symbol || '';
  const toUnitSymbol = units.find(unit => unit.value === toUnit)?.symbol || '';
  const fromUnitLabel = units.find(unit => unit.value === fromUnit)?.label || '';
  const toUnitLabel = units.find(unit => unit.value === toUnit)?.label || '';

  useEffect(() => {
    handleConversion();
  }, [inputValue, fromUnit, toUnit]);

  const handleConversion = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const convertedValue = convert(numValue, fromUnit, toUnit);
      setResult(convertedValue.toString());
    } else {
      setResult('0');
    }
  };

  const getUnitLabel = (unitValue: string) => {
    const unit = units.find(u => u.value === unitValue);
    return unit ? unit.label : '';
  };
  
  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    // Also swap the values
    setInputValue(result);
    // The result will be updated automatically by the useEffect
  };
  
  const toggleFavorite = () => {
    if (isFavorite) {
      // Find the favorite to remove
      const favoriteId = `${category}-${fromUnit}-${toUnit}`;
      removeFavoriteConversion(favoriteId);
    } else {
      // Add as a favorite
      addFavoriteConversion({
        id: `${category}-${fromUnit}-${toUnit}`,
        category,
        fromUnit,
        toUnit,
        label: `${fromUnitLabel} → ${toUnitLabel}`
      });
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.converterContainer, { 
        backgroundColor: colors.card,
        shadowColor: colors.text,
      }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={[styles.favoriteButton, isFavorite ? { backgroundColor: colors.primary + '20' } : null]} 
            onPress={toggleFavorite}
          >
            <Star 
              size={20} 
              color={isFavorite ? colors.primary : colors.textSecondary} 
              fill={isFavorite ? colors.primary : 'none'} 
            />
          </TouchableOpacity>
        </View>
        
        <Input
          label="From"
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="decimal-pad"
          rightIcon={<ChevronDown size={20} color={colors.textSecondary} />}
          onRightIconPress={() => setShowFromPicker(true)}
          inputStyle={styles.input}
          placeholder={`Value in ${getUnitLabel(fromUnit)}`}
        />
        
        <View style={styles.swapButtonContainer}>
          <TouchableOpacity 
            style={[styles.swapButton, { backgroundColor: colors.primary }]} 
            onPress={handleSwapUnits}
          >
            <ArrowLeftRight size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
        
        <Input
          label="To"
          value={result}
          onChangeText={() => {}}
          editable={false}
          rightIcon={<ChevronDown size={20} color={colors.textSecondary} />}
          onRightIconPress={() => setShowToPicker(true)}
          inputStyle={styles.input}
          placeholder={`Value in ${getUnitLabel(toUnit)}`}
        />
      </View>

      {showFromPicker && (
        <UnitPicker
          units={units}
          selectedUnit={fromUnit}
          onSelect={(unit) => {
            setFromUnit(unit);
            setShowFromPicker(false);
          }}
          onClose={() => setShowFromPicker(false)}
        />
      )}

      {showToPicker && (
        <UnitPicker
          units={units}
          selectedUnit={toUnit}
          onSelect={(unit) => {
            setToUnit(unit);
            setShowToPicker(false);
          }}
          onClose={() => setShowToPicker(false)}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  converterContainer: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
  },
  input: {
    fontSize: 18,
  },
  swapButtonContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});