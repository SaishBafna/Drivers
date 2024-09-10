import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Home} from './Dashboards/home';
import {Login} from './Auth/login';
import {Request} from './request_post/request';
import {Forgot_Password} from './Auth/forgot_password';
import {Registration} from './Auth/registration';
import {
  ClarityNotificationLine,
  IconamoonMenuBurgerHorizontal,
  Phonecall,
  Back_icon,
  Three_dot_menu,
} from './Common/icon';
import {Post_Service} from './request_post/post';
import {Request_Tow} from './request_post/request_tow';
import {Search_friend} from './Talk_to_friend/search_friend';
import {Friends} from './Talk_to_friend/friends';
import {Leaderboard_list} from './leader_board/leaderboard_list';
import {enableScreens} from 'react-native-screens';
import {Leaderboard_detail} from './leader_board/leaderboard_detail';
import Profile from './Accounts/Profile';
import AccountSettings from './Accounts/Account';
import Help from './Accounts/Help';
import Setting_Account from './Accounts/Account_setting';
import Account_update from './Accounts/Account_update';
import Service_page from './Services/Service';
import Activity from './Activity/Activity';
import Update_kyc from './Update_kyc/Update_kyc';
import Mechanic_Home from './Dashboards/mechanic_home';
import Mechanic_Service_page from './Services/Mechanic_Service';
import Notification from './Common/Notification';
import Account_help from './Accounts/Account_help';
import Account_delete from './Accounts/Account_delete';
import Account_Partnership from './Accounts/proms_partnership';
import Promotion_extension from './Accounts/Promotion_extension';
import ChatFriend from './Talk_to_friend/chat_friend';
import CallingScreen from './Talk_to_friend/call_screen';
import CallingAcceptance from './Talk_to_friend/call_acceptance';
import Towing from './Dashboards/towing';
import Company from './Dashboards/company';
import Agent from './Dashboards/agent';
import { History } from './History/history';
import Mechanic_Profile from './Accounts/Mechanic_profile';
import Company_Profile from './Accounts/Company_Profile';
import Vehicle_Details from './Vehicle/vehicle_details';
import { Add_vehicle } from './Vehicle/add_vehicle';
import WebRTCComponent from './call';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens();


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => (
              <>
                {/* <IconamoonMenuBurgerHorizontal /> */}
                <Text style={{fontSize: 25}}>Drivers</Text>
              </>
            ), // This hides the back button
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}>
                <ClarityNotificationLine />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Request Mechanic"
          component={Request}
          options={{
            headerTransparent: false,
            headerTitle: 'Request Mechanic',
          }}
        />

        <Stack.Screen
          name="Request Tow"
          component={Request_Tow}
          options={{
            headerTransparent: false,
            headerTitle: 'Request Tow',
          }}
        />

        <Stack.Screen
          name="Forgot Password"
          component={Forgot_Password}
          options={{
            headerTransparent: false,
            headerTitle: 'Forgot Password',
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTransparent: false,
            headerTitle: 'Registration',
          }}
        />
        <Stack.Screen
          name="Post Service"
          component={Post_Service}
          options={{
            headerTransparent: false,
            headerTitle: 'Post Service',
          }}
        />
        <Stack.Screen
          name="Search Friends"
          component={Search_friend}
          options={{
            headerTransparent: false,
            headerTitle: 'Search Friends',
          }}
        />
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{
            headerTransparent: false,
            headerTitle: 'Talk To Friend',
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerTransparent: false,
            headerTitle: 'History',
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatFriend}
          options={({route, navigation}) => ({
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => (
              <View style={styles.headerLeftContainer}>
                <TouchableOpacity
          onPress={async () => {
            const serviceType = await AsyncStorage.getItem('serviceType');
            if (serviceType === '9494') {
              navigation.navigate('History');
            } else {
              navigation.navigate('Friends');
            }
          }}>
                  <Back_icon />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                  <Image
                    source={require('./Assets/Images/profile.png')}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.friendName}>
                  
                  {route.params?.friendName || 'Friend'}
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                {/* <TouchableOpacity style={{marginRight: 10}} >
                  <Phonecall />
                </TouchableOpacity> */}
                <Three_dot_menu />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="Leader Board"
          component={Leaderboard_list}
          options={{
            headerTransparent: false,
            headerTitle: 'Leader Board',
          }}
        />

        <Stack.Screen
          name="Leader Board Details"
          component={Leaderboard_detail}
          options={{
            headerTransparent: false,
            headerTitle: 'Leader Board Details',
          }}
        />

        <Stack.Screen
          name="Account"
          component={Profile}
          options={{
            headerTransparent: false,
            headerTitle: 'Account',
          }}
        />

        <Stack.Screen
          name="Account Settings"
          component={AccountSettings}
          options={{
            headerTransparent: false,
            headerTitle: 'Account Settings',
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerTransparent: false,
            headerTitle: 'Help',
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting_Account}
          options={{
            headerTransparent: false,
            headerTitle: 'Help',
          }}
        />
        <Stack.Screen
          name="Update"
          component={Account_update}
          options={{
            headerTransparent: false,
            headerTitle: 'Help',
          }}
        />
        <Stack.Screen
          name="Service"
          component={Service_page}
          options={{
            headerTransparent: false,
            headerTitle: 'Service',
          }}
        />
        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{
            headerTransparent: false,
            headerTitle: 'Activity',
          }}
        />
        <Stack.Screen
          name="Update_kyc"
          component={Update_kyc}
          options={{
            headerTransparent: false,
            headerTitle: 'Update KYC',
          }}
        />
        <Stack.Screen
          name="Mechanic_home"
          component={Mechanic_Home}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => (
              <>
                {/* <IconamoonMenuBurgerHorizontal /> */}
                <Text style={{ fontSize: 25}}>Drivers</Text>
              </>
            ), // This hides the back button
            headerRight: () => <ClarityNotificationLine />,
          }}
        />
        <Stack.Screen
          name="Towing"
          component={Towing}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => (
              <>
                {/* <IconamoonMenuBurgerHorizontal /> */}
                <Text style={{ fontSize: 25}}>Drivers</Text>
              </>
            ), // This hides the back button
            headerRight: () => <ClarityNotificationLine />,
          }}
        />
        <Stack.Screen
          name="Company"
          component={Company}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => (
              <>
                {/* <IconamoonMenuBurgerHorizontal /> */}
                <Text style={{ fontSize: 25}}>Drivers</Text>
              </>
            ), // This hides the back button
            headerRight: () => <ClarityNotificationLine />,
          }}
        />
        <Stack.Screen
          name="Agent"
          component={Agent}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => (
              <>
                {/* <IconamoonMenuBurgerHorizontal /> */}
                <Text style={{ fontSize: 25}}>Drivers</Text>
              </>
            ), // This hides the back button
            headerRight: () => <ClarityNotificationLine />,
          }}
        />
        <Stack.Screen
          name="Mechanic_service"
          component={Mechanic_Service_page}
          options={{
            headerTransparent: false,
            headerTitle: 'Mechanic Service Page',
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerTransparent: false,
            headerTitle: 'Notification',
          }}
        />
        <Stack.Screen
          name="Account_help"
          component={Account_help}
          options={{
            headerTransparent: false,
            headerTitle: 'Help',
          }}
        />
        <Stack.Screen
          name="Account_delete"
          component={Account_delete}
          options={{
            headerTransparent: false,
            headerTitle: 'Help',
          }}
        />
        <Stack.Screen
          name="Account_partnership"
          component={Account_Partnership}
          options={{
            headerTransparent: false,
            headerTitle: 'Help',
          }}
        />
        <Stack.Screen
          name="Promotion_extension"
          component={Promotion_extension}
          options={{
            headerTransparent: false,
            headerTitle: 'Help',
          }}
        />
         <Stack.Screen
          name="calling"
          component={CallingScreen}
          options={{
            headerTransparent: false,
            headerTitle: 'Call',
          }}
        />
         <Stack.Screen
          name="calling_acceptance"
          component={CallingAcceptance}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Mechanic_Profile"
          component={Mechanic_Profile}
          options={{
            headerTransparent: false,
            headerTitle: 'Profile',
          }}
        />
        <Stack.Screen
          name="Company_Profile"
          component={Company_Profile}
          options={{
            headerTransparent: false,
            headerTitle: 'Profile',
          }}
        />
        <Stack.Screen
          name="Add_vehicle"
          component={Add_vehicle}
          options={{
            headerTransparent: false,
            headerTitle: 'Add Vehicle',
          }}
        />
        <Stack.Screen
          name="Call"
          component={WebRTCComponent}
          options={{
            headerTransparent: false,
            headerTitle: 'Call',
          }}
        />
        <Stack.Screen
          name="Vehicle_Details"
          component={Vehicle_Details}
          options={({navigation}) => ({
            headerTransparent: false,
            headerTitle: 'Vehicle Details',
            // headerLeft: () => (
            //   <>
            //     {/* <IconamoonMenuBurgerHorizontal /> */}
            //     <Text style={{fontSize: 25}}>Vehicle Details</Text>
            //   </>
            // ), // This hides the back button
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Add_vehicle')}>
                <Text style={styles.Add_vehicle}>Add</Text>
              </TouchableOpacity>
            ),
          })}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    height: 40,
    padding: 2,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    marginLeft: 8,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  friendName: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  name_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#06D001',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 5,
  },
  friend_name: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  Add_vehicle:{
    padding:10,
    backgroundColor:'#000',
    borderRadius:10,
    color:'#fff',
    fontSize:15
  },
});

export default App;
