import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { Phonecall_end, Reject_call } from '../Common/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import { RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';


const CallingAcceptance = ({ route, navigation }) => {
  const { socket, agent_id, user_id } = route?.params || {};
  const [callerName, setCallerName] = useState('Unknown Caller');
  const callerTune = useRef(null);
  const ringtone = useRef(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!socket) {
      console.error('Socket is not available');
      return;
    }

    // Setup animations
    setupAnimations();

    // Set up socket listeners
    socket.on('endCall', handleEndCall);
    socket.on('playCallerTune', () => playTune(callerTune, 'rington.mp3'));

    // Clean up function
    return () => {
      socket.off('endCall', handleEndCall);
      socket.off('playCallerTune');
      stopTune(callerTune);
      stopTune(ringtone);
    };
  }, [socket]);

  const setupAnimations = () => {
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
  };

  const playTune = (tuneRef, fileName) => {
    if (tuneRef.current) {
      tuneRef.current.stop();
      tuneRef.current.release();
    }
    tuneRef.current = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load the sound', error);
        return;
      }
      tuneRef.current.play((success) => {
        if (!success) {
          console.error('Playback failed due to audio decoding errors');
        }
      });
    });
  };

  const stopTune = (tuneRef) => {
    if (tuneRef.current) {
      tuneRef.current.stop();
      tuneRef.current.release();
      tuneRef.current = null;
    }
  };

  const handleReject = () => {
    if (!socket) {
      console.error('Socket is not available for rejecting call');
      return;
    }
    socket.emit('rejectCall', { receiverId: user_id, callerId: agent_id });
    navigation.goBack();
  };

  const handleEndCall = () => {
    console.log('End call event received');
    navigation.goBack();
  };

  const handleAccept = async () => {
    if (!socket) {
      console.error('Socket not available');
      return;
    }
  
    socket.emit('acceptCall', { receiverId: user_id, callerId: agent_id });
    stopTune(callerTune);
    
    navigation.navigate('ongoing_call', {
      mode: 'reveiver',
      socket: socket,
      receiver_id: agent_id,
      user_id: user_id,
      isCaller: false, // Set to false if this user is the receiver
    });
  };
  
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
          <TouchableOpacity style={styles.actionButton} onPress={handleAccept}>
            <Phonecall_end />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.endCallButton} onPress={handleReject}>
          <Reject_call />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    borderColor: 'white',
  },
  callerName: {
    marginTop: 20,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  callStatus: {
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
  },
  bottomSection: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  actionButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: '#ff3b30',
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CallingAcceptance;