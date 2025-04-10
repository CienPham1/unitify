import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useUserStore } from '@/store/user-store';
import CategoryGrid from '@/components/CategoryGrid';
import { 
  Ruler, Weight, Thermometer, Droplet, Clock, Gauge, Zap, 
  SquareAsterisk, Compass, Percent, Database, DollarSign, 
  Dumbbell, Lightbulb, Volume2, Layers
} from 'lucide-react-native';
import { CategoryType } from '@/types/categories';

const categories: CategoryType[] = [
  { id: 'length', title: 'Length', icon: <Ruler size={32} color={Colors.primary} />, route: '/converter/length' },
  { id: 'mass', title: 'Mass', icon: <Weight size={32} color={Colors.primary} />, route: '/converter/mass' },
  { id: 'temperature', title: 'Temperature', icon: <Thermometer size={32} color={Colors.primary} />, route: '/converter/temperature' },
  { id: 'volume', title: 'Volume', icon: <Droplet size={32} color={Colors.primary} />, route: '/converter/volume' },
  { id: 'time', title: 'Time', icon: <Clock size={32} color={Colors.primary} />, route: '/converter/time' },
  { id: 'speed', title: 'Speed', icon: <Gauge size={32} color={Colors.primary} />, route: '/converter/speed' },
  { id: 'energy', title: 'Energy', icon: <Zap size={32} color={Colors.primary} />, route: '/converter/energy' },
  { id: 'area', title: 'Area', icon: <SquareAsterisk size={32} color={Colors.primary} />, route: '/converter/area' },
  { id: 'pressure', title: 'Pressure', icon: <Compass size={32} color={Colors.primary} />, route: '/converter/pressure' },
  { id: 'angle', title: 'Angle', icon: <Compass size={32} color={Colors.primary} />, route: '/converter/angle' },
  { id: 'quantity', title: 'Quantity', icon: <Layers size={32} color={Colors.primary} />, route: '/converter/quantity' },
  { id: 'concentration', title: 'Concentration', icon: <Percent size={32} color={Colors.primary} />, route: '/converter/concentration' },
  { id: 'density', title: 'Density', icon: <Database size={32} color={Colors.primary} />, route: '/converter/density' },
  { id: 'currency', title: 'Currency', icon: <DollarSign size={32} color={Colors.primary} />, route: '/converter/currency' },
  { id: 'force', title: 'Force', icon: <Dumbbell size={32} color={Colors.primary} />, route: '/converter/force' },
  { id: 'voltage', title: 'Voltage', icon: <Lightbulb size={32} color={Colors.primary} />, route: '/converter/voltage' },
  { id: 'sound', title: 'Sound', icon: <Volume2 size={32} color={Colors.primary} />, route: '/converter/sound' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { username, recentConversions } = useUserStore();

  const handleSelectCategory = (category: CategoryType) => {
    router.push(category.route);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {username || 'User'}!</Text>
          <Text style={styles.subtitle}>What would you like to convert today?</Text>
        </View>

        {recentConversions.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Conversions</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentList}
            >
              {recentConversions.slice(0, 5).map((conversion, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.recentItem}
                  onPress={() => {
                    const category = categories.find(c => c.id === conversion.category.toLowerCase());
                    if (category) {
                      router.push(category.route);
                    }
                  }}
                >
                  <Text style={styles.recentCategory}>{conversion.category}</Text>
                  <Text style={styles.recentValue}>
                    {conversion.value} {conversion.fromUnit} → {conversion.result.toFixed(2)} {conversion.toUnit}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <Text style={styles.sectionTitle}>All Categories</Text>
        <CategoryGrid 
          categories={categories} 
          onSelectCategory={handleSelectCategory} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    ...Typography.h1,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    ...Typography.h2,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  recentSection: {
    marginBottom: 8,
  },
  recentList: {
    paddingHorizontal: 16,
  },
  recentItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    minWidth: 200,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentCategory: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  recentValue: {
    ...Typography.body,
  },
});