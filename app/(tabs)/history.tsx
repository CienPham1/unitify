import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Typography from '@/constants/typography';
import { useUserStore } from '@/store/user-store';
import { Clock } from 'lucide-react-native';
import useThemeColors from '@/hooks/useThemeColors';

export default function HistoryScreen() {
  const router = useRouter();
  const { recentConversions } = useUserStore();
  const colors = useThemeColors();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const navigateToConverter = (category: string) => {
    router.push(`/converter/${category.toLowerCase()}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Conversion History</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your recent unit conversions</Text>
      </View>

      {recentConversions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Clock size={64} color={colors.lightGray} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No conversion history yet</Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Your recent conversions will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={recentConversions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.historyItem, { 
                backgroundColor: colors.card,
                shadowColor: colors.text,
              }]}
              onPress={() => navigateToConverter(item.category)}
            >
              <View style={styles.historyHeader}>
                <Text style={[styles.categoryText, { color: colors.primary }]}>{item.category}</Text>
                <Text style={[styles.dateText, { color: colors.textSecondary }]}>{formatDate(item.timestamp)}</Text>
              </View>
              <View style={styles.conversionDetails}>
                <Text style={[styles.valueText, { color: colors.text }]}>
                  {item.value} {item.fromUnit}
                </Text>
                <Text style={[styles.arrowText, { color: colors.primary }]}>→</Text>
                <Text style={[styles.resultText, { color: colors.text }]}>
                  {item.result.toFixed(2)} {item.toUnit}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    ...Typography.h1,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  historyItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  dateText: {
    ...Typography.caption,
  },
  conversionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    ...Typography.body,
    flex: 1,
  },
  arrowText: {
    ...Typography.body,
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  resultText: {
    ...Typography.body,
    flex: 1,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    ...Typography.h2,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    ...Typography.body,
    textAlign: 'center',
  },
});