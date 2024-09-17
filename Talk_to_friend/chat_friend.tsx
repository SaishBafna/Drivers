import React, {useEffect, useRef, useState} from 'react';
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
import {requestHandler} from '../utils';
import {Addfile_icon, Circle_Phone_icon, Send_icon} from '../Common/icon';
import DocumentPicker from 'react-native-document-picker';
import MessagesList from '../context/MessageItem';

const ChatFriend = ({route, navigation}: {route: any; navigation: any}) => {
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
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null,
  );
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [chats, setChats] = useState<ChatListItemInterface[]>([]);
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<ChatMessageInterface[]>(
    [],
  );
  const [isTyping, setIsTyping] = useState(false);
  const [selfTyping, setSelfTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize socket
  const initializeSocket = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;

      const socketInstance = socketio('ws://driverse.onrender.com', {
        transports: ['websocket'],
        withCredentials: true,
        auth: {token},
      });
      // console.log('Socket initialized:', socket);
      // socketInstance.on(CONNECTED_EVENT, () => console.log('SSocket Connected With ID:', socketInstance.id));
      // socketInstance.on(DISCONNECT_EVENT, () => console.log('Disconnected'));
      // socketInstance.on(MESSAGE_RECEIVED_EVENT, onMessageReceived );
      // socketInstance.on(MESSAGE_DELETE_EVENT, onMessageDelete);

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
    console.log('socket', socket);
    if (!chatId || !socket) return;
    const chat = socket.emit(JOIN_CHAT_EVENT, chatId);
    console.log(chat);
    setUnreadMessages(unreadMessages.filter(msg => msg.chat !== chatId));
    requestHandler(
      async () => await getChatMessages(chatId || ''),
      setLoadingMessages,
      res => setMessages(res.data || []),
      Alert.alert,
    );
  };

  const sendChatMessage = async () => {
    if (!message.trim() || !currentChat?._id || !socket?.id) return;

    socket.emit(STOP_TYPING_EVENT, currentChat._id);
    requestHandler(
      async () => await sendMessage(currentChat._id, message, attachedFiles),
      null,
      res => {
        setMessage('');
        setAttachedFiles([]);
        // setMessages(prev => [res.data, ...prev]);
        updateChatLastMessage(currentChat._id, res.data);
      },
      Alert.alert,
    );
  };

  const onConnect = () => {
    setIsConnected(true);
    console.log('function connect got called');
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onNewChat = (chat: ChatListItemInterface) => {
    setChats(prev => [chat, ...prev]);
  };

  const onChatLeave = (chat: ChatListItemInterface) => {
    // Check if the chat the user is leaving is the current active chat.
    if (chat._id === currentChat?._id) {
      // If the user is in the group chat they're leaving, close the chat window.
      currentChat.current = null;
      // Remove the currentChat from local storage.
      AsyncStorage.removeItem('currentChat');
    }
    // Update the chats by removing the chat that the user left.
    setChats(prev => prev.filter(c => c._id !== chat._id));
  };

  const handleOnSocketTyping = (chatId: string) => {
    // Check if the typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;
    console.log('isTyping');
    // Set the typing state to true for the current chat.
    setIsTyping(true);
  };

  const handleOnSocketStopTyping = (chatId: string) => {
    // Check if the stop typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;

    // Set the typing state to false for the current chat.
    setIsTyping(false);
  };

  const handleOnMessageChange = (text: string) => {
    setMessage(text);

    if (!socket || !isConnected || !currentChat?._id) return;

    if (!selfTyping) {
      setSelfTyping(true);
      socket.emit(TYPING_EVENT, currentChat._id); // Don't call the handler directly here
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
        console.warn('File selection canceled');
      } else {
        throw err;
      }
    }
  };

  const initiateCall = (event: GestureResponderEvent) => {
    Alert.alert('Call initiated');
  };

  useEffect(() => {
    const {chatId} = route.params;
    getChats();
    if (chatId) {
      setCurrentChat({_id: chatId});
      getMessages(chatId);
    }
  }, [route.params, socket]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping]);
  

  useEffect(() => {
    // Set up event listeners
    if (!socket) return;

    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    socket.on(NEW_CHAT_EVENT, onNewChat);
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);

    return () => {
      // Remove event listeners
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
            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}>
            {messages.map((msg, index) => (
              <MessagesList key={index} message={msg} previousMessage={messages[index - 1] || null} onDelete={deleteMessage} />
            ))}
            {isTyping && (
            <Text style={styles.typingText}>Typing...</Text>
          )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.phone_call} onPress={initiateCall}>
              <Circle_Phone_icon />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}} onPress={pickFiles}>
              <Addfile_icon />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={handleOnMessageChange}
              placeholder="Type a message..."
            />
            <TouchableOpacity style={{marginLeft: 6}} onPress={sendChatMessage}>
              <Send_icon />
            </TouchableOpacity>
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
  typingText:{
    fontSize:15,
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
