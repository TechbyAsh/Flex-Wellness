
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const addWorkout = () => {
    if (newGoal.trim()) {
      setWorkouts([...workouts, { goal: newGoal, completed: false }]);
      setNewGoal('');
    }
  };

  const toggleWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts[index].completed = !newWorkouts[index].completed;
    setWorkouts(newWorkouts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new workout goal..."
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <TouchableOpacity style={styles.addButton} onPress={addWorkout}>
          <Text style={styles.buttonText}>Add</Text>
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
            <TouchableOpacity
              style={styles.workoutToggle}
              onPress={() => toggleWorkout(index)}
            >
              <View style={[styles.checkbox, item.completed && styles.checked]} />
              <Text style={[styles.workoutText, item.completed && styles.completedText]}>
                {item.goal}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  workoutCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#4ECDC4',
  },
  workoutText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
});
