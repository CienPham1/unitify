import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useUserStore } from '@/store/user-store';
import Colors from '@/constants/colors';

export default function Index() {
  const { hasCompletedOnboarding } = useUserStore();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      {hasCompletedOnboarding ? (
        <Redirect href="/home" />
      ) : (
        <Redirect href="/onboarding/welcome" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});