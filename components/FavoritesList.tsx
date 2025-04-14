import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/user-store';
import { Star, X } from 'lucide-react-native';
import useThemeColors from '@/hooks/useThemeColors';
import Typography from '@/constants/typography';

export default function FavoritesList() {
  const router = useRouter();
  const { favoriteConversions, removeFavoriteConversion } = useUserStore();
  const colors = useThemeColors();

  if (favoriteConversions.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.card }]}>
        <Star size={32} color={colors.lightGray} />
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No favorite conversions yet
        </Text>
        <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
          Add favorites by tapping the star icon in any converter
        </Text>
      </View>
    );
  }

  const handleFavoritePress = (favorite: any) => {
    // Navigate to the appropriate converter screen
    router.push(`/converter/${favorite.category.toLowerCase()}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteConversions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.favoriteItem, { 
              backgroundColor: colors.card,
              shadowColor: colors.text,
            }]}
            onPress={() => handleFavoritePress(item)}
          >
            <View style={styles.favoriteContent}>
              <Text style={[styles.categoryText, { color: colors.primary }]}>
                {item.category}
              </Text>
              <Text style={[styles.conversionText, { color: colors.text }]}>
                {item.label}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFavoriteConversion(item.id)}
            >
              <X size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteContent: {
    flex: 1,
  },
  categoryText: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginBottom: 4,
  },
  conversionText: {
    ...Typography.body,
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...Typography.h3,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    ...Typography.bodySmall,
    textAlign: 'center',
  },
});