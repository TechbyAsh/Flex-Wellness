
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

const motivationalMessages = [
  "Every step counts towards your goals! 💪",
  "You're stronger than you think! 🌟",
  "Make today count! 🎯",
  "Progress over perfection! 🚀",
];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('daily');
  
  const stats = {
    daily: {
      steps: 8432,
      calories: 1850,
      workouts: 2,
      meals: 3,
      water: 6
    },
    weekly: {
      steps: 52340,
      calories: 12500,
      workouts: 10,
      meals: 21,
      water: 42
    },
    monthly: {
      steps: 234500,
      calories: 54200,
      workouts: 45,
      meals: 90,
      water: 180
    }
  };

  const QuickAction = ({ icon, label, color }) => (
    <TouchableOpacity style={[styles.quickAction, { backgroundColor: color }]}>
      <MaterialIcons name={icon} size={24} color="white" />
      <Text style={styles.quickActionText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#556270']}
        style={styles.header}
      >
        <Text style={styles.greeting}>Welcome Back! 👋</Text>
        <Text style={styles.motivational}>
          {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
        </Text>
      </LinearGradient>

      <View style={styles.timeframeSelector}>
        {['daily', 'weekly', 'monthly'].map((period) => (
          <TouchableOpacity
            key={period}
            onPress={() => setTimeframe(period)}
            style={[
              styles.timeframeButton,
              timeframe === period && styles.timeframeButtonActive
            ]}
          >
            <Text style={[
              styles.timeframeText,
              timeframe === period && styles.timeframeTextActive
            ]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View entering={FadeInUp.delay(200)} style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="directions-walk" size={24} color="#4ECDC4" />
          <Text style={styles.statValue}>{stats[timeframe].steps}</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="local-fire-department" size={24} color="#FF6B6B" />
          <Text style={styles.statValue}>{stats[timeframe].calories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="fitness-center" size={24} color="#95E1D3" />
          <Text style={styles.statValue}>{stats[timeframe].workouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
      </Animated.View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <QuickAction icon="fitness-center" label="Start Workout" color="#4ECDC4" />
        <QuickAction icon="restaurant" label="Log Meal" color="#FF6B6B" />
        <QuickAction icon="opacity" label="Add Water" color="#95E1D3" />
        <QuickAction icon="monitor-weight" label="Log Weight" color="#88D8B0" />
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Today's Progress</Text>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={['#4ECDC4', '#2FB4AB']}
            style={[styles.progressFill, { width: '75%' }]}
          />
        </View>
        <Text style={styles.progressText}>75% of daily goals completed</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  motivational: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
  },
  timeframeButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  timeframeButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  timeframeText: {
    color: '#666',
    fontWeight: '500',
  },
  timeframeTextActive: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '30%',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  quickActionText: {
    color: 'white',
    marginTop: 5,
    fontWeight: '500',
  },
  progressCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});
