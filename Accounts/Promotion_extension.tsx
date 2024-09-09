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

const Promotion_extension = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.page_header}>Extending Expired Promotion</Text>
      </View>
      

      <View style={styles.list_container}>
        <View style={styles.icon_container}>
          <View style={styles.iconTextContainer}>
           
            <Text style={styles.list_item}>Promo Code:</Text>
            <View style={styles.list_sub_item}>
            <Text style={styles.list_item}>1.Won't work after the expiration date.</Text>
            <Text style={styles.list_item}>2.Can't be extended or renewed.</Text>
           
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
    // alignItems: 'center',
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

export default Promotion_extension;
