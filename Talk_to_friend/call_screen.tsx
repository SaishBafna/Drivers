import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Alert,
} from 'react-native';
import { Phonecall_end, Reject_call } from '../Common/icon';
import Sound from 'react-native-sound';
import { RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';


const CallingScreen = ({ route, navigation }) => {
  const { mode, caller, receiver, socket, user_id, receiver_id } = route.params;
  const [callStatus, setCallStatus] = useState('Ringing...');
  const callerTune = useRef(null);
  const ringtone = useRef(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    handleSocketEvents();
    setupAnimations();
    // setupInitialCall();

    return () => {
      cleanupSocketEvents();
      stopAllSounds();
    };
  }, []);

  const cleanupSocketEvents = () => {
    if (!socket) return;
    ['callAccepted', 'callRejected', 'callEnded', 'userBusy', 'userUnavailable'].forEach(
      event => socket.off(event)
    );
  };

  const stopAllSounds = () => {
    stopTune(callerTune);
    stopTune(ringtone);
  };

  const setupAnimations = () => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Pulse animation
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

    pulse();
  };

  const setupInitialCall = () => {
    const soundFile = mode === 'caller' ? 'caller.mp3' : 'call.mp3';
    const tuneRef = mode === 'caller' ? callerTune : ringtone;
    playTune(tuneRef, soundFile);
  };

  const playTune = (tuneRef, fileName) => {
    if (tuneRef.current) {
      tuneRef.current.stop();
      tuneRef.current.release();
    }
    
    tuneRef.current = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load sound:', error);
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

  const handleSocketEvents = () => {
    if (!socket) return;

    socket.on('callAccepted', () => {
      setCallStatus('Call Connected');
      stopTune(callerTune);
      navigation.navigate('ongoing_call', {
        mode: 'caller',
        socket: socket,
        receiverId: receiver_id,
        userId: user_id,
        isCaller: true, // Set to false if this user is the receiver
      });
    });

    socket.on('callRejected', () => {
      Alert.alert('Call Rejected');
      stopTune(callerTune);
      navigation.goBack();
    });

    socket.on('callEnded', () => {
      Alert.alert('Call Ended');
      stopTune(ringtone);
      navigation.goBack();
    });

    socket.on('userBusy', () => {
      Alert.alert('User is busy on another call');
      stopTune(callerTune);
      navigation.goBack();
    });

    socket.on('userUnavailable', () => {
      Alert.alert('User is unavailable');
      stopTune(callerTune);
      navigation.goBack();
    });
  };

  const handleCallEnd = () => {
    if (!socket) return;
    socket.emit('endCall', { receiverId: receiver_id, callerId: user_id });
    stopAllSounds();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topSection, { opacity: fadeAnim }]}>
        <Image
          style={styles.avatar}
          source={require('../Assets/Images/profile.png')}
        />
        <Text style={styles.callerName}>
          {mode === 'caller' ? receiver?.name : caller?.name}
        </Text>
        <Text style={styles.callStatus}>{callStatus}</Text>
      </Animated.View>

      <View style={styles.bottomSection}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.endCallButton} onPress={handleCallEnd}>
            <Reject_call />
          </TouchableOpacity>
        </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  endCallButton: {
    backgroundColor: '#ff3b30',
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CallingScreen;