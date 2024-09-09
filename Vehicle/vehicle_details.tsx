import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import FooterBar from '../Common/footer';
import {
    Information_icon,
  Information_icon_dark,
  Location_icon1,
  Phonecall,
  Phonecall_light,
  Question_icon,
  Rightarrow,
  Settings_icon,
  Star_icon,
  Verify_Tick,
} from '../Common/icon';
//@ts-ignore
import { apiClient } from '../apiClient';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Vehicle_Details = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {

   


  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.scroll}>
       <View style={styles.main_container}>
        <View style={styles.vehicle_container}>
            <View>
          <Text style={styles.vehicle_name}>AB05DE1234</Text>
          </View>
            <View style={styles.iconTextContainer}>
                <Text>Truck</Text>
            </View>
        </View>
        <View style={styles.vehicle_container}>
            <View>
          <Text style={styles.vehicle_name}>AB05DE1234</Text>
          </View>
            <View style={styles.iconTextContainer}>
                <Text>Trailer</Text>
            </View>
        </View>
        <View style={styles.vehicle_container}>
            <View>
          <Text style={styles.vehicle_name}>AB05DE1234</Text>
          </View>
            <View style={styles.iconTextContainer}>
                <Text>Truck</Text>
            </View>
        </View>
        <View style={styles.vehicle_container}>
            <View>
          <Text style={styles.vehicle_name}>AB05DE1234</Text>
          </View>
            <View style={styles.iconTextContainer}>
                <Text>Trailer</Text>
            </View>
        </View>
        </View>
        
      </ScrollView>
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background color for overall app
    // paddingBottom: 20,
    // justifyContent:'flex-end'
  },
  scroll: {
    marginBottom: 90,
  },
  main_container:{
    marginTop:10
  },
  vehicle_container:{
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  vehicle_name:{
    fontSize:18,
    color:'#000',
    fontWeight:'500'
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Vehicle_Details;
