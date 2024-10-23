import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import apiClient from '../apiClient';
import WaveLoader, { Phonecall, Phonecall_white } from '../Common/icon';
import FooterBar from '../Common/footer';
import socketio from 'socket.io-client';
import { SOCKET_URI } from '@env';
import LoaderKit from 'react-native-loader-kit';
import ringtonePath from '../Assets/Sounds/rington.mp3';
import callerTunePath from '../Assets/Sounds/caller.mp3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

export const Friends = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          console.warn('No authToken found in AsyncStorage');
          return;
        }

        const socketInstance = socketio(SOCKET_URI, {
          transports: ['websocket'],
          withCredentials: true,
          auth: { token },
        });

        socketInstance.on('connect', () => {
          console.log('Socket connected:', socketInstance.id);
        });

        socketInstance.on('connect_error', error => {
          console.error('Socket connection error:', error);
          Alert.alert('Error', 'Failed to connect to the server.');
        });

        socketInstance.on('disconnect', () => {
          console.log('Socket disconnected');
        });

        setSocket(socketInstance);
      } catch (error) {
        console.error('Error initializing socket:', error);
        Alert.alert('Error', 'Failed to initialize socket connection.');
      }
    };

    initializeSocket();

    return () => {
      if (socket) {
        console.log('Cleaning up socket connection...');
        socket.disconnect();
      }
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('chats/agents');
      setData(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const createOrOpenChat = async (id, name, profile) => {
    console.log(id);
    try {
      const response = await apiClient.post(`chats/c/${id}`);
      const chat = response.data.data;
      console.log(response.data.data);
      // LocalStorage.set('currentChat', chat);
      navigation.navigate('Chat', {
        chatId: chat._id,
        friendName: name,
        AgentID: id,
        ProfileImage: profile,
      });
    } catch (error) {
      console.error('Error creating or opening chat:', error);
    }
  };

  const initiateCall = async (id, username, url) => {
    if (!socket) {
      console.error('Socket is not initialized');
      return;
    }
  
    try {
      const callerid = await AsyncStorage.getItem('user_id');
  
      // Notify the server to initiate the call
      socket.emit('call', { callerId: callerid, receiverId: id });
      console.log('Call initiated:', { callerId: callerid, receiverId: id });
  
      // playCallerTune();
  
      // Handle incoming call event
      socket.on('incomingCall', ({ callerId }) => {
        // playRingtone();
        showIncomingCallUI(callerId, url);
        navigation.navigate('calling_acceptance');
      });
    } catch (error) {
      console.error('Error initiating call:', error);
    }
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
      tuneRef.current.play((success: any) => {
        if (!success) {
          console.error('Playback failed due to audio decoding errors');
        }
      });
    });
  };
  

  const playCallerTune = () => {
    playTune('', callerTunePath);
  };
  
  const playRingtone = () => {
    playTune('', ringtonePath);
  };

  const showIncomingCallUI = (callerId, url) => {
    // Navigate to the calling screen or show incoming call UI
    navigation.navigate('CallingScreen', {
      mode: 'receiver',
      caller: { id: callerId },
      receiver: { id: url },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoaderKit
              style={{ width: 50, height: 50 }}
              name={'BallPulseSync'}
              color={'black'}
            />
          </View>
        ) : (
          data.map(friend => (
            <React.Fragment key={friend._id}>
              <TouchableOpacity
                style={styles.friend_container}
                onPress={() =>
                  createOrOpenChat(
                    friend._id,
                    friend.username,
                    friend.avatar?.url,
                  )
                }>
                <View style={styles.friendsub_container}>
                  <View style={styles.img_container}>
                    {friend.avatar?.url ? (
                      <Image
                        source={{ uri: friend.avatar?.url }}
                        style={styles.profileImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={require('../Assets/Images/profile.png')}
                        style={styles.profileImage}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <View style={styles.name_container}>
                    <Text style={styles.name}>{friend.username}</Text>
                    <Text style={styles.date_time}>
                      {new Date(friend.updatedAt).toLocaleString()}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    initiateCall(
                      friend._id,
                      friend.username,
                      friend.avatar?.url,
                    )
                  }>
                  <Phonecall_white />
                  <Text style={styles.buttonText}>Call Me</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <View style={styles.hrline} />
            </React.Fragment>
          ))
        )}
      </View>
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friend_container: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendsub_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    color: '#000',
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
  img_container: {
    height: 60,
    padding: 2,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  name_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 17,
    color: '#000',
  },
  button: {
    backgroundColor: '#06D001',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  hrline: {
    width: '100%',
    height: 0.3,
    backgroundColor: '#D3D3D3',
  },
  date_time: {
    fontSize: 10,
  },
});
