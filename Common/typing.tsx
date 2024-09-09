import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Typing = () => {
  const animation1 = useRef(new Animated.Value(0)).current;
  const animation2 = useRef(new Animated.Value(0)).current;
  const animation3 = useRef(new Animated.Value(0)).current;

  const animate = (animatedValue: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animate(animation1, 0);
    animate(animation2, 200);
    animate(animation3, 400);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: animation1 }]} />
      <Animated.View style={[styles.dot, { opacity: animation2 }]} />
      <Animated.View style={[styles.dot, { opacity: animation3 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#D3D3D3', // Equivalent to the secondary background color
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#A1A1A1', // Equivalent to bg-zinc-300
    borderRadius: 4,
    marginHorizontal: 1,
  },
});

export default Typing;
