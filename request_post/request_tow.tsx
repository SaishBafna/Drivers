import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from 'react-native-check-box';
import {
  LongInput,
  InputLable,
  NormalInput,
  FileInputBox,
  RadiusSlider,
} from '../Common/input_componenet';
//@ts-ignore
import { apiClient } from '../apiClient';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Request_Tow = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [radius, setRadius] = useState(25); // Added state for radius
  const [problemDescription, setProblemDescription] = useState('');
  const [location, setLocation] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [truckMake, setTruckMake] = useState('');
  const [truckModel, setTruckModel] = useState('');
  const [truckYear, setTruckYear] = useState('');
  const [trailerMake, setTrailerMake] = useState('');
  const [trailerModel, setTrailerModel] = useState('');
  const [trailerYear, setTrailerYear] = useState('');
  const [images, setImages] = useState([]); // Manage images state here

  
interface ApiErrorResponse {
  message: string;
}

const extractFileNameAndExtension = (uri) => {
  const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  const fileExtension = fileName.split('.').pop();
  return { fileName, fileExtension };
};

const handleSubmit = async () => {
  const user_id = await AsyncStorage.getItem('user_id');
  let vehicleType = '';
  
  if (isChecked1) {
    vehicleType = 'Truck';
  } else if (isChecked2) {
    vehicleType = 'Trailer';
  } else {
    Alert.alert('Error', 'Please select a vehicle type.');
    return;
  }

  let vehicleData = {};
  if (isChecked1) {
    vehicleData = {
      'truckDetails[make]': truckMake,
      'truckDetails[model]': truckModel,
      'truckDetails[year]': truckYear,
    };
  }

  if (isChecked2) {
    vehicleData = {
      'trailerDetails[make]': trailerMake,
      'trailerDetails[model]': trailerModel,
      'trailerDetails[year]': trailerYear,
    };
  }

  // Create a FormData object
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('serviceType', selectedValue);
  formData.append('problemDescription', problemDescription);
  formData.append('vehicleType', vehicleType);
  formData.append('radius', radius.toString());
  formData.append('address', location);

  // Append vehicle data
  Object.keys(vehicleData).forEach(key => {
    formData.append(key, vehicleData[key]);
  });

  // Append images with file names and extensions
  images.forEach((image, index) => {
    const { fileName, fileExtension } = extractFileNameAndExtension(image.uri);
    const file = {
      uri: image.uri,
      type: `image/${fileExtension}`, // e.g., 'image/jpg'
      name: fileName,
    };
    formData.append('images', file);
  });

  try {
    console.log(formData)
    const response = await apiClient.post('/userTowRequest', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response) {
      Alert.alert('Success', 'Your request has been submitted successfully!');
      props.navigation.navigate('Leader Board');
    } else {
      Alert.alert('Error', response.data || 'Something went wrong!');
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    console.log(err);
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

      <InputLable name={'Service Type'} />
      <Picker
        style={styles.pickerinput}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Select the Preferred Service" value="" />
        <Picker.Item label="Recovery Towing" value="recovery_towing" />
        <Picker.Item label="Offroad Towing" value="offroad_towing" />
        <Picker.Item label="Trailer Towing" value="trailer_towing" />
        <Picker.Item label="Dingy Towing" value="dingy_towing" />
        <Picker.Item label="Pintle Towing" value="pintle_towing" />
        <Picker.Item label="Other.." value="other" />
      </Picker>

      <InputLable name={'Problem Description'} />
      <LongInput
        longvalue={problemDescription}
        longonChangeText={setProblemDescription}
        placeholder={'Enter Problem Description'}
      />
       <FileInputBox images={images} setImages={setImages} />

      <InputLable name={'Vehicle Type'} />
      <View style={styles.checkboxContainer}>
        <CheckBox
          style={{flex: 1, padding: 10}}
          isChecked={isChecked1}
          onClick={() => setIsChecked1(!isChecked1)}
          rightText="Truck"
          rightTextStyle={{fontSize: 19, color: 'black'}}
          checkBoxColor="#000" // Color of the checkbox
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          isChecked={isChecked2}
          onClick={() => setIsChecked2(!isChecked2)}
          rightText="Trailer"
          rightTextStyle={{fontSize: 19, color: 'black'}}
          checkBoxColor="#000"
        />
      </View>
      {isChecked1 && 
        <View>
           <InputLable name={'Truck Make'} />
          <NormalInput
            value={truckMake}
            onChangeText={setTruckMake}
            placeholder={'Enter Truck Make'}
          />
          <InputLable name={'Truck Model'} />
          <NormalInput
            value={truckModel}
            onChangeText={setTruckModel}
            placeholder={'Enter Truck Model'}
          />
          <InputLable name={'Truck Year'} />
          <NormalInput
            value={truckYear}
            onChangeText={setTruckYear}
            placeholder={'Enter Truck Year'}
          />
        </View>
      }
      {isChecked2 && 
      <View>
         <InputLable name={'Trailer Make'} />
          <NormalInput
            value={trailerMake}
            onChangeText={setTrailerMake}
            placeholder={'Enter Trailer Make'}
          />
          <InputLable name={'Trailer Model'} />
          <NormalInput
            value={trailerModel}
            onChangeText={setTrailerModel}
            placeholder={'Enter Trailer Model'}
          />
          <InputLable name={'Trailer Year'} />
          <NormalInput
            value={trailerYear}
            onChangeText={setTrailerYear}
            placeholder={'Enter Trailer Year'}
          />
      </View>}
      <InputLable name={'Radius'} />
      <RadiusSlider radius={radius} setRadius={setRadius} />

      <InputLable name={'Location'} />
      <NormalInput
        value={location}
        onChangeText={setLocation}
        placeholder={'Enter or Set your Location'}
      />

      <InputLable name={'Vehicle Details'} />
      <LongInput
        longvalue={vehicleDetails}
        longonChangeText={setVehicleDetails}
        placeholder={'Enter Vehicle Details'}
      />

      {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Leader Board')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

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
    paddingBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
  },
  pickerinput: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 10,
  },
  
 
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
