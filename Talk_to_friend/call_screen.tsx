import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Mic_on, Phonecall_end, Speaker_on } from '../Common/icon';

const CallingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Avatar and Caller Info */}
      <Animated.View style={[styles.topSection, { opacity: fadeAnim }]}>
        <Image
          style={styles.avatar}
          source={require('../Assets/Images/profile.png')}
        />
        <Text style={styles.callerName}>Saish Bafna</Text>
        <Text style={styles.callStatus}>Calling...</Text>
      </Animated.View>

      {/* Call Timer */}
      {/* <View style={styles.middleSection}>
        <Text style={styles.timer}>00:12</Text>
      </View> */}

      {/* Call Actions */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Mic_on />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Speaker_on />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endCallButton}>
          <Phonecall_end />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Black theme
    justifyContent: 'center',
  },
  topSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white', // White outline for the avatar
  },
  callerName: {
    marginTop: 20,
    fontSize: 24,
    color: 'white', // White text
    fontWeight: 'bold',
  },
  callStatus: {
    fontSize: 18,
    color: 'gray', // Subtle gray for the call status
    marginTop: 10,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 40,
    color: 'white', // White timer text
    fontWeight: 'bold',
  },
  bottomSection: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly transparent background for buttons
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  actionButton: {
    backgroundColor: 'gray', // Light gray button for actions
    padding: 20,
    borderRadius: 50,
  },
  endCallButton: {
    backgroundColor: '#ff3b30', // Red end call button
    padding: 20,
    borderRadius: 50,
  },
});

export default CallingScreen;
