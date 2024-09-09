import React, {useState} from 'react';
import {Alert, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../Common/custombutton ';
import {InputLable, NormalInput} from '../Common/input_componenet';
import {LogosApple, LogosGoogle, LogosGoogleGmail} from '../Common/icon';
import PasswordInput from './password';
import axios, { AxiosError } from 'axios';
import  apiClient  from '../apiClient';
import { Picker } from '@react-native-picker/picker';
//@ts-ignore
import {API_URL,API_IMAGE_URL} from '@env';



export const Registration = (props: { navigation: { navigate: (arg0: string) => void } }) => {
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  interface ApiErrorResponse {
    message: string;
  }
  const register = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // const apiBaseUrl = process.env.APP_BASE_URL; 

    const payload = {
      username: name,
      email: email,
      serviceType:selectedValue,
      phone: phone,
      companyAddress: address,
      // serviceType: "Driver",
      password: password,
    };

    try {
     
      const response = await axios.post(`${API_URL}register`, payload);

      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful');
        props.navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error)
      const err = error as AxiosError<ApiErrorResponse>;
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <ScrollView style={styles.body}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={true}
      />

      <InputLable name={'Enter Name'} />
      <NormalInput
        placeholder={'Enter your Name'}
        value={name}
        onChangeText={setName}
      />

      <InputLable name={'Enter Email Address'} />
      <NormalInput
        placeholder={'Enter your Email'}
        value={email}
        onChangeText={setEmail}
      />

      <InputLable name={'Enter Phone Number'} />
      <NormalInput
        placeholder={'Enter your Phone Number'}
        value={phone}
        onChangeText={setPhone}
      />
      
 <InputLable name={'User Type'} />
      <Picker
        style={styles.pickerinput}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}>
        <Picker.Item label="Select the User type" value="" />
        <Picker.Item label="Driver" value="Driver" />
        <Picker.Item label="Mechanic" value="Mechanic" />
        <Picker.Item label="Towing" value="Tower" />
        <Picker.Item label="Agent" value="Agent" />
        <Picker.Item label="Company" value="Company" />
      </Picker>

      <InputLable name={'Enter Your Address'} />
      <NormalInput
        placeholder={'Enter your Address'}
        value={address}
        onChangeText={setAddress}
      />

      <InputLable name={'Enter Password'} />
      <PasswordInput
        passwordvalue={password}
        passwordpass={setPassword}
      />

      <InputLable name={'Confirm Password'} />
      <PasswordInput
        passwordvalue={confirmPassword}
        passwordpass={setConfirmPassword}
      />

      <CustomButton
        title={'Register'}
        onPress={register} icon={undefined}      />

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.divider}>OR</Text>
        <View style={styles.line} />
      </View>
      <View style={{marginBottom: 50}}>
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
      </View>
    </ScrollView>
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
  },
  // This is divider style
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  pickerinput: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 10,
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
  // social login designs
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

function env(arg0: string) {
  throw new Error('Function not implemented.');
}
