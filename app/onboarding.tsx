
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    title: "Track Your Meals",
    description: "Log your daily meals and track your nutrition with our extensive food database.",
    icon: "restaurant-menu"
  },
  {
    title: "Set Fitness Goals",
    description: "Create personalized workout plans and track your progress over time.",
    icon: "fitness-center"
  },
  {
    title: "Join the Community",
    description: "Connect with like-minded people and share your fitness journey.",
    icon: "groups"
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#556270']}
        style={styles.background}
      />
      
      <Animated.View 
        entering={FadeInDown.delay(300)}
        style={styles.iconContainer}
      >
        <MaterialIcons 
          name={onboardingSteps[currentStep].icon} 
          size={120} 
          color="white" 
        />
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(500)}
        style={styles.contentContainer}
      >
        <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
        <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentStep === index && styles.activeDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: width * 0.8,
  },
  footer: {
    width: '100%',
    padding: 20,
    paddingBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4ECDC4',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
