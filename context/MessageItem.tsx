import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//@ts-ignore
const MessageItem = ({ message, onDelete }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      setUserId(id);
    };

    fetchUserId();
  }, []);

  if (!message) return null; // Handle case when message is not passed

  // Extract and format the date
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

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginVertical: 5 }}>
        <Text>{messageDate}</Text>
      </View>
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
    </View>
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
