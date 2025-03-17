import React from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Stack>
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            headerShown: false,
            presentation: 'modal' 
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </View>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}