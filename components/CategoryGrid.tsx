import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Card from './Card';
import { CategoryType } from '@/types/categories';

interface CategoryGridProps {
  categories: CategoryType[];
  onSelectCategory: (category: CategoryType) => void;
}

const { width } = Dimensions.get('window');
const numColumns = width > 500 ? 3 : 2;
const cardWidth = (width - 48) / numColumns;

export default function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <Card
            title={item.title}
            icon={item.icon}
            onPress={() => onSelectCategory(item)}
            style={{ width: cardWidth }}
          />
        </View>
      )}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: 16,
  },
  cardContainer: {
    margin: 8,
  },
});