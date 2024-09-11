import React, {useState} from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {LogosApple, LogosGoogle, LogosGoogleGmail} from '../Common/icon';
import CustomButton from '../Common/custombutton ';
import PasswordInput from './password';
import {InputLable, NormalInput} from '../Common/input_componenet';
import axios, { Axios, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  handleLoginSuccess  from '../apiClient';
//@ts-ignore
import {API_URL, API_IMAGE_URL} from '@env';

interface ApiErrorResponse {
  message: string;
}



export const Login = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // console.log(API_URL,API_IMAGE_URL);  
  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };
  
    try {
      let res = await axios.post(`${API_URL}login`,payload)
      const data = res.data;
      await AsyncStorage.setItem('authToken', data.accessToken);
    await AsyncStorage.setItem('user_id', data._id);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    await AsyncStorage.setItem('serviceType', data.serviceType.toString());
      if(res.status === 200){
        if(res.data.serviceType === 9494){
          props.navigation.navigate('Agent');
        }else if(res.data.serviceType === 9797){
          props.navigation.navigate('Home');
        }else if(res.data.serviceType === 9696){
          props.navigation.navigate('Mechanic_home');
        }else if(res.data.serviceType === 9595){
          props.navigation.navigate('Towing');
        }else if(res.data.serviceType === 9393){
          props.navigation.navigate('Company');
        }
      }
      
    } catch (error) {
      
    
  
      // Enhanced error handling
      const err = error as AxiosError<ApiErrorResponse>;
      const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again later.';
      console.log('Error:',err)
      Alert.alert('Error', errorMessage);
    }
  };
  return (
    <View style={styles.body}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={true}
      />

      <Text style={styles.headtitle}>Login</Text>

      <InputLable name={'Enter Email Address'} />

      <NormalInput
        value={email}
        onChangeText={setEmail}
        placeholder={'user@example.com'}
      />

      <InputLable name={'Enter Password'} />

      <PasswordInput passwordvalue={password} passwordpass={setPassword} />

      <CustomButton icon={<></>} title="Continue" onPress={handleLogin} />
      {/* <CustomButton icon={<></>} title="Continue" onPress={() => props.navigation.navigate('Call')} /> */}

      <View style={styles.linkContainer}>
        <Text
          style={styles.authlink}
          onPress={() => props.navigation.navigate('Forgot Password')}>
          Forgot Password?
        </Text>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.divider}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.sociallogin}>
        <Text>
          <LogosGoogle />
        </Text>
        <Text style={styles.sociallogintext}>Continue With Google</Text>
      </View>

      <View style={styles.sociallogin}>
        <Text>
          <LogosApple />
        </Text>
        <Text style={styles.sociallogintext}>Continue With Apple</Text>
      </View>

      <View style={styles.sociallogin}>
        <Text>
          <LogosGoogleGmail />
        </Text>
        <Text style={styles.sociallogintext}>Continue With Email</Text>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.divider}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.linkContainer}>
        <Text>Don't have an Account? </Text>
        <Text
          style={styles.authlink}
          onPress={() => props.navigation.navigate('Registration')}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },

  headtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },

  
  //Forgot password and Create Account designs

  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  authlink: {
    color: '#000',
    fontWeight: 'bold',
  },
  //This is divider style
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
  },
  divider: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },

  //social login designs
  sociallogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 0,
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
  },
  sociallogintext: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});
