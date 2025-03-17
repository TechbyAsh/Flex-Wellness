
import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabsLayout() {
  return (
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
  );
}
