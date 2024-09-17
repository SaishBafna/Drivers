import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//@ts-ignore
const MessageItem = ({ message, previousMessage }) => {
  const [userId, setUserId] = useState<string | null>(null);

  // ScrollView ref with proper typing
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are rendered
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [message]); // Rerun effect when a new message is passed

  if (!message) return null; // Handle case when message is not passed

  // Extract and format the date of the current message
  const messageDate = new Date(message.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const messageTime = new Date(message.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Extract and format the date of the previous message (if it exists)
  const previousMessageDate = previousMessage
    ? new Date(previousMessage.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  // Check if the date is the same as the previous message's date
  const showDate = previousMessageDate !== messageDate;

  return (
    <ScrollView
    ref={scrollViewRef}
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' ,marginBottom:10}}
    >
      {showDate && (
        <View style={{ alignItems: 'center', marginVertical: 5 }}>
          <Text>{messageDate}</Text>
        </View>
      )}
      <View>
        <View
          style={
            message.sender && message.sender._id === userId
              ? styles.sender
              : styles.receiver
          }
        >
          <View
            style={
              message.sender && message.sender._id === userId
                ? styles.receiverEdge_right
                : styles.receiverEdge
            }
          />
          <Text
            style={{
              color: message.sender && message.sender._id === userId ? '#fff' : '#000',
            }}
          >
            {message.content}
          </Text>
        </View>
        <Text
          style={
            message.sender && message.sender._id === userId
              ? styles.time
              : styles.receiver_time
          }
        >
          {messageTime}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
    color: '#000',
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
  },
  message: {
    fontWeight: '500',
    color: '#000',
  },
  time: {
    fontSize: 8,
    color: '#000',
    textAlign: 'right',
  },
  receiver_time: {
    fontSize: 8,
    color: '#000',
    textAlign: 'left',
  },
  receiverEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 10,
    height: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    transform: [{ rotate: '-90deg' }],
  },
  receiverEdge_right: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 15,
    backgroundColor: '#000',
    borderTopRightRadius: 10,
    transform: [{ rotate: '90deg' }],
  },
});

export default MessageItem;
