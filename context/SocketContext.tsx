
import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to establish a socket connection with authorization token
const getSocket = () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return; // Retrieve jwt token from local storage or cookie

  // Create a socket connection with the provided URI and authentication
  return socketio("https://driverse.onrender.com" {
    transports: ['websocket'],
    withCredentials: true,
    auth: { token },
  });
};

// Create a context to hold the socket instance
const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

// Custom hook to access the socket instance from the context
const useSocket = () => useContext(SocketContext);

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store the socket instance
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  // Set up the socket connection when the component mounts
  useEffect(() => {
    //@ts-ignore
    setSocket(getSocket());
  }, []);

  return (
    // Provide the socket instance through context to its children
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket };
