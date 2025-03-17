
import React, { useState, useEffect } from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(status === 'true');
    } catch (error) {
      setHasSeenOnboarding(false);
    }
  };

  if (hasSeenOnboarding === null) {
    return null; // Loading state
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Stack screenOptions={{ headerShown: false }}>
        {!hasSeenOnboarding ? (
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
      </Stack>
    </View>
  );
}
