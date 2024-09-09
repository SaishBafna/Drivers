// ChatItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatListItemInterface } from './interfaces/chat';

interface ChatItemProps {
  chat: ChatListItemInterface;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{chat.name}</Text>
      <Text style={styles.lastMessage}>{chat.lastMessage?.content}</Text>
      <Text style={styles.timestamp}>{new Date(chat.updatedAt).toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#888',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default ChatItem;
