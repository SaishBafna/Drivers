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
  MaterialSymbolsSearch,
  MdiClockOutline,
  Rightarrow,
} from '../Common/icon';
import FooterBar from '../Common/footer';
import { Picker } from '@react-native-picker/picker';

export const Service_page = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [selectedValue, setSelectedValue] = useState('Now');
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
       
        
        <View style={styles.service_section}>
          <Text style={styles.service_text}>Go Anywhere, Get Anything</Text>
          
        </View>
        <View style={styles.service_container}>
          <TouchableOpacity
            style={styles.service_item}
            onPress={() => props.navigation.navigate('Request Mechanic')}
          >
            <Image
              source={require('../Assets/Images/bg.png')}
              style={styles.service_image}
              resizeMode="contain"
            />
            <Text style={styles.service_item_text}>Mechanic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.service_item}
            onPress={() => props.navigation.navigate('Request Tow')}
          >
            <Image
              source={require('../Assets/Images/tow.png')}
              style={styles.service_image}
              resizeMode="contain"
            />
            <Text style={styles.service_item_text}>Tow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.service_item}
            onPress={() => props.navigation.navigate('Search Friends')}
          >
            <Image
              source={require('../Assets/Images/talk.png')}
              style={styles.service_image}
              resizeMode="contain"
            />
            <Text style={styles.service_item_text}>Talk to Friend</Text>
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
    alignItems: 'center',
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
});

export default Service_page;
