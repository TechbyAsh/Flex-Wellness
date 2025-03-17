
import React, { useEffect } from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('hasSeenOnboarding');
      if (status !== 'true') {
        router.replace('/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      router.replace('/onboarding');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}
