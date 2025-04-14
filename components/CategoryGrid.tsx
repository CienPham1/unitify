import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Card from './Card';
import { CategoryType } from '@/types/categories';
import useThemeColors from '@/hooks/useThemeColors';

interface CategoryGridProps {
  categories: CategoryType[];
  onSelectCategory: (category: CategoryType) => void;
}

const { width } = Dimensions.get('window');
const numColumns = width > 500 ? 3 : 2;
const cardWidth = (width - 48) / numColumns;

export default function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
  const colors = useThemeColors();
  
  // Update icon colors based on theme
  const categoriesWithThemedIcons = categories.map(category => {
    // Clone the icon element with the primary color from the current theme
    const themedIcon = React.cloneElement(category.icon as React.ReactElement, {
      color: colors.primary
    });
    
    return {
      ...category,
      icon: themedIcon
    };
  });

  return (
    <FlatList
      data={categoriesWithThemedIcons}
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