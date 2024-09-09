import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Box_tick, Pointer_icon, Rightarrow} from '../Common/icon';

const Account_help = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.page_header}>Update My Profile </Text>
      </View>
      

      <View style={styles.list_container}>
        <View style={styles.icon_container}>
          <View style={styles.iconTextContainer}>
           
            <Text style={styles.list_item}>To update your name, email, phone number, or password for your account:</Text>
            <View style={styles.list_sub_item}>
            <Text style={styles.list_item}>1.Open the app menu and tap <Text style={styles.bold_text}>'Settings'</Text></Text>
            <Text style={styles.list_item}>2.Tap the bar that displays your name, phone number, and email.</Text>
            <Text style={styles.list_item}>3.Tap the detail you want to change and enter the updated information.</Text>
            <Text style={styles.list_item}>4.Make your updates and click <Text style={styles.bold_text}>'Update'</Text>.</Text>
            </View>
          </View>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  page_header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  list_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  icon_container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    // alignItems: 'center', // Centers horizontally (if needed)
  },
  list_item: {
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Centers items vertically within the row
    fontSize: 16,
    marginLeft: 30,
    color: 'black',
  },

  iconTextContainer: {
    // flexDirection: '',
    alignItems: 'center',
  },
  horizontalLine: {
    width: '100%', // Full width of the container or adjust as needed
    height: 0.5,
    backgroundColor: 'gray',
  },
  list_sub_item:{
    marginLeft:20,
    marginTop:30,
    fontSize:16,
    color:"#000"
  },
  bold_text:{
    fontWeight:'bold'
  },
});

export default Account_help;
