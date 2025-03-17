
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Profile() {
  const [userStats] = useState({
    workoutsCompleted: 48,
    caloriesBurned: 12400,
    hoursActive: 64,
    achievements: 12
  });

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#556270']}
        style={styles.header}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileImage}>
            <MaterialIcons name="person" size={60} color="white" />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userBio}>Fitness Enthusiast 💪</Text>
        </View>
      </LinearGradient>

      <Animated.View entering={FadeInUp.delay(200)} style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userStats.workoutsCompleted}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userStats.caloriesBurned}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userStats.achievements}</Text>
          <Text style={styles.statLabel}>Achievements</Text>
        </View>
      </Animated.View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="edit" size={24} color="#4ECDC4" />
          <Text style={styles.settingText}>Edit Profile</Text>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="notifications" size={24} color="#4ECDC4" />
          <Text style={styles.settingText}>Notifications</Text>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="privacy-tip" size={24} color="#4ECDC4" />
          <Text style={styles.settingText}>Privacy</Text>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="help" size={24} color="#4ECDC4" />
          <Text style={styles.settingText}>Help & Support</Text>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  userBio: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  settingsContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    padding: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});
