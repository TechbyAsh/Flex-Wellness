import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './OnboardingScreen'; // Placeholder - needs actual implementation
import HomeScreen from './HomeScreen'; // Placeholder - needs actual implementation
import ProfileScreen from './ProfileScreen'; // Placeholder - needs actual implementation


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="(tabs)" component={MyTabs} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Placeholder components - Replace with your actual components
function OnboardingScreen() {
    return ( <Text>Onboarding Screen</Text>);
}

function HomeScreen() {
  return (<Text>Home Screen</Text>);
}

function ProfileScreen() {
  return (<Text>Profile Screen</Text>);
}