import React from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}