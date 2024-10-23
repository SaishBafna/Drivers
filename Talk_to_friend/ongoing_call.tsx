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
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Initializing...');
  
  const peerConnection = useRef(null);
  const streamRef = useRef(null);
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const isSocketConnected = useRef(false);

  useEffect(() => {
    if (!socket) {
      console.error('Socket is not initialized');
      setConnectionStatus('Connection error');
      return;
    }

    // Add socket connection listener
    socket.on('connect', () => {
      console.log('Socket connected');
      isSocketConnected.current = true;
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      isSocketConnected.current = false;
      setConnectionStatus('Connection lost');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket]);

  // WebRTC Configuration
  const iceServers = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
        ],
      },
      // Add your TURN server configuration here
      {
        urls: 'turn:relay1.expressturn.com:3478',
        username: 'ef98GKGS9L8H41Y6HC',
        credential: 'ijC9ZGl6vt5ztgpp'
      }
    ],
    iceCandidatePoolSize: 10,
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
    sdpSemantics: 'unified-plan',
    enableDtlsSrtp: true,
  };

  useEffect(() => {
    let setupTimeout;
    
    const initializeCall = async () => {
      try {
        console.log('Initializing call as', isCaller ? 'caller' : 'receiver');
        await setupAudioSession();
        await setupWebRTC();
        
        if (isCaller) {
          setupTimeout = setTimeout(async () => {
            try {
              await createAndSendOffer();
            } catch (err) {
              console.error('Error creating initial offer:', err);
              setConnectionStatus('Failed to start call');
            }
          }, 1000);
        }
      } catch (err) {
        console.error('Error initializing call:', err);
        setConnectionStatus('Setup failed');
      }
    };

    initializeCall();

    return () => {
      clearTimeout(setupTimeout);
      cleanup();
    };
  }, []);

  const setupAudioSession = async () => {
    try {
      await InCallManager.start({ media: 'audio', ringback: '_BUNDLE_' });
      await InCallManager.setKeepScreenOn(true);
      await InCallManager.setForceSpeakerphoneOn(false);
      
      if (Platform.OS === 'ios') {
        await InCallManager.setMicrophoneMute(false);
        await InCallManager.enableProximityMonitor(true);
      } else {
        await InCallManager.setSpeakerphoneOn(false);
      }
      
      console.log('Audio session setup complete');
    } catch (err) {
      console.error('Error setting up audio session:', err);
      throw new Error('Failed to initialize audio');
    }
  };

  const setupWebRTC = async () => {
    try {
      console.log('Setting up WebRTC...', { isCaller });
      setConnectionStatus('Setting up connection...');

      await cleanupResources();

      const pc = new RTCPeerConnection(iceServers);
      peerConnection.current = pc;

      // Set up event handlers
      setupPeerConnectionHandlers(pc);

      // Get media stream
      const stream = await mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 48000,
          sampleSize: 16
        },
        video: false
      });

      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) {
        throw new Error('No audio track available');
      }

      // Add track to peer connection
      const sender = pc.addTrack(audioTrack, stream);
      if (!sender) {
        throw new Error('Failed to add audio track');
      }

      // Configure audio transceiver
      pc.addTransceiver('audio', {
        direction: 'sendrecv',
        streams: [stream],
        sendEncodings: [{
          maxBitrate: 32000,
          priority: 'high',
          networkPriority: 'high'
        }]
      });

      streamRef.current = stream;
      setLocalStream(stream);

      // Debug handlers
      pc.onicegatheringstatechange = () => {
        console.log('ICE gathering state:', pc.iceGatheringState);
      };

      pc.onsignalingstatechange = () => {
        console.log('Signaling state:', pc.signalingState);
      };

      console.log('WebRTC setup complete');
      setConnectionStatus('Waiting for peer...');
      return pc;

    } catch (err) {
      console.error('Error in setupWebRTC:', err);
      setConnectionStatus('Failed to setup call');
      throw err;
    }
  };

  const setupPeerConnectionHandlers = (pc) => {
    pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        console.log('Sending ICE candidate');
        socket.emit('ice-candidate', {
          candidate,
          receiverId,
          callerId: userId,
        });
      }
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      console.log('Connection state changed:', state);
      setConnectionStatus(state.charAt(0).toUpperCase() + state.slice(1));
      setIsConnected(state === 'connected');

      if (state === 'failed') {
        handleConnectionFailure();
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log('ICE Connection State:', pc.iceConnectionState);
      if (pc.iceConnectionState === 'failed') {
        handleIceFailure();
      }
    };

    pc.onnegotiationneeded = async () => {
      try {
        if (makingOffer.current) return;
        makingOffer.current = true;
        await createAndSendOffer();
      } catch (err) {
        console.error('Error handling negotiationneeded:', err);
      } finally {
        makingOffer.current = false;
      }
    };

    pc.ontrack = (event) => {
      console.log('Got remote track:', event.track.kind);
      if (event.streams?.[0]) {
        console.log('Setting remote stream');
        setRemoteStream(event.streams[0]);
      }
    };
  };

  const createAndSendOffer = async () => {
    if (!peerConnection.current) {
      throw new Error('No peer connection available');
    }

    if (!socket) {
      throw new Error('Socket is not connected');
    }

    try {
      makingOffer.current = true;
      console.log('Creating offer...');
      
      const offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
        voiceActivityDetection: true
      });

      console.log('Offer created:', offer.type);

      // Set local description before sending
      console.log('Setting local description...');
      await peerConnection.current.setLocalDescription(offer);
      
      // Add timeout for ICE gathering
      const iceGatheringTimeout = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('ICE gathering timed out'));
        }, 30000); // 10 second timeout

        const checkState = () => {
          if (peerConnection.current.iceGatheringState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            setTimeout(checkState, 100);
          }
        };
        checkState();
      });

      try {
        await iceGatheringTimeout;
      } catch (error) {
        console.warn('ICE gathering timed out, sending offer anyway');
      }

      const currentOffer = peerConnection.current.localDescription;
      
      console.log('Sending offer to server...');
      socket.emit('offer', {
        offer: {
          type: currentOffer.type,
          sdp: currentOffer.sdp
        },
        callerId: userId,
        receiverId: receiverId
      }, (acknowledgement) => {
        // Add acknowledgement callback
        if (acknowledgement) {
          console.log('Offer sent successfully');
        } else {
          console.error('Failed to send offer');
          setConnectionStatus('Failed to connect');
        }
      });

    } catch (error) {
      console.error('Error in createAndSendOffer:', error);
      setConnectionStatus('Failed to create offer');
      throw error;
    } finally {
      makingOffer.current = false;
    }
  };


  useEffect(() => {
    if (!socket) return;

    const handleOffer = async (data) => {
      try {
        console.log('Received offer');
        const pc = peerConnection.current;
        if (!pc) return;

        const offerCollision = makingOffer.current || pc.signalingState !== 'stable';
        ignoreOffer.current = !isCaller && offerCollision;
        
        if (ignoreOffer.current) {
          console.log('Ignoring colliding offer');
          return;
        }

        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        
        // Modify answer SDP
        answer.sdp = answer.sdp.replace('a=inactive', 'a=sendrecv');
        
        await pc.setLocalDescription(answer);

        socket.emit('answer', {
          answer,
          receiverId: data.callerId,
          callerId: userId,
        });
      } catch (err) {
        console.error('Error handling offer:', err);
        setConnectionStatus('Failed to connect');
      }
    };

    const handleAnswer = async (data) => {
      try {
        console.log('Received answer');
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
        }
      } catch (err) {
        console.error('Error handling answer:', err);
      }
    };

    const handleIceCandidate = async (data) => {
      try {
        if (data.candidate && peerConnection.current) {
          console.log('Adding ICE candidate');
          await peerConnection.current.addIceCandidate(data.candidate);
        }
      } catch (err) {
        console.error('Error handling ICE candidate:', err);
      }
    };

    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleIceCandidate);
    socket.on('endCall', handleEndCallFromRemote);

    return () => {
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleIceCandidate);
      socket.off('endCall', handleEndCallFromRemote);
    };
  }, [socket]);

  const handleConnectionFailure = async () => {
    console.log('Handling connection failure');
    try {
      await cleanupResources();
      await setupWebRTC();
      setConnectionStatus('Reconnecting...');
    } catch (err) {
      console.error('Error handling connection failure:', err);
      setConnectionStatus('Connection failed');
    }
  };

  const handleIceFailure = async () => {
    console.log('Handling ICE failure');
    try {
      if (peerConnection.current) {
        await createAndSendOffer();
      }
    } catch (err) {
      console.error('Error handling ICE failure:', err);
    }
  };

  const cleanupResources = async () => {
    console.log('Cleaning up resources...');
    
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log('Stopped track:', track.kind);
        });
        streamRef.current = null;
      }

      if (peerConnection.current) {
        const senders = peerConnection.current.getSenders();
        for (const sender of senders) {
          try {
            await peerConnection.current.removeTrack(sender);
          } catch (err) {
            console.warn('Error removing track:', err);
          }
        }

        peerConnection.current.close();
        peerConnection.current = null;
      }

      if (Platform.OS === 'ios') {
        InCallManager.stop();
        InCallManager.enableProximityMonitor(false);
      } else {
        InCallManager.stop();
      }

      setLocalStream(null);
      setRemoteStream(null);
      
    } catch (err) {
      console.error('Error in cleanup:', err);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
        if (Platform.OS === 'ios') {
          InCallManager.setMicrophoneMute(!track.enabled);
        }
      });
    }
  };

  const toggleSpeaker = () => {
    const newSpeakerStatus = !isSpeakerOn;
    InCallManager.setForceSpeakerphoneOn(newSpeakerStatus);
    setIsSpeakerOn(newSpeakerStatus);
  };

  const handleEndCall = () => {
    socket.emit('endCall', {
      callerId: mode === 'caller' ? userId : receiverId,
      receiverId: mode === 'caller' ? receiverId : userId,
    });
    cleanup();
    navigation.goBack();
  };

  const handleEndCallFromRemote = () => {
    cleanup();
    navigation.goBack();
  };

  const cleanup = async () => {
    await cleanupResources();
  };
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.callerName}>
          {mode === 'caller' ? 'Unknown Receiver' : 'Unknown Caller'}
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

