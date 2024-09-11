import {Picker} from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {LogosApple, LogosGoogle, LogosGoogleGmail} from '../Common/icon';
import CustomButton from '../Common/custombutton ';
import {
  LongInput,
  InputLable,
  NormalInput,
  TimeInput,
  RadiusSlider,
  FileInputBox,
} from '../Common/input_componenet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../apiClient';
import { AxiosError } from 'axios';

export const Post_Service =  (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [radius, setRadius] = useState(25); // Added state for radius
  const [serviceType, setServiceType] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [location, setLocation] = useState('');
  // const [price, setPrice] = useState('');
  const [comments, setComments] = useState('');
  const [images, setImages] = useState([]); // Manage images state here

  // Fetch saved data from AsyncStorage
  useEffect(() => {
    const fetchServiceType = async () => {
      const storedServiceType = await AsyncStorage.getItem('serviceType');
      //@ts-ignore
      setServiceType(storedServiceType);
    };
    fetchServiceType();
  }, []);

  // Extract file name and extension
  //@ts-ignore
  const extractFileNameAndExtension = (uri) => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const fileExtension = fileName.split('.').pop();
    return {fileName, fileExtension};
  };

  // Handle form submission
  const handleSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    // Create a FormData object
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('serviceType', selectedValue);
    formData.append('problemDescription', problemDescription);
    formData.append('radius', radius.toString());
    formData.append('location', location);
    // formData.append('price', price);
    formData.append('comments', comments);

    // Append images with file names and extensions
    images.forEach((image, index) => {
      //@ts-ignore
      const {fileName, fileExtension} = extractFileNameAndExtension(image.uri);
      const file = {
        //@ts-ignore
        uri: image.uri,
        type: `image/${fileExtension}`, // e.g., 'image/jpg'
        name: fileName,
      };
      formData.append('images', file);
    });

    try {
      const response = await apiClient.post('/postService', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Your request has been submitted successfully!');
        props.navigation.navigate('Home');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      const err = error as AxiosError<{message: string}>;
      console.error('Error posting service:', err);
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

      <View style={styles.time_input}>
        <View>
          <InputLable name={'Opening Time'} />
          <TimeInput />
        </View>
        <View>
          <InputLable name={'Closing Time'} />
          <TimeInput />
        </View>
      </View>
      
      {
      //@ts-ignore
      serviceType == 9595 && (<>
        <InputLable name={'Origin'} />

        <NormalInput
          value={''}
          onChangeText={''}
          placeholder={'Enter Origin Location'}
        />

        <InputLable name={'Destination'} />

      <NormalInput
        value={''}
        onChangeText={''}
        placeholder={'Enter Destination Location'}
      />
      </>
      )}
      <InputLable name={'Service Type'} />
      
      {
        //@ts-ignore
      serviceType == 9696 ? (
  <Picker
    style={styles.pickerinput}
    selectedValue={selectedValue}
    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  >
    <Picker.Item label="Select the Preferred Language" value="" />
    <Picker.Item label="Oil Leakage" value="oil_leakage" />
    <Picker.Item label="Break Fail" value="break_fail" />
    <Picker.Item label="Replace Air Filter" value="replace_air_filter" />
    <Picker.Item label="Coolant" value="collant" />
    <Picker.Item label="Spark Plug" value="spark_plug" />
    <Picker.Item label="Other" value="other" />
  </Picker>
) : (
  <Picker
    style={styles.pickerinput}
    selectedValue={selectedValue}
    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  >
    <Picker.Item label="Select the Preferred Language" value="" />
    <Picker.Item label="Recovery Towing" value="recovery_towing" />
    <Picker.Item label="Offroad Towing" value="offroad_towing" />
    <Picker.Item label="Trailer Towing" value="trailer_towing" />
    <Picker.Item label="Dinghy Towing" value="dinghy_towing" />
    <Picker.Item label="Pintle Towing" value="pintle_towing" />
    <Picker.Item label="Other" value="other" />
  </Picker>
)}


      <InputLable name={'Service Description'} />

      <LongInput
        longvalue={''}
        longonChangeText={''}
        placeholder={'Enter Service Description'}
      />
      
      {/* <InputLable name={'Photo'} /> */}
      {/* <FileInputBox images={undefined} setImages={undefined} /> */}
      
      <InputLable name={'Location'} />

      <NormalInput
        value={''}
        onChangeText={''}
        placeholder={'Enter or Set your Location'}
      />

      <InputLable name={'Radius'} />
      <RadiusSlider radius={radius} setRadius={setRadius} />
      {/* {serviceType == 9696 && <>
      <InputLable name={'Price'} />
      <NormalInput
        value={''}
        onChangeText={''}
        placeholder={'Enter Price'}
      />
      </>
      } */}

      <InputLable name={'Comments'} />

      <LongInput
        longvalue={''}
        longonChangeText={''}
        placeholder={'Enter Comments'}
      />

      
    <View style={{marginBottom:50}}>
      <CustomButton
        icon={<></>}
        title="Continue"
        onPress={() => props.navigation.navigate('Home')}
      />
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

  //picker input designs
  pickerinput: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 10,
  },

  //time inputs designs
  time_input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    // paddingHorizontal: 10,
    flex: 1,
  },
});
