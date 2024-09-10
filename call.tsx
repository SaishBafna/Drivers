import React, { useEffect, useRef, useState } from "react";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from "react-native-webrtc";
import io from "socket.io-client";
import { View, Button, Text } from "react-native";

const WebRTCComponent = ({ userId }) => {
  const socketRef = useRef();
  const peerConnectionRef = useRef();
  const [isCalling, setIsCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [callerId, setCallerId] = useState(null);

  useEffect(() => {
    // Connect to the signaling server
    socketRef.current = io("http://your-server-ip:3000");

    // Join the socket server with the userId
    socketRef.current.emit("join", { userId });

    // Handle incoming call
    socketRef.current.on("incomingCall", handleIncomingCall);

    // Handle accepted call
    socketRef.current.on("callAccepted", handleCallAccepted);

    // Handle rejected call
    socketRef.current.on("callRejected", handleCallRejected);

    // Handle ended call
    socketRef.current.on("callEnded", handleCallEnded);

    return () => {
      // Cleanup on component unmount
      socketRef.current.disconnect();
    };
  }, [userId]);

  // Handle incoming call
  const handleIncomingCall = ({ callerId }) => {
    setCallerId(callerId);
    setIsReceivingCall(true);
  };

  // Handle call acceptance
  const handleCallAccepted = async ({ socketId }) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(socketId));
    setIsCalling(false);
  };

  // Handle call rejection
  const handleCallRejected = () => {
    console.log("Call was rejected");
    setIsCalling(false);
  };

  // Handle call ended
  const handleCallEnded = () => {
    console.log("Call ended");
    endCall();
  };

  // Initiate a call
  const initiateCall = async (receiverId) => {
    const localStream = await getLocalStream();
    peerConnectionRef.current = createPeerConnection(localStream);
    setIsCalling(true);

    // Create an offer
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    // Send the offer to the receiver via the socket
    socketRef.current.emit("call", { callerId: userId, receiverId });
  };

  // Accept incoming call
  const acceptCall = async () => {
    const localStream = await getLocalStream();
    peerConnectionRef.current = createPeerConnection(localStream);
    setIsReceivingCall(false);

    // Send an answer to the caller
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socketRef.current.emit("acceptCall", { callerId, receiverId: userId });
  };

  // Reject incoming call
  const rejectCall = () => {
    socketRef.current.emit("rejectCall", { callerId, receiverId: userId });
    setIsReceivingCall(false);
  };

  // End call
  const endCall = () => {
    peerConnectionRef.current.close();
    socketRef.current.emit("endCall", { callerId: userId, receiverId: callerId });
    setIsCalling(false);
    setIsReceivingCall(false);
  };

  // Create peer connection and handle ICE candidates
  const createPeerConnection = (localStream) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local stream tracks to peer connection
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", event.candidate);
      }
    };

    // Handle receiving tracks
    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      // Attach remoteStream to UI component to play the incoming audio
    };

    return peerConnection;
  };

  // Get local audio stream
  const getLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({ audio: true });
    return stream;
  };

  return (
    <View>
      {isReceivingCall && (
        <View>
          <Text>Incoming call from {callerId}</Text>
          <Button title="Accept" onPress={acceptCall} />
          <Button title="Reject" onPress={rejectCall} />
        </View>
      )}
      {!isCalling && (
        <Button title="Start Call" onPress={() => initiateCall("receiver-id")} />
      )}
      {isCalling && <Button title="End Call" onPress={endCall} />}
    </View>
  );
};

export default WebRTCComponent;
