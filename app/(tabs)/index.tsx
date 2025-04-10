import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useUserStore } from '@/store/user-store';
import { 
  User, Mail, LogOut, Heart, Settings, Info, 
  HelpCircle, Star, Moon, Sun
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { username, email, logout } = useUserStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/auth/login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your account</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{username?.[0] || 'U'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>{username || 'User'}</Text>
            <Text style={styles.emailText}>{email || 'user@example.com'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <User size={20} color={Colors.primary} />
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Heart size={20} color={Colors.primary} />
            <Text style={styles.menuText}>Favorite Conversions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color={Colors.primary} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Sun size={20} color={Colors.primary} />
            <Text style={styles.menuText}>Light Mode</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Moon size={20} color={Colors.primary} />
            <Text style={styles.menuText}>Dark Mode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Info size={20} color={Colors.primary} />
            <Text style={styles.menuText}>About Unitify</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color={Colors.primary} />
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Star size={20} color={Colors.primary} />
            <Text style={styles.menuText}>Rate the App</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  title: {
    ...Typography.h1,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  nameText: {
    ...Typography.h3,
    marginBottom: 4,
  },
  emailText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.h3,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  menuText: {
    ...Typography.body,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  logoutText: {
    ...Typography.body,
    color: Colors.error,
    fontWeight: '600',
    marginLeft: 8,
  },
});