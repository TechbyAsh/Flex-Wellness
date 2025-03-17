
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function Meals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [meals, setMeals] = useState([]);

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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.button} onPress={searchFood}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            <Text style={styles.mealName}>{item.product_name}</Text>
            <Text>Calories: {item.nutriments?.energy_100g || 'N/A'} kcal/100g</Text>
          </View>
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
  searchContainer: {
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
  button: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mealCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
