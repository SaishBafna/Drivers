import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Homeicon, Services, Activityicon, Accounticon, History_icon } from '../Common/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = () => {
  const navigation = useNavigation(); // Get navigation prop using the hook
  const [serviceType, setServiceType] = useState(null);

  useEffect(() => {
    const fetchServiceType = async () => {
      const storedServiceType = await AsyncStorage.getItem('serviceType');
      setServiceType(storedServiceType); // Store the retrieved value in state
    };

    fetchServiceType();
  }, []); // Empty dependency array to ensure this runs only once

  const handlehome = async() => {
    // console.log(serviceType)
    if(serviceType == 9494){
      navigation.navigate('Agent');
    }else if(serviceType == 9797){
      navigation.navigate('Home');
    }else if(serviceType == 9696){
      navigation.navigate('Mechanic_home');
    }else if(serviceType == 9595){
      navigation.navigate('Towing');
    }else if(serviceType == 9393){
      navigation.navigate('Company');
    }else{
      console.log('button not hit');
    }
  }

  const handleAccount = async() => {
    // console.log(serviceType)
    if(serviceType == 9494){
      navigation.navigate('Account');
    }else if(serviceType == 9797){
      navigation.navigate('Account');
    }else if(serviceType == 9696){
      navigation.navigate('Mechanic_Profile');
    }else if(serviceType == 9595){
      navigation.navigate('Mechanic_Profile');
    }else if(serviceType == 9393){
      navigation.navigate('Company_Profile');
    }else{
      console.log('button not hit');
    }
  }

  const handleService = async() => {
    // console.log(serviceType)
    if(serviceType == 9494){
      navigation.navigate('Service');
    }else if(serviceType == 9797){
      navigation.navigate('Service');
    }else if(serviceType == 9696){
      navigation.navigate('Mechanic_service');
    }else if(serviceType == 9595){
      navigation.navigate('Mechanic_service');
    }else if(serviceType == 9393){
      navigation.navigate('Service');
    }else{
      console.log('button not hit');
    }
  }

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerContent} onPress={handlehome}>
        <Homeicon />
        <Text>Home</Text>
      </TouchableOpacity>
      
      {serviceType != 9494 && (<>
      <TouchableOpacity style={styles.footerContent} onPress={handleService}>
        <Services />
        <Text>Service</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerContent} onPress={() => navigation.navigate('Activity')}>
        <Activityicon />
        <Text>Activity</Text>
      </TouchableOpacity>
      </>)}
      {serviceType == 9494 && (<>
      <TouchableOpacity style={styles.footerContent} onPress={() => navigation.navigate('History')}>
        <History_icon />
        <Text>History</Text>
      </TouchableOpacity>
      
      </>)}
      <TouchableOpacity style={styles.footerContent} onPress={handleAccount}>
        <Accounticon />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const FooterBar = () => {
  return (
    <View style={styles.container}>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Shadow for iOS
    shadowColor: '#000', // Darker shadow color
    shadowOffset: { width: 0, height: -4 }, // Larger height offset for bigger shadow
    shadowOpacity: 0.3, // Increased opacity for a darker shadow
    shadowRadius: 8, // Increased radius for a larger blur effect
    // Elevation for Android
    elevation: 10, // Higher elevation for a more pronounced shadow
  },
  
  footerContent: {
    alignItems: 'center',
  },
});

export default FooterBar;
