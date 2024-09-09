import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import {Phonecall_end, Reject_call} from '../Common/icon';

const CallingAcceptance = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current; // Scale for pulse animation

  useEffect(() => {
    // Fade in effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Pulse animation for the call acceptance button
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse(); // Start the pulse animation
  }, []);

  return (
    <View style={styles.container}>
      {/* Avatar and Caller Info */}
      <Animated.View style={[styles.topSection, {opacity: fadeAnim}]}>
        <Image
          style={styles.avatar}
          source={require('../Assets/Images/profile.png')}
        />
        <Text style={styles.callerName}>Saish Bafna</Text>
        <Text style={styles.callStatus}>Calling...</Text>
      </Animated.View>

      {/* Call Actions */}
      <View style={styles.bottomSection}>
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <TouchableOpacity style={styles.actionButton}>
            <Phonecall_end />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.endCallButton}>
          <Reject_call />
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
    backgroundColor: 'green', // Light
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: '#ff3b30', // Red end call button
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CallingAcceptance;
