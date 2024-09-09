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

export const Activity = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [selectedValue, setSelectedValue] = useState('Now');
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
       
        
      <View style={styles.service_section}>
          <Text style={styles.service_text}>Past</Text>
          <TouchableOpacity>
            <Filter_icon />
          </TouchableOpacity>
        </View>
        <View style={styles.service_container}>
           <Text> You Dont have any recent activity</Text>
        </View>
        <View style={styles.list_container}>
            <Text style={styles.list_header}>Oil Leakage</Text>
            <Text>Jun 15, 2024 10:00</Text>
            <Text>27 Carriers Road,Creedy Park</Text>
        </View>
        <View style={styles.list_container}>
            <Text style={styles.list_header}>Break Fail</Text>
            <Text>Jun 15, 2024 10:00</Text>
            <Text>27 Carriers Road,Creedy Park</Text>
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
    color:'#000',
    marginBottom:5,
    fontWeight:'semibold'
  },
});

export default Activity;
