
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Meals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanning(false);
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const result = await response.json();
      if (result.status === 1) {
        setMeals([result.product]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const dailySummary = {
    calories: 2000,
    consumed: 850,
    remaining: 1150,
    protein: 65,
    carbs: 120,
    fat: 35
  };

  const mealSections = {
    breakfast: { name: 'Breakfast', calories: 300 },
    lunch: { name: 'Lunch', calories: 400 },
    dinner: { name: 'Dinner', calories: 150 },
    snacks: { name: 'Snacks', calories: 0 }
  };

  const searchFood = async () => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&json=1`
      );
      const data = await response.json();
      setMeals(data.products || []);
    } catch (error) {
      console.error('Error fetching food:', error);
    }
  };

  const renderMealSection = (type, data) => (
    <Animated.View 
      entering={FadeInUp.delay(200)} 
      style={styles.mealSection}
    >
      <View style={styles.mealHeader}>
        <Text style={styles.mealTitle}>{data.name}</Text>
        <Text style={styles.mealCalories}>{data.calories} cal</Text>
      </View>
      <TouchableOpacity 
        style={styles.addFoodButton}
        onPress={() => setSelectedMeal(type)}
      >
        <Text style={styles.addFoodText}>+ Add Food</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#2FB4AB']}
        style={styles.summaryCard}
      >
        <Text style={styles.summaryTitle}>Calories Remaining</Text>
        <View style={styles.calorieRow}>
          <Text style={styles.remainingCalories}>{dailySummary.remaining}</Text>
          <View style={styles.calorieMath}>
            <Text style={styles.mathText}>{dailySummary.calories}</Text>
            <Text style={styles.mathText}>- {dailySummary.consumed}</Text>
            <Text style={styles.mathText}>= {dailySummary.remaining}</Text>
          </View>
        </View>
        <View style={styles.macros}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{dailySummary.protein}g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{dailySummary.carbs}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{dailySummary.fat}g</Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>
        </View>
      </LinearGradient>

      {Object.entries(mealSections).map(([type, data]) => 
        renderMealSection(type, data)
      )}

{scanning && (
  <View style={styles.scannerContainer}>
    <Camera
      style={styles.scanner}
      type={Camera.Constants.Type.back}
      onBarCodeScanned={handleBarCodeScanned}
    />
    <TouchableOpacity 
      style={styles.closeScannerButton}
      onPress={() => setScanning(false)}
    >
      <Text style={styles.buttonText}>Close Scanner</Text>
    </TouchableOpacity>
  </View>
)}
      
      {selectedMeal && !scanning && (
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.scanButton} 
            onPress={() => setScanning(true)}
          >
            <Text style={styles.buttonText}>Scan Barcode</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={searchFood}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={meals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.foodItem}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.product_name}</Text>
              <Text style={styles.foodDetails}>
                {item.nutriments?.energy_100g || '0'} kcal • {item.quantity || 'per serving'}
              </Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scannerContainer: {
    height: 300,
    width: '100%',
    overflow: 'hidden',
    marginVertical: 15,
  },
  scanner: {
    height: '100%',
    width: '100%',
  },
  scanButton: {
    backgroundColor: '#4ECDC4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeScannerButton: {
    backgroundColor: '#ff6b6b',
    padding: 12,
    borderRadius: 8,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    padding: 20,
    margin: 15,
    borderRadius: 15,
    marginTop: 60,
  },
  summaryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  remainingCalories: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  calorieMath: {
    alignItems: 'flex-end',
  },
  mathText: {
    color: 'white',
    fontSize: 16,
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  macroLabel: {
    color: 'white',
    fontSize: 14,
  },
  mealSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  mealCalories: {
    fontSize: 16,
    color: '#666',
  },
  addFoodButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  addFoodText: {
    color: '#4ECDC4',
    textAlign: 'center',
    fontWeight: '500',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#4ECDC4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
  },
  foodDetails: {
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
