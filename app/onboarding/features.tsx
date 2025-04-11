import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useUserStore } from '@/store/user-store';
import { Calculator, Gauge, Repeat, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const features = [
  {
    id: '1',
    title: '20+ Unit Categories',
    description: 'Convert between length, mass, temperature, and many more',
    icon: <Calculator size={32} color={Colors.primary} />,
  },
  {
    id: '2',
    title: 'Accurate Conversions',
    description: 'Precise calculations for all your conversion needs',
    icon: <Gauge size={32} color={Colors.primary} />,
  },
  {
    id: '3',
    title: 'Save Favorites',
    description: 'Bookmark your most used conversions for quick access',
    icon: <Star size={32} color={Colors.primary} />,
  },
  {
    id: '4',
    title: 'Instant Results',
    description: 'See conversion results as you type for maximum efficiency',
    icon: <Repeat size={32} color={Colors.primary} />,
  },
];

export default function FeaturesScreen() {
  const router = useRouter();
  const setOnboardingComplete = useUserStore((state) => state.setOnboardingComplete);

  const handleGetStarted = () => {
    setOnboardingComplete();
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Key Features</Text>
        <Text style={styles.subtitle}>
          Discover what makes Unitify the best conversion app
        </Text>

        <FlatList
          data={features}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.featureItem}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.featuresList}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={handleGetStarted}
            size="large"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featuresList: {
    paddingBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    ...Typography.h3,
    marginBottom: 4,
  },
  featureDescription: {
    ...Typography.bodySmall,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});