import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/features');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoText}>U</Text>
          </View>
          <Text style={styles.appName}>Unitify</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Unitify</Text>
          <Text style={styles.subtitle}>
            The ultimate unit conversion tool for all your needs
          </Text>
        </View>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070' }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleNext}
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
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.background,
  },
  appName: {
    ...Typography.h2,
    marginTop: 12,
    color: Colors.primary,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 40,
  },
});