import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteConversion {
  id: string;
  category: string;
  fromUnit: string;
  toUnit: string;
  label: string;
}

interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
  recentConversions: {
    category: string;
    fromUnit: string;
    toUnit: string;
    value: number;
    result: number;
    timestamp: number;
  }[];
  favoriteCategories: string[];
  favoriteConversions: FavoriteConversion[];
  hasCompletedOnboarding: boolean;
  
  // Actions
  login: (username: string, email: string) => void;
  logout: () => void;
  addRecentConversion: (conversion: {
    category: string;
    fromUnit: string;
    toUnit: string;
    value: number;
    result: number;
  }) => void;
  toggleFavoriteCategory: (category: string) => void;
  addFavoriteConversion: (conversion: FavoriteConversion) => void;
  removeFavoriteConversion: (id: string) => void;
  isFavoriteConversion: (category: string, fromUnit: string, toUnit: string) => boolean;
  setOnboardingComplete: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      username: null,
      email: null,
      recentConversions: [],
      favoriteCategories: [],
      favoriteConversions: [],
      hasCompletedOnboarding: false,
      
      login: (username, email) => set({ 
        isLoggedIn: true, 
        username, 
        email 
      }),
      
      logout: () => set({ 
        isLoggedIn: false, 
        username: null, 
        email: null 
      }),
      
      addRecentConversion: (conversion) => set((state) => {
        const newConversions = [
          {
            ...conversion,
            timestamp: Date.now(),
          },
          ...state.recentConversions,
        ].slice(0, 10); // Keep only the 10 most recent
        
        return { recentConversions: newConversions };
      }),
      
      toggleFavoriteCategory: (category) => set((state) => {
        const isFavorite = state.favoriteCategories.includes(category);
        
        if (isFavorite) {
          return {
            favoriteCategories: state.favoriteCategories.filter(
              (cat) => cat !== category
            ),
          };
        } else {
          return {
            favoriteCategories: [...state.favoriteCategories, category],
          };
        }
      }),
      
      addFavoriteConversion: (conversion) => set((state) => {
        // Check if this conversion is already a favorite
        const exists = state.favoriteConversions.some(
          (fav) => fav.category === conversion.category && 
                  fav.fromUnit === conversion.fromUnit && 
                  fav.toUnit === conversion.toUnit
        );
        
        if (exists) return state;
        
        return {
          favoriteConversions: [...state.favoriteConversions, conversion]
        };
      }),
      
      removeFavoriteConversion: (id) => set((state) => ({
        favoriteConversions: state.favoriteConversions.filter(
          (conversion) => conversion.id !== id
        )
      })),
      
      isFavoriteConversion: (category, fromUnit, toUnit) => {
        const state = get();
        return state.favoriteConversions.some(
          (fav) => fav.category === category && 
                  fav.fromUnit === fromUnit && 
                  fav.toUnit === toUnit
        );
      },
      
      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: 'unitify-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);