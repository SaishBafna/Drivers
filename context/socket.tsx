import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

// Function to establish a socket connection with authorization token
const getSocket = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken'); // Retrieve jwt token from local storage or cookie

    if (!token) {
      console.warn("No authToken found in AsyncStorage");
      return null;
    }

    console.log("AuthToken retrieved:", token);

    // Create a socket connection with the provided URI and authentication
    const socketInstance = socketio('https://driverse.onrender.com', {
      withCredentials: true,
      auth: { token },
    });

    console.log("Socket instance created:", socketInstance);

    return socketInstance;
  } catch (error) {
    console.error("Error in getSocket:", error);
    return null;
  }
};

// Create a context to hold the socket instance
const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

// Custom hook to access the socket instance from the context
const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    console.error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const initializeSocket = async () => {
      const socketInstance = await getSocket();
      if (socketInstance) {
        setSocket(socketInstance);
        setLoading(false); // Set loading to false when done

        socketInstance.on("connect", () => {
          console.log("Socket connected:", socketInstance.id);
        });

        socketInstance.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
        });

        socketInstance.on("disconnect", () => {
          console.log("Socket disconnected");
        });
      } else {
        console.warn("Socket not initialized. Possible issue with token retrieval or socket creation.");
        setLoading(false); // Set loading to false even on failure
      }
    };

    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Or any other loading indicator
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};


// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket };
