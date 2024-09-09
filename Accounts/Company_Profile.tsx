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

interface ApiErrorResponse {
  message: string;
}

export const Company_Profile = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {

  const handleLogout = async() => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      // console.log(refreshToken);
  
      // Prepare the body with the refresh token
      const requestBody = {
        token: refreshToken,
      };

            // console.log(requestBody);

  
      // Make the POST request to the logout endpoint
      const response = await apiClient.post('logout', requestBody);
              console.log(response);

      // const data = response.data;
     

      if (response.status === 200) {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user_id');
        await AsyncStorage.removeItem('refreshToken');
        props.navigation.navigate('Login');
        Alert.alert('Success', 'Logout successful');
      } else {
        Alert.alert('Error', response.data.message || 'Logout failed');
      }
    } catch (error) {
      console.log(error)
      const err = error as AxiosError<ApiErrorResponse>;
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong. Please try again later.');
    }
  };


  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.scroll}>
        <View style={styles.account_header}>
          <View style={styles.name_container}>
            <Text style={styles.name}>John Deo</Text>
            <View style={styles.rating}>
              <Star_icon />
              <Text>5.0</Text>
            </View>
          </View>
          <View>
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.icon}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.phone_section}  onPress={() => props.navigation.navigate('Account Settings')}>
            <View>
          <Text style={styles.phone}>+91-1234567890</Text>
          <Text style={styles.phone}>Johndeo@gmail.com</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.iconTextContainer}>
                <Rightarrow />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.vehicle_container}  onPress={() => props.navigation.navigate('Vehicle_Details')}>
            <View>
          <Text style={styles.vehicle_name}>Vehicle</Text>
          {/* <Text style={styles.phone}>Johndeo@gmail.com</Text> */}
          </View>
          <TouchableOpacity>
            <View style={styles.iconTextContainer}>
                <Rightarrow />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.discount_container}>
            <View style={styles.text_section}>
            <Text style={styles.discount_text}>22% Off on Drivers App</Text>
            <Text style={styles.discount_desc}>Go rediscover your city for less - terms and condition applies</Text>
            </View>
            <View>
                <Image 
                source={require('../Assets/Images/pricetag.png')}
                style={styles.price_tag}
                />
            </View>
        </View>
        <View style={styles.horizontalLine} />
        <View>
            <TouchableOpacity style={styles.setting_section} onPress={() => props.navigation.navigate('Update_kyc')}>
                <Settings_icon />
                <Text style={styles.setting_text}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_section} onPress={() => props.navigation.navigate('Help')}>
                <Question_icon />
                <Text style={styles.setting_text}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_section}> 
                <Information_icon_dark />
                <Text style={styles.setting_text}>Legal</Text>
            </TouchableOpacity>
            <Text style={styles.setting_section}>V 1.1.1</Text>
        </View>
        <View style={styles.horizontalLine2} />
        <View>
        <TouchableOpacity style={styles.setting_section} onPress={() => handleLogout()}>
                <Text style={styles.logout_btn}>LogOut</Text>
            </TouchableOpacity>
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
  rating:{
    alignItems: 'center', // Center content horizontally
    flexDirection: 'row', // Align children horizontally
  },
  name_container:{
    marginVertical:30,
  },
  name:{
    fontSize:25,
    color:'#000',
    fontWeight:'bold'
  },
  icon: {
    marginRight: 5,
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  account_header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:20
  },
  phone_section: {
    marginHorizontal: 20,
    // marginTop: 10,
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
  vehicle_container:{
    marginHorizontal: 20,
    marginTop: 20,
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
  },
  phone: {
    fontSize: 15,
    // color: '#333',
  },

  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  call_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  horizontalLine: {
    height: 5, // Height of the line
    backgroundColor: '#d3d3d3', // Light gray color
    marginVertical: 20, // Space around the line (adjust as needed)
  },
  discount_container:{
    backgroundColor:'#ededed',
    flexDirection:'row',
    margin:20,
    padding:20,
    borderRadius:10,

  },
  discount_text:{
    fontSize:18,
    fontWeight:'bold',
    color:'#000'
  },
  discount_desc:{
    fontSize:12,
    marginTop:10
  },
  price_tag:{
    width: 120,
    height: 75,
  },
  text_section:{
    width:'75%'
  },
  setting_section:{
    flexDirection:'row',
    marginHorizontal:20,
    marginVertical:10
  },
  setting_text:{
    fontSize:16,
    marginLeft:20,
    color:'#000'
  },
  horizontalLine2: {
    height: 2, // Height of the line
    backgroundColor: '#d3d3d3', // Light gray color
    marginVertical: 20, // Space around the line (adjust as needed)
  },
  logout_btn:{
    fontSize:18,
    color:'red',
    fontWeight:'bold'
  },
});

export default Company_Profile;
