import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../apiClient';


// API functions for different actions
const getAvailableUsers = () => {
  return apiClient.get('/chats/users');
};

const getUserChats = () => {
  return apiClient.get('/chats');
};

const createUserChat = (receiverId: string) => {
  return apiClient.post(`/chats/c/${receiverId}`);
};

const deleteOneOnOneChat = (chatId: string) => {
  return apiClient.delete(`/chats/remove/${chatId}`);
};

const getChatMessages = (chatId: string) => {
  return apiClient.get(`/messages/${chatId}`);
};

const sendMessage = async (chatId: string, content: string, attachments: File[]) => {
  const formData = new FormData();
  if (content) {
    formData.append('content', content);
  }
  attachments.forEach((file) => {
    formData.append('attachments', {
      uri: file.uri, // Use file.uri for React Native
      type: file.type || 'application/octet-stream',
      name: file.name || 'file',
    });
  });

  console.log(formData);

  try {
    const response = await apiClient.post(`/messages/${chatId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error; // Rethrow error to be handled by calling function
  }
};


const deleteMessage = (chatId: string, messageId: string) => {
  return apiClient.delete(`/messages/${chatId}/${messageId}`);
};

// Export all the API functions
export {
  createUserChat,
  deleteOneOnOneChat,
  getAvailableUsers,
  getChatMessages,
  getUserChats,
  sendMessage,
  deleteMessage,
};
