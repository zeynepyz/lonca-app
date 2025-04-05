import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const AnimatedSplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations immediately
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Hold for a moment before finishing
      setTimeout(() => {
        // Call onFinish to proceed to the main app
        onFinish();
      }, 1500);
    });
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.Text 
        style={[
          styles.text,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        LONCA
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
    fontFamily: 'serif', // Using system serif font instead of custom font
    letterSpacing: 6,
    fontWeight: '500',
  },
});

export default AnimatedSplashScreen; 