import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import apiClient from '../apiClient';
import WaveLoader, {Phonecall, Phonecall_white} from '../Common/icon';
import FooterBar from '../Common/footer';
// import {useSocket} from '../context/socket';
import {LocalStorage} from '../utils';
import socketio from 'socket.io-client';
import {SOCKET_URI} from '@env';


import AsyncStorage from '@react-native-async-storage/async-storage';

export const Friends = ({navigation}: {navigation: any}) => {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  // const initializeSocket = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('authToken');
  //     if (!token) {
  //       console.warn('No authToken found in AsyncStorage');
  //       return;
  //     }

  //     const socketInstance = socketio('https://driverse.onrender.com', {
  //       transports: ['websocket'] ,
  //       withCredentials: true,
  //       auth: {token},
        
  //     });

  //     // Set up socket event listeners
  //     socketInstance.on('connect', () => {
  //       console.log('Socket connected:', socketInstance.id);
  //     });

  //     socketInstance.on('connect_error', error => {
  //       console.error('Socket connection error:', error);
  //       Alert.alert('Error', 'Failed to connect to the server.');
  //     });

  //     socketInstance.on('disconnect', () => {
  //       console.log('Socket disconnected');
  //     });

  //     setSocket(socketInstance);
  //   } catch (error) {
  //     console.error('Error initializing socket:', error);
  //     Alert.alert('Error', 'Failed to initialize socket connection.');
  //   }
  // };

  // useEffect(() => {
  //   initializeSocket();

  //   return () => {
  //     if (socket) {
  //       console.log('Cleaning up socket connection...');
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('chats/agents');
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const createOrOpenChat = async (id: string, name: string) => {
    try {
      const response = await apiClient.post(`chats/c/${id}`);
      const chat = response.data.chat;
      console.log(chat, chat.participants[0])
      // Store chat info and navigate to chat room with the friend's name
      LocalStorage.set('currentChat', chat);
      navigation.navigate('Chat', { chatId: chat._id, friendName: name, AgentID: id });
  
      // Notify server about the new chat
      // if (socket) {
      //   socket.emit('joinChat', chat._id);
      // }
    } catch (error) {
      console.error('Error creating or opening chat:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.outerContainer}>
      {/* <Text style={styles.heading}>
        Having any query? Let's talk to a friend
      </Text> */}
      <View style={styles.container}>
        {loading ? (<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <WaveLoader size={20} darkColor="#000000" lightColor="gray" />
          </View>
        ) : (
          data.map(friend => (
            <React.Fragment key={friend._id}>
              <TouchableOpacity
                style={styles.friend_container}
                onPress={() => createOrOpenChat(friend._id, friend.username)}>
                <View style={styles.friendsub_container}>
                  <View style={styles.img_container}>
                    <Image
                      source={require('../Assets/Images/profile.png')}
                      style={styles.profileImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.name_container}>
                    <Text style={styles.name}>{friend.username}</Text>
                    <Text style={styles.date_time}>{new Date(friend.updatedAt).toLocaleString()}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.button}>
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
    backgroundColor:'#fff'
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
    backgroundColor: 'black',
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
  hrline:{
    width: '100%', // Full width of the container or adjust as needed
    height: 0.3,
    backgroundColor: '#D3D3D3',
  },
  date_time:{
    fontSize:10
  },
});
