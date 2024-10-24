import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import InCallManager from 'react-native-incall-manager';
import { RTCPeerConnection, RTCSessionDescription, mediaDevices } from 'react-native-webrtc';
import { Mic, MicOff, Phonecall_end, Speaker, SpeakerOff } from '../Common/icon';

const OngoingCallScreen = ({ route, navigation }) => {
  const { mode, socket, userId, receiverId, isCaller } = route.params;

  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Initializing...');
  const [isConnected, setIsConnected] = useState(false);

  const peerConnection = useRef(null);
  const streamRef = useRef(null);
  const isSetupComplete = useRef(false);

  const iceServers = {
    iceServers: [
      { urls: ['stun:stun.l.google.com:19302'] },
      { urls: 'turn:relay1.expressturn.com:3478', username: 'ef98GKGS9L8H41Y6HC', credential: 'ijC9ZGl6vt5ztgpp' }
    ],
  };

  useEffect(() => {
    if (!socket) {
      console.log('Socket not initialized');
      return;
    }

    // Join the socket room with userId
    socket.emit('join', { userId });
    
    return () => {
      cleanup();
    };
  }, [socket, userId]);

  useEffect(() => {
    if (isSetupComplete.current) return;

    const initialize = async () => {
      try {
        await setupInCallManager();
        await setupWebRTC();
        isSetupComplete.current = true;
      } catch (err) {
        console.error('Initialization error:', err);
        setConnectionStatus('Failed to initialize');
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const setupSocketListeners = () => {
      socket.on('offer', async ({ offer, callerId }) => {
        console.log('Received offer from:', callerId);
        try {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          
          socket.emit('answer', {
            answer,
            receiverId: callerId,
            callerId: receiverId
          });
        } catch (error) {
          console.error('Error handling offer:', error);
        }
      });

      socket.on('answer', async ({ answer }) => {
        console.log('Received answer');
        try {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (error) {
          console.error('Error handling answer:', error);
        }
      });

      socket.on('iceCandidate', async ({ candidate }) => {
        try {
          if (candidate) {
            await peerConnection.current.addIceCandidate(candidate);
          }
        } catch (error) {
          console.error('Error adding ICE candidate:', error);
        }
      });

      socket.on('callEnded', () => {
        handleEndCallFromRemote();
      });

      socket.on('userUnavailable', () => {
        setConnectionStatus('User unavailable');
        setTimeout(() => navigation.goBack(), 2000);
      });

      socket.on('userBusy', () => {
        setConnectionStatus('User is busy');
        setTimeout(() => navigation.goBack(), 2000);
      });
    };

    setupSocketListeners();

    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('iceCandidate');
      socket.off('callEnded');
      socket.off('userUnavailable');
      socket.off('userBusy');
    };
  }, [socket, userId, navigation]);

  const setupInCallManager = async () => {
    try {
      InCallManager.start({ media: 'audio' });
      InCallManager.setKeepScreenOn(true);
      InCallManager.setForceSpeakerphoneOn(false);
      console.log('InCallManager initialized successfully');
    } catch (err) {
      console.error('Failed to initialize InCallManager:', err);
      throw err;
    }
  };

  const setupWebRTC = async () => {
    try {
      if (peerConnection.current) {
        peerConnection.current.close();
      }

      peerConnection.current = new RTCPeerConnection(iceServers);
      
      peerConnection.current.onicecandidate = ({ candidate }) => {
        if (candidate) {
          socket.emit('iceCandidate', {
            candidate,
            callerId: userId,
            receiverId: receiverId
          });
        }
      };

      peerConnection.current.onconnectionstatechange = () => {
        const state = peerConnection.current.connectionState;
        setConnectionStatus(state.charAt(0).toUpperCase() + state.slice(1));
        setIsConnected(state === 'connected');
      };

      peerConnection.current.ontrack = (event) => {
        if (event.streams?.[0]) {
          setRemoteStream(event.streams[0]);
          InCallManager.setSpeakerphoneOn(isSpeakerOn);
        }
      };

      const stream = await mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      setLocalStream(stream);

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      if (isCaller) {
        await createAndSendOffer();
      }

      setConnectionStatus('Waiting for peer...');
    } catch (err) {
      console.error('Error in setupWebRTC:', err);
      throw err;
    }
  };

  const createAndSendOffer = async () => {
    try {
      const offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      });

      await peerConnection.current.setLocalDescription(offer);

      socket.emit('offer', {
        offer,
        callerId: userId,
        receiverId: receiverId
      });
    } catch (error) {
      console.error('Error creating offer:', error);
      setConnectionStatus('Failed to create offer');
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (peerConnection.current) {
      peerConnection.current.close();
    }

    InCallManager.stop();
    setRemoteStream(null);
    setLocalStream(null);
  };

  const handleEndCall = () => {
    socket.emit('endCall', { callerId: userId, receiverId: receiverId });
    cleanup();
    navigation.goBack();
  };

  const handleEndCallFromRemote = () => {
    cleanup();
    navigation.goBack();
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
    }
  };

  const toggleSpeaker = () => {
    const newSpeakerStatus = !isSpeakerOn;
    InCallManager.setSpeakerphoneOn(newSpeakerStatus);
    setIsSpeakerOn(newSpeakerStatus);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.callerName}>
          {mode === 'caller' ? 'Calling...' : 'Incoming Call'}
        </Text>
        <Text style={styles.callStatus}>{connectionStatus}</Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.actionButton, isMuted && styles.actionButtonActive]} 
          onPress={toggleMute}
        >
          {isMuted ? <MicOff /> : <Mic />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, isSpeakerOn && styles.actionButtonActive]} 
          onPress={toggleSpeaker}
        >
          {isSpeakerOn ? <SpeakerOff /> : <Speaker />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.endCallButton} 
          onPress={handleEndCall}
        >
          <Phonecall_end />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
  },
  callerName: {
    marginTop: 10,
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  callStatus: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#666666',
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OngoingCallScreen;