import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('strength');
  const [targetValue, setTargetValue] = useState('');
  const [activityLog, setActivityLog] = useState([
    { date: '2024-01-20', type: 'Running', duration: '30 min', distance: '4km' },
    { date: '2024-01-19', type: 'Weight Training', duration: '45 min', weight: '150lbs' }
  ]);
  const [personalRecords, setPersonalRecords] = useState({
    'Bench Press': '185 lbs',
    'Squat': '225 lbs',
    'Deadlift': '275 lbs',
    '5K Run': '25:30'
  });

  const categories = {
    strength: { icon: '💪', color: '#FF6B6B' },
    cardio: { icon: '🏃‍♂️', color: '#4ECDC4' },
    flexibility: { icon: '🧘‍♀️', color: '#95E1D3' },
    weight: { icon: '⚖️', color: '#88D8B0' }
  };

  const recordNewActivity = () => {
    // Implementation for logging new activities
  };

  const updatePersonalRecord = (exercise, value) => {
    setPersonalRecords({...personalRecords, [exercise]: value});
  };

  const addWorkout = () => {
    if (newGoal.trim() && targetValue.trim()) {
      setWorkouts([...workouts, {
        goal: newGoal,
        category: selectedCategory,
        target: targetValue,
        progress: 0,
        completed: false,
        created: new Date()
      }]);
      setNewGoal('');
      setTargetValue('');
    }
  };

  const updateProgress = (index, increment) => {
    const newWorkouts = [...workouts];
    const currentProgress = Number(newWorkouts[index].progress);
    const target = Number(newWorkouts[index].target);
    
    newWorkouts[index].progress = Math.min(
      Math.max(currentProgress + increment, 0),
      target
    );
    
    newWorkouts[index].completed = newWorkouts[index].progress >= target;
    setWorkouts(newWorkouts);
  };

  const renderCategorySelector = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
      {Object.entries(categories).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          onPress={() => setSelectedCategory(key)}
          style={[
            styles.categoryButton,
            selectedCategory === key && { backgroundColor: value.color }
          ]}
        >
          <Text style={styles.categoryIcon}>{value.icon}</Text>
          <Text style={styles.categoryText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#556270']}
        style={styles.gradientHeader}
      >
        <Text style={styles.headerText}>Fitness Tracker</Text>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="trending-up" size={24} color="#4ECDC4" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Workouts This Month</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="timer" size={24} color="#FF6B6B" />
          <Text style={styles.statValue}>480</Text>
          <Text style={styles.statLabel}>Minutes Active</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Personal Records</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recordsScroll}>
        {Object.entries(personalRecords).map(([exercise, record]) => (
          <View key={exercise} style={styles.recordCard}>
            <Text style={styles.recordExercise}>{exercise}</Text>
            <Text style={styles.recordValue}>{record}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Activity Log</Text>
      <FlatList
        data={activityLog}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInUp} style={styles.activityCard}>
            <Text style={styles.activityDate}>{item.date}</Text>
            <Text style={styles.activityType}>{item.type}</Text>
            <Text style={styles.activityDetails}>
              Duration: {item.duration}
              {item.distance && ` • Distance: ${item.distance}`}
              {item.weight && ` • Weight: ${item.weight}`}
            </Text>
          </Animated.View>
        )}
        keyExtractor={(item) => item.date}
        style={styles.activityList}
      />

      <Text style={styles.sectionTitle}>Fitness Goals</Text>
      {renderCategorySelector()}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new goal..."
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <TextInput
          style={styles.input}
          placeholder="Target (e.g., 10 reps, 5km)"
          value={targetValue}
          onChangeText={setTargetValue}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addWorkout}>
          <Text style={styles.buttonText}>Add Goal</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.delay(index * 100)}
            style={styles.workoutCard}
          >
            <View style={styles.workoutHeader}>
              <Text style={styles.categoryIcon}>
                {categories[item.category].icon}
              </Text>
              <Text style={styles.workoutText}>{item.goal}</Text>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={[categories[item.category].color, '#fff']}
                  style={[
                    styles.progressFill,
                    { width: `${(item.progress / item.target) * 100}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {item.progress} / {item.target}
              </Text>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => updateProgress(index, -1)}
              >
                <Text style={styles.controlText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => updateProgress(index, 1)}
              >
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gradientHeader: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  categoryScroll: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    padding: 15,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  workoutCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  progressContainer: {
    marginVertical: 10,
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
    textAlign: 'center',
    marginTop: 5,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    color: '#333',
  },
  recordsScroll: {
    paddingHorizontal: 10,
  },
  recordCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    minWidth: 120,
  },
  recordExercise: {
    fontSize: 14,
    color: '#666',
  },
  recordValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  activityCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  activityDate: {
    fontSize: 14,
    color: '#666',
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  activityDetails: {
    fontSize: 14,
    color: '#666',
  },
  activityList: {
    marginBottom: 15,
  },
  goalsContainer: {
    padding: 15,
  },
});