import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  SafeAreaView
} from 'react-native';
import { Check, X } from 'lucide-react-native';
import useThemeColors from '@/hooks/useThemeColors';

interface UnitPickerProps {
  units: { label: string; value: string; symbol?: string }[];
  selectedUnit: string;
  onSelect: (unit: string) => void;
  onClose: () => void;
}

export default function UnitPicker({ 
  units, 
  selectedUnit, 
  onSelect, 
  onClose 
}: UnitPickerProps) {
  const colors = useThemeColors();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Select Unit</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={units}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.unitItem,
                  { borderBottomColor: colors.border },
                  selectedUnit === item.value && { backgroundColor: colors.lightGray }
                ]}
                onPress={() => onSelect(item.value)}
              >
                <Text style={[styles.unitLabel, { color: colors.text }]}>
                  {item.label} {item.symbol ? `(${item.symbol})` : ''}
                </Text>
                {selectedUnit === item.value && (
                  <Check size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  unitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  unitLabel: {
    fontSize: 16,
  },
});