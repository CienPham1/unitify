import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useUserStore } from '@/store/user-store';
import { Clock } from 'lucide-react-native';

export default function HistoryScreen() {
  const router = useRouter();
  const { recentConversions } = useUserStore();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const navigateToConverter = (category: string) => {
    router.push(`/converter/${category.toLowerCase()}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversion History</Text>
        <Text style={styles.subtitle}>Your recent unit conversions</Text>
      </View>

      {recentConversions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Clock size={64} color={Colors.lightGray} />
          <Text style={styles.emptyText}>No conversion history yet</Text>
          <Text style={styles.emptySubtext}>
            Your recent conversions will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={recentConversions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.historyItem}
              onPress={() => navigateToConverter(item.category)}
            >
              <View style={styles.historyHeader}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
              </View>
              <View style={styles.conversionDetails}>
                <Text style={styles.valueText}>
                  {item.value} {item.fromUnit}
                </Text>
                <Text style={styles.arrowText}>→</Text>
                <Text style={styles.resultText}>
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
    backgroundColor: Colors.background,
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
    color: Colors.textSecondary,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  historyItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.text,
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
    color: Colors.primary,
  },
  dateText: {
    ...Typography.caption,
    color: Colors.textSecondary,
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
    color: Colors.primary,
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
    color: Colors.textSecondary,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});