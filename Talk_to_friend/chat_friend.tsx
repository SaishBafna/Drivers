import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  GestureResponderEvent,
  Alert,
  ActivityIndicator,
} from 'react-native';
import socketio from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteMessage,
  sendMessage,
  getChatMessages,
  getUserChats,
} from '../Api/index';
import MessageItem from '../context/MessageItem';
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from '../context/interfaces/chat';
import { requestHandler } from '../utils';
import { Addfile_icon, Circle_Phone_icon, Send_icon } from '../Common/icon';
import DocumentPicker from 'react-native-document-picker';
import MessagesList from '../context/MessageItem';
import LoaderKit from 'react-native-loader-kit';

const ChatFriend = ({ route, navigation }: { route: any; navigation: any }) => {
  const CONNECTED_EVENT = 'connect';
  const DISCONNECT_EVENT = 'disconnect';
  const JOIN_CHAT_EVENT = 'joinChat';
  const NEW_CHAT_EVENT = 'newChat';
  const LEAVE_CHAT_EVENT = 'leaveChat';
  const MESSAGE_RECEIVED_EVENT = 'messageReceived';
  const TYPING_EVENT = 'typing';
  const STOP_TYPING_EVENT = 'stopTyping';
  const MESSAGE_DELETE_EVENT = 'messageDeleted';

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [chats, setChats] = useState<ChatListItemInterface[]>([]);
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<ChatMessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selfTyping, setSelfTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [agentid, setAgent_ID] = useState('');
  const [callstatus, setCallStatus] = useState('');
  // Initialize socket
  const initializeSocket = async () => {
    try {
      const { AgentID } = route.params;
      setAgent_ID(AgentID);
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;

      const socketInstance = socketio('https://drivers-server-7gl0.onrender.com/', {
        transports: ['websocket'],
        withCredentials: true,
        auth: { token },
      });

      setSocket(socketInstance);
    } catch (error) {
      Alert.alert('Error', 'Socket initialization failed');
    }
  };

  useEffect(() => {
    initializeSocket();
    return () => {
      socket?.disconnect();
    };
  }, []);

  const getChats = async () => {
    requestHandler(
      async () => await getUserChats(),
      null,
      res => setChats(res.data || []),
      Alert.alert,
    );
  };

  const getMessages = async (chatId: any) => {
    if (!chatId || !socket) return;
    const chat = socket.emit(JOIN_CHAT_EVENT, chatId);
    setUnreadMessages(unreadMessages.filter(msg => msg.chat !== chatId));
    requestHandler(
      async () => await getChatMessages(chatId || ''),
      setLoadingMessages,
      res => setMessages(res.data || []),
      Alert.alert,
    );
  };

  const sendChatMessage = async () => {
    setLoading(true);
    if (!message.trim() || !currentChat?._id || !socket?.id) return;

    socket.emit(STOP_TYPING_EVENT, currentChat._id);
    requestHandler(
      async () => await sendMessage(currentChat._id, message, attachedFiles),
      null,
      res => {
        setMessage('');
        setAttachedFiles([]);
        updateChatLastMessage(currentChat._id, res.data);
        setLoading(false);
      },
      Alert.alert,
    );
  };

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onNewChat = (chat: ChatListItemInterface) => {
    setChats(prev => [chat, ...prev]);
  };

  const onChatLeave = (chat: ChatListItemInterface) => {
    if (chat._id === currentChat?._id) {
      currentChat.current = null;
      AsyncStorage.removeItem('currentChat');
    }
    setChats(prev => prev.filter(c => c._id !== chat._id));
  };

  const handleOnSocketTyping = (chatId: string) => {
    if (chatId !== currentChat?._id) return;
    setIsTyping(true);
  };

  const handleOnSocketStopTyping = (chatId: string) => {
    if (chatId !== currentChat?._id) return;
    setIsTyping(false);
  };

  const handleOnMessageChange = (text: string) => {
    setMessage(text);

    if (!socket || !isConnected || !currentChat?._id) return;

    if (!selfTyping) {
      setSelfTyping(true);
      socket.emit(TYPING_EVENT, currentChat._id);
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit(STOP_TYPING_EVENT, currentChat._id);
      setSelfTyping(false);
    }, 3000);
  };

  const onMessageReceived = (message: ChatMessageInterface) => {
    if (!message?.chat || !currentChat?._id) return;

    if (message.chat !== currentChat._id) {
      setUnreadMessages(prevMessages =>
        prevMessages.some(msg => msg._id === message._id)
          ? prevMessages
          : [...prevMessages, message],
      );
    } else {
      setMessages(prevMessages =>
        prevMessages.some(msg => msg._id === message._id)
          ? prevMessages
          : [...prevMessages, message],
      );
    }
  };

  const onMessageDelete = (message: ChatMessageInterface) => {
    setMessages(prev => prev.filter(msg => msg._id !== message._id));
    updateChatLastMessageOnDeletion(message.chat, message);
  };

  const updateChatLastMessage = (
    chatId: string,
    message: ChatMessageInterface,
  ) => {
    if (socket) {
      socket.emit(MESSAGE_RECEIVED_EVENT, onMessageReceived(message));
    }

    const chatToUpdate = chats.find(chat => chat._id === chatId);
    if (chatToUpdate) {
      chatToUpdate.lastMessage = message;
      chatToUpdate.updatedAt = message?.updatedAt;
      setChats([chatToUpdate, ...chats.filter(chat => chat._id !== chatId)]);
    }
  };

  const updateChatLastMessageOnDeletion = (
    chatId: string,
    message: ChatMessageInterface,
  ) => {
    const chatToUpdate = chats.find(chat => chat._id === chatId);
    if (chatToUpdate?.lastMessage?._id === message._id) {
      requestHandler(
        async () => await getChatMessages(chatId),
        null,
        req => {
          chatToUpdate.lastMessage = req.data[0];
          setChats([...chats]);
        },
        Alert.alert,
      );
    }
  };

  const pickFiles = async (event: GestureResponderEvent) => {
    try {
      const result = await DocumentPicker.pickMultiple();
      setAttachedFiles(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const join_call = async () => {
    if (!socket) return;

    const user_id = await AsyncStorage.getItem('user_id');
    // setUserID(user_id);

    socket.emit('join', { userId: user_id }); // Send as object with userId property
  }

  const initiateCall = async (id: string) => {
    if(!socket) return;
    const userId = await AsyncStorage.getItem('user_id');

    socket.emit('call',{callerId: userId,receiverId: agentid});
    navigation.navigate('calling', {
      mode: 'Voice',
      caller: 'me',
      receiver: 'abc',
      socket: socket,
      user_id: userId,
      receiver_id: agentid,
    });
  };

  const handleIncomingCall = async (callerId: any) => {
    if ( !socket) return;
    // socket.on('playCallerTune', handlecallertune);
    const userId = await AsyncStorage.getItem('user_id');
    navigation.navigate('calling_acceptance', {socket: socket, agent_id: agentid, user_id:userId});
    setCallStatus('incoming');

   


  };

  useEffect(() => {
    const { chatId } = route.params;
    getChats();
    if (chatId) {
      setCurrentChat({ _id: chatId });
      getMessages(chatId);
    }
  }, [route.params, socket]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!socket) return;
    join_call();
    socket.on('incomingCall', handleIncomingCall);

    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    socket.on(NEW_CHAT_EVENT, onNewChat);
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);

    return () => {
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(MESSAGE_DELETE_EVENT, onMessageDelete);
    };
  }, [socket, chats]);

  return (
    <ImageBackground
      source={require('../Assets/Images/chat_background.png')}
      style={styles.outerContainer}>
      {currentChat ? (
        <View style={styles.container}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.message_container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            {loadingMessages && (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <LoaderKit
                  style={{ width: 50, height: 50 }}
                  name={'BallPulseSync'}
                  color={'black'}
                />
              </View>
            )}
            {messages.map((msg, index) => (
              <MessagesList
                key={index}
                message={msg}
                previousMessage={messages[index - 1] || null}
                onDelete={deleteMessage}
              />
            ))}
            {isTyping && <Text style={styles.typingText}>Typing...</Text>}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity 
              style={styles.phone_call} 
              onPress={() => initiateCall(agentid)}
            >
              <Circle_Phone_icon />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={pickFiles}>
              <Addfile_icon />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={handleOnMessageChange}
              placeholder="Type a message..."
            />
            {loading ? (
              <ActivityIndicator size={'large'} color={'#000'} />
            ) : (
              <TouchableOpacity style={{ marginLeft: 6 }} onPress={sendChatMessage}>
                <Send_icon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <Text>No chat selected</Text>
      )}
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
    justifyContent: 'flex-end',
  },
  phone_call: {
    marginRight: 10,
  },
  message_container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  typingText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
    color: '#000',
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
  },
});

export default ChatFriend;