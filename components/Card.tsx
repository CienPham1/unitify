import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export default function Card({ title, icon, onPress, style }: CardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 120,
    minWidth: 120,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    ...Typography.bodySmall,
    fontWeight: '600',
    textAlign: 'center',
  },
});