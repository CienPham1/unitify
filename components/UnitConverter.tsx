import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Input from './Input';
import { ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/colors';
import UnitPicker from './UnitPicker';

interface UnitConverterProps {
  units: { label: string; value: string; symbol?: string }[];
  convert: (value: number, fromUnit: string, toUnit: string) => number;
}

export default function UnitConverter({ units, convert }: UnitConverterProps) {
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState(units[0].value);
  const [toUnit, setToUnit] = useState(units[1].value);
  const [result, setResult] = useState('0');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  
  const fromUnitSymbol = units.find(unit => unit.value === fromUnit)?.symbol || '';
  const toUnitSymbol = units.find(unit => unit.value === toUnit)?.symbol || '';

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.converterContainer}>
        <Input
          label="From"
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="decimal-pad"
          rightIcon={<ChevronDown size={20} color={Colors.textSecondary} />}
          onRightIconPress={() => setShowFromPicker(true)}
          inputStyle={styles.input}
          placeholder={`Value in ${getUnitLabel(fromUnit)}`}
        />
        
        <Input
          label="To"
          value={result}
          onChangeText={() => {}}
          editable={false}
          rightIcon={<ChevronDown size={20} color={Colors.textSecondary} />}
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
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    fontSize: 18,
  },
});