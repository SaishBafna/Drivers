import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
    Filter_icon,
  MaterialSymbolsSearch,
  MdiClockOutline,
  Rightarrow,
} from '../Common/icon';
import FooterBar from '../Common/footer';
import { Picker } from '@react-native-picker/picker';

export const Notification = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [selectedValue, setSelectedValue] = useState('Now');
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
       
        
      <View style={styles.service_section}>
          <Text style={styles.service_text}>Notification</Text>
         
        </View>
       
        <View style={styles.list_container}>
            <View style={styles.name_sub}>
            <View style={styles.list_header}>
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.image_icon}
            />
                <Text style={styles.name}> Aryan </Text></View>
            <Text>Jun 15, 2024 10:00</Text>
            </View>
            <Text>I am available to talk</Text>
        </View>
        <View style={styles.list_container}>
        <View style={styles.name_sub}>
        <View style={styles.list_header}>
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.image_icon}
            />
                <Text style={styles.name}> Rehan </Text></View>
            <Text>Jun 15, 2024 10:00</Text>
            </View>
            <Text>I am available to talk</Text>
        </View>
        <View style={styles.list_container}>
        <View style={styles.name_sub}>
        <View style={styles.list_header}>
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.image_icon}
            />
                <Text style={styles.name}> Lokesh </Text></View>
            <Text>Jun 15, 2024 10:00</Text>
            </View>
            <Text>I am available to talk</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },

  //service_container designs
  service_container: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 5,
  },
  service_item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  list_container:{
    backgroundColor:'#fff',
    marginVertical:5,
    padding:10,
    borderRadius:10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  list_header:{
    fontSize:18,
    flexDirection:"row",
    color:'#000',
    marginBottom:5,
    fontWeight:'semibold',
    justifyContent:'center',
    alignItems:'center'
  },
  name_sub:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
 image_icon:{
    width:35,
    height:35,
    borderRadius:50,
    marginRight:8
 },
 name:{
    fontSize:18,
    color:'#000'
 },
});

export default Notification;
