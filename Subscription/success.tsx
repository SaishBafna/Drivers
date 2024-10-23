import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useStripe } from '@stripe/stripe-react-native';
import FooterBar from '../Common/footer';
import apiClient from '../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export const Success = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
 
    const handlenavigation = async() => {
        const serviceType = await AsyncStorage.getItem('serviceType');
        
        if (serviceType) {
          switch (serviceType) {
            case '9494':
              props.navigation.navigate('Agent');
              break;
            case '9797':
              props.navigation.navigate('Home');
              break;
            case '9696':
              props.navigation.navigate('Mechanic_home');
              break;
            case '9595':
              props.navigation.navigate('Towing');
              break;
            case '9393':
              props.navigation.navigate('Company');
              break;
          }
        }
    }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Image 
                source={require('../Assets/Images/greentick.png')}
                style={styles.success_tick}
                />
        <Text style={styles.success_text}>Success</Text>
        <View style={styles.text_container}> 
            <Text style={styles.text}>Payment successfully Done </Text>
            <Text style={styles.text}>Enjoy Paid Services</Text>
        </View>
        <TouchableOpacity style={styles.button_container} onPress={handlenavigation}> 
            <Text style={styles.btn_text}>Back To Home</Text>
        </TouchableOpacity>
      </View>
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    marginTop:15,
    justifyContent: 'center',
  },
  success_tick:{
    marginTop:50,
    width: 200,
    height: 200
  },
  success_text:{
    fontSize:36,
    color:'green',
    marginTop:10,
  },
  text_container:{
    marginTop:20,
    alignItems:'center',
  },
  text:{
    fontSize:18
  },
  button_container:{
    marginTop:50,
    alignItems:'center',
    backgroundColor:'#000',
    padding:15,
    borderRadius:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
    elevation: 5
  },
  btn_text:{
    color:'#fff',
    fontSize:18
  },
});

