import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import socketio from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteMessage, sendMessage, getChatMessages} from '../Api/index';
import MessageItem from '../context/MessageItem';
import {ChatMessageInterface} from '../context/interfaces/chat';
import {requestHandler} from '../utils';
import FooterBar from '../Common/footer';
import { Addfile_icon, Circle_Phone_icon, Phonecall, Phonecall_icon, Send_icon } from '../Common/icon';
import DocumentPicker from 'react-native-document-picker';
//@ts-ignore
import {SOCKET_URI} from '@env';

const ChatFriend = ({ route, navigation }: { route: any; navigation: any }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null,
  );

  // const SOCKET_URI = process.env.SOCKET_URI;

  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const typingTimeoutRef = useRef<any>(null);

  // Function to initialize the socket
  const initializeSocket = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.warn('No authToken found in AsyncStorage');
        return;
      }

      const socketInstance = socketio(`${SOCKET_URI}`, {
        withCredentials: true,
        auth: {token},
      });

      // Set up socket event listeners
      socketInstance.on('connect', () => {
        // console.log('Socket connected:', socketInstance.id);
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

  useEffect(() => {
    initializeSocket();

    return () => {
      if (socket) {
        console.log('Cleaning up socket connection...');
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const {chatId} = route.params;

    const fetchChat = async () => {
      if (chatId) {
        setCurrentChat({_id: chatId});
        await getMessages(chatId);

        if (socket) {
          socket.emit('joinChat', chatId);
        }
      }
    };

    fetchChat();
  }, [route.params, socket]);

  const getMessages = async (chatId: string) => {
    try {
      if (chatId) {
        setLoadingMessages(true);
        const response = await getChatMessages(chatId);
        setMessages(response.data || []);
        // console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      Alert.alert('Error', 'Failed to load chat messages.');
    } finally {
      setLoadingMessages(false);
    }
  };
  // console.log("message data in chat for phone :",messages && messages.data[0]._id );

  const initiateCall = async () => {
    //@ts-ignore
    const agentId = messages && messages.data[0]._id;
    const senderId = "66d59f5ebca43975e5ec5c2e";
    if (socket) {
      socket.emit('initiateCall', {agentId, senderId});
      navigation.navigate('calling_acceptance', { agentId, senderId });
      console.log(`Call initiated from ${senderId} to ${agentId}`);
    }
  };

  

  const pickFiles = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      // console.log('Selected files:', results);
      //@ts-ignore
      setAttachedFiles(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // console.log('User cancelled the picker');
      } else {
        console.log('Unknown error:', err);
      }
    }
  };
  
  const sendChatMessage = async () => {
    // console.log('Sending message...');
    if (!currentChat?._id || !socket) return;
  
    socket.emit('stopTyping', currentChat._id);
  
    try {
      // console.log('About to send message');
      await requestHandler(
        async () => {
          // console.log('Request handler called');
          return await sendMessage(currentChat._id, message, attachedFiles);
        },
        //@ts-ignore
        null,
        () => {
          // console.log('Message sent successfully');
          setMessage('');
          setAttachedFiles([]);
          getMessages(currentChat._id);
        },
        Alert.alert
      );
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message.');
    }
  };
  
  
  const requestHandler = async (request: () => Promise<any>, onSuccess?: () => void, onSuccessCallback?: () => void, onError?: (message: string) => void) => {
    try {
      const response = await request();
      if (onSuccess) onSuccess();
      if (onSuccessCallback) onSuccessCallback();
      return response;
    } catch (error) {
      //@ts-ignore
      if (onError) onError(error.message);
      throw error;
    }
  };
  

  const handleOnMessageChange = (text: string) => {
    if (socket) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socket.emit('typing', currentChat?._id);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping', currentChat?._id);
      }, 3000);
    }
  };

  if (loadingMessages) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
<ImageBackground
    source={require('../Assets/Images/chat_background.png')} // Replace with your image path
    style={styles.outerContainer}
  >      
  {currentChat ? (
        <View style={styles.container}>
          
          <ScrollView style={styles.message_container}>
            <MessageItem message={messages} onDelete={deleteMessage} />
          </ScrollView>
        </View>
      ) : (
        <Text>No chat selected</Text>
      )}
      {currentChat ? (
        
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.phone_call} onPress={initiateCall}>
    <Circle_Phone_icon />
    </TouchableOpacity>
            <TouchableOpacity style={{marginRight:10}}  onPress={pickFiles}>
              <Addfile_icon />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={text => {
                setMessage(text);
                handleOnMessageChange(text);
              }}
              placeholder="Type a message..."
            />
            <TouchableOpacity style={{marginLeft:6}} onPress={sendChatMessage}>
              <Send_icon />
            </TouchableOpacity>
          </View>
      ) : (
        <Text>No chat selected</Text>
      )}
      {/* <FooterBar /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  phone_call:{
    // position:'absolute',
    // backgroundColor:'#000',
    // padding
    marginRight:10
  },
  message_container:{
    // flex:8,
    // marginBottom:80,
    // justifyContent: 'flex-end',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // Optionally set a background color
    // Additional styling if needed
    // marginBottom:50
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  // button: {
  //   backgroundColor: '#000',
  //   paddingHorizontal: 15,
  //   paddingVertical: 10,
  //   borderRadius: 50,
  //   marginLeft: 10,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

export default ChatFriend;