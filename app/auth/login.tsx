import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useUserStore } from '@/store/user-store';
import { Mail, Lock, User } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (isLogin) {
      // Login validation
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
    } else {
      // Register validation
      if (!username || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      login(username || email.split('@')[0], email);
      router.push('/home');
    }, 1000);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Text style={styles.logoText}>U</Text>
            </View>
            <Text style={styles.appName}>Unitify</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? 'Sign in to access your conversions'
                : 'Register to start using Unitify'}
            </Text>

            {!isLogin && (
              <Input
                label="Username"
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                rightIcon={<User size={20} color={Colors.textSecondary} />}
              />
            )}

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              rightIcon={<Mail size={20} color={Colors.textSecondary} />}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              rightIcon={<Lock size={20} color={Colors.textSecondary} />}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button
              title={isLogin ? 'Login' : 'Register'}
              onPress={handleSubmit}
              loading={loading}
              size="large"
              fullWidth
              style={styles.submitButton}
            />

            <TouchableOpacity onPress={toggleAuthMode} style={styles.toggleButton}>
              <Text style={styles.toggleText}>
                {isLogin
                  ? "Don't have an account? Register"
                  : 'Already have an account? Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
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
  formContainer: {
    flex: 1,
  },
  title: {
    ...Typography.h1,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  submitButton: {
    marginTop: 16,
  },
  toggleButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.error,
    marginTop: 8,
    marginBottom: 8,
  },
});