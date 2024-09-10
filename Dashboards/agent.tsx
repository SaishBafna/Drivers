import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MaterialSymbolsSearch,
  MdiClockOutline,
  Phonecall_white,
  Rightarrow,
} from '../Common/icon';
import FooterBar from '../Common/footer';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketio from 'socket.io-client';
//@ts-ignore
import {SOCKET_URI} from '@env';

export const Agent = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [selectedValue, setSelectedValue] = useState('Now');
  const [isAvailable, setIsAvailable] = useState(false);
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null,
  );
  // const initializeSocket = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('authToken');
  //     if (!token) {
  //       console.warn('No authToken found in AsyncStorage');
  //       return;
  //     }

  //     const socketInstance = socketio(`${SOCKET_URI}`, {
  //       withCredentials: true,
  //       auth: { token },
  //     });

  //     // Listen for the incoming call event
  //     socketInstance.on('acceptCall', (data) => {
  //       console.log('Incoming call data:', data);
  //       // Redirect to calling_acceptance screen
  //       props.navigation.navigate('calling_acceptance', { caller: data.caller });
  //     });

  //     socketInstance.on('connect', () => {
  //       console.log('Socket connected:', socketInstance.id);
  //     });

  //     socketInstance.on('connect_error', (error) => {
  //       console.error('Socket connection error:', error);
  //       Alert.alert('Error', 'Failed to connect to the server.');
  //     });

  //     socketInstance.on('disconnect', () => {
  //       console.log('Socket disconnected');
  //     });

  //     setSocket(socketInstance);
  //   } catch (error) {
  //     console.error('Error initializing socket:', error);
  //     Alert.alert('Error', 'Failed to initialize socket connection.');
  //   }
  // };

  // useEffect(() => {
  //   initializeSocket();

  //   return () => {
  //     if (socket) {
  //       console.log('Cleaning up socket connection...');
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  const toggleSwitch = () => setIsAvailable(previousState => !previousState);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.check_boxcontainer}>
        <Text style={styles.text}>I am available</Text>
      <Switch
        trackColor={{ false: '#d3d3d3', true: '#80d4a5' }} // Background for off/on
        thumbColor={isAvailable ? '#ffffff' : '#f4f3f4'} // Knob color
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isAvailable}
        style={styles.toggleSwitch}
      />
      <Text style={styles.statusText}>
        {isAvailable ? 'Online' : 'Offline'}
      </Text>
        </View>
        {/* <View style={styles.searchContainer}>
          <MaterialSymbolsSearch />
          <TextInput
            style={styles.input}
            placeholder="Where to?"
            placeholderTextColor="#888"
          />
          <View style={styles.nowContainer}>
            <MdiClockOutline />
            <Picker
              selectedValue={selectedValue}
              style={styles.nowText}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Now" value="Now" />
              <Picker.Item label="Yestraday" value="Yestraday" />
              <Picker.Item label="Tomorrow" value="Tomorrow" />
            </Picker>
          </View>
        </View> */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../Assets/Images/discount.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.topLeftTextContainer}>
            <Text style={[styles.text, styles.boldText]}>Finalize Payment:</Text>
            <Text style={[styles.text, styles.boldText]}>Rs.170.71</Text>
          </View>
          <View style={styles.bottomLeftTextContainer}>
            <Text style={styles.text}>Pay</Text>
            <Rightarrow />
          </View>
        </View>
        <View style={styles.service_section}>
          <Text style={styles.service_text}>Recent Call/Chats</Text>
          <TouchableOpacity>
            <Text style={styles.buttonText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.service_container}>
          <TouchableOpacity
            style={styles.service_item}
            // onPress={() => props.navigation.navigate('Mechanic_home')}
          >
             <View style={styles.friendsub_container}>
                  <View style={styles.img_container}>
                    <Image
                      source={require('../Assets/Images/profile.png')}
                      style={styles.profileImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.name_container}>
                    <Text style={styles.name}>Aryan</Text>
                    <Text style={styles.date_time}>05/09/24 5:12 PM</Text>
                  </View>
                 
                </View>
                <TouchableOpacity style={styles.button}>
                  {/* <Phonecall_white /> */}
                  <Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>Ping</Text>
                </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 16,
    // alignItems: 'center',
  },

  //check box conatiner
  check_boxcontainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:10,
    marginBottom:20
},
toggleSwitch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Enlarge the switch
    marginHorizontal: 10,
  },
  statusText: {
    fontSize: 18,
    color: '#808080',
    marginRight: 10,
  },

  //searchBar Designs
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  nowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginVertical: 5,
    marginLeft: 15,
    height: 40,
  },
  nowText: {
    height: 30,
    flex: 1,
  },

  //Image designs
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 139,
    borderRadius: 15,
  },
  topLeftTextContainer: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 15,
    left: 20,
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },

  //service_section designs
  service_section: {
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
  },
  service_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    // fontWeight:'bold'
  },

  //service_container designs
  service_container: {
    marginBottom: 10,
    width: '100%',
    // flexDirection: 'col',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 5,
  },
  service_item: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  service_item_text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  service_image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  friendsub_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    color: '#000',
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
  img_container: {
    height: 60,
    padding: 2,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  name_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    color: '#000',
  },
  date_time:{
    fontSize:15
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Agent;
