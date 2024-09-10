import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ChatMessageInterface} from './interfaces/chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

// interface MessageItemProps {
//   message: ChatMessageInterface;
//   onDelete: (message: ChatMessageInterface) => void;
// }
//@ts-ignore
const MessageItem = ({message, onDelete}) => {
  const [userId, setUserId] = useState(null);
  const [messages1, setMessage] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      // console.log(id);
      //@ts-ignore
      setUserId(id);
    };

    setMessage(message);

    fetchUserId();
  }, []);
  // console.log('message is:', messages1 && messages1.data);
  // console.log('user id is:', userId);
  let lastDisplayedDate: string | null = null; // Track the last displayed date

  return (
    <View style={styles.container}>
      {messages1 && 
      //@ts-ignore
        messages1.data.map(
          (
            message: {
              createdAt: string | number | Date;
              sender: {_id: null};
              content:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined,
          ) => {
            // Extract and format the date
            const messageDate = new Date(message.createdAt).toLocaleDateString(
              'en-US',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            );

            // Check if the date should be shown
            const shouldShowDate = messageDate !== lastDisplayedDate;

            if (shouldShowDate) {
              lastDisplayedDate = messageDate; // Update the last displayed date
            }

            return (
              <React.Fragment key={index}>
                {shouldShowDate && (
                  <View style={{alignItems: 'center', marginVertical: 5}}>
                    <Text>{messageDate}</Text>
                  </View>
                )}
                <View>
                  <View
                    style={
                      message.sender && message.sender._id === userId
                        ? styles.sender
                        : styles.receiver
                    }>
                      <View style={message.sender && message.sender._id === userId
                        ? styles.receiverEdge_right : styles.receiverEdge} />
                    <Text
                      style={{
                        color:
                          message.sender && message.sender._id === userId
                            ? '#fff'
                            : '#000',
                      }}>
                      {message.content}
                    </Text>
                  </View>
                  <Text
                    style={
                      message.sender && message.sender._id === userId
                        ? styles.time
                        : styles.receiver_time
                    }>
                    {new Date(message.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </Text>
                </View>
              </React.Fragment>
            );
          },
        )}
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
    maxWidth:'80%'
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
    color: '#000',
    borderRadius: 10,
    margin: 5,
    maxWidth:'80%'
  },
  message: {
    fontWeight: '500',
    color: '#000',
  },
  time: {
    fontSize: 8,
    color: '#000',
    textAlign: 'right',
    // color: 'white',
  },
  receiver_time: {
    fontSize: 8,
    color: '#000',
    textAlign: 'left',
  },
  deleteButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
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
    // left: 0,
    right:0,
    width: 10,
    height: 15,
    backgroundColor: '#000',
    borderTopRightRadius: 10,
    transform: [{ rotate: '90deg' }],
  },
});

export default MessageItem;
