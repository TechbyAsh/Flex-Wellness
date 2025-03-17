import React, { useState } from 'react';
import { Stack, Tabs } from "expo-router";
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  const [hasOnboarded, setHasOnboarded] = useState(false);

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
          }} >
          {() => (
            <View style={{ flex: 1 }}>
              <Tabs
                screenOptions={{
                  tabBarStyle: {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                  },
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerTransparent: true,
                  headerTitleStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                  }
                }}
              >
                <Tabs.Screen
                  name="index"
                  options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                  }}
                />
                <Tabs.Screen
                  name="meals"
                  options={{
                    title: 'Meals',
                    tabBarIcon: ({ color }) => <TabBarIcon name="restaurant" color={color} />,
                  }}
                />
                <Tabs.Screen
                  name="workouts"
                  options={{
                    title: 'Workouts',
                    tabBarIcon: ({ color }) => <TabBarIcon name="fitness-center" color={color} />,
                  }}
                />
                <Tabs.Screen
                  name="community"
                  options={{
                    title: 'Community',
                    tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
                  }}
                />
                <Tabs.Screen
                  name="profile"
                  options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
                  }}
                />
              </Tabs>
            </View>
          )}
        </Stack.Screen>
      </Stack>
    </View>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}