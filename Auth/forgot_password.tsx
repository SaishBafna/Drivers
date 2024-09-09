import React, {useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../Common/custombutton ';
import  {InputLable, NormalInput} from '../Common/input_componenet';
import { AxiosError } from 'axios';
import { apiClient } from '../apiClient';

interface ApiErrorResponse {
  message: string;
}

export const Forgot_Password = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {

    const [email, setEmail] = useState('');

    const handleOTP = async () => {
      const payload = {
        email: email,
      };
  
      try {
        const response = await apiClient.post('auth/initiate-password-reset', payload);
        const data = response.data;
        
        if (response.status === 200) {
          Alert.alert('Success', 'OTP send successful');
          props.navigation.navigate('Login');
        } else {
          Alert.alert('Error', response.data.message || 'Login failed');
        }
      } catch (error) {
        console.log(error)
        const err = error as AxiosError<ApiErrorResponse>;
        Alert.alert('Error', err.response?.data?.message || 'Something went wrong. Please try again later.');
      }
    };

  return (
    <View style={styles.body}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={true}
      />
     
     <Text style={styles.text_content}>Enter the email associated with your account and we'll send email instruction to reset your password</Text>
      <InputLable name={'Enter Email Address'}/>
      <NormalInput placeholder={'Enter Email Address'} value={email} onChangeText={setEmail} />

      <CustomButton title={'Continue'} onPress={handleOTP} icon={undefined} />

      
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text_content: {
    fontSize: 15,
    marginBottom: 15,
  }
});
