import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import PushNotification, { Importance } from "react-native-push-notification";

// Initialize notification channel for Android
const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "drivers123",
      channelName: "Driver Notifications",
      channelDescription: "Channel for driver notifications",
      playSound: true,
      soundName: "default",
      importance: Importance.HIGH,
      vibrate: true,
    },
    (created) => console.log(`Channel created: ${created}`)
  );
};

// Configure PushNotification
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export async function requestUserPermission() {
  try {
    let permissionGranted = false;

    if (Platform.OS === 'android') {
      // Create notification channel for Android
      createNotificationChannel();
      
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'This app needs access to your notifications to send alerts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        permissionGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        permissionGranted = true;
      }
    } else if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      permissionGranted =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }

    if (permissionGranted) {
      console.log('Notification permissions granted');
      const token = await getFCMToken();
      setupNotificationListeners();
      return token;
    } else {
      console.log('Notification permissions denied');
      Alert.alert('Notification Permissions', 'Notification permissions were denied.');
      return null;
    }
  } catch (error) {
    console.error('Failed to get notification permission:', error);
    return null;
  }
}

const getFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('Fetched FCM token:', fcmtoken);
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log('Error fetching FCM token:', error);
    }
  }
  return fcmtoken;
};

const setupNotificationListeners = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('A new foreground notification arrived:', remoteMessage);
    
    // Enhanced foreground notification handling
    const notificationData = {
      channelId: 'drivers123',
      title: remoteMessage.notification?.title || 'Notification',
      message: remoteMessage.notification?.body || 'You have a new message',
      playSound: true,
      soundName: 'default',
      priority: 'high',
      importance: Importance.HIGH,
      vibrate: true,
      // Add these for better visibility
      autoCancel: true,
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      // Pass through any additional data
      userInteraction: false,
      data: remoteMessage.data,
    };
    //@ts-ignore
    PushNotification.localNotification(notificationData);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Notification handled in the background:', remoteMessage);
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('Notification caused app to open from quit state:', remoteMessage);
    }
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background:', remoteMessage);
  });
};