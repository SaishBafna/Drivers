import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
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
  FileInputBox,
  RadiusSlider,
} from '../Common/input_componenet';
//@ts-ignore
import CheckBox from 'react-native-check-box';
import apiClient from '../apiClient';
import {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiErrorResponse {
  message: string;
}

export const Update_vehicle = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [truckMake, setTruckMake] = useState('');
  const [truckModel, setTruckModel] = useState('');
  const [truckYear, setTruckYear] = useState('');
  const [trailerMake, setTrailerMake] = useState('');
  const [trailerModel, setTrailerModel] = useState('');
  const [trailerYear, setTrailerYear] = useState('');
  const [vehiclenumber, setVehicleNumber] = useState('');

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const {VehicleID} = route.params;
      const response = await apiClient.get(`vehicles/${VehicleID}`);
      const vehicles = response.data.GetVehicle;

      setData(vehicles);

      if(vehicles.vehicleType === 'Truck'){
        setIsChecked1(true);
      }else{
        setIsChecked1(false);
      }

      if(vehicles.vehicleType === 'Trailer'){
        setIsChecked2(true);
      }else{
        setIsChecked2(false);
      }
      setTruckMake(vehicles.truckDetails?.make || null);
      setTruckModel(vehicles.truckDetails?.model || null);
      setTruckYear(vehicles.truckDetails?.year.toString() || null);
      setTrailerMake(vehicles.trailerDetails?.make || null);
      setTrailerModel(vehicles.trailerDetails?.model || null);
      setTrailerYear(vehicles.trailerDetails?.year.toString() || null);
      setVehicleNumber(vehicles.vehicleNumber || null);
  

      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching data:', error.message || error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    let vehicleType = '';
    const {VehicleID} = route.params;

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
        truckDetails: {
          make: truckMake,
          model: truckModel,
          year: truckYear,
        },
      };
    }

    if (isChecked2) {
      vehicleData = {
        trailerDetails: {
          make: trailerMake,
          model: trailerModel,
          year: trailerYear,
        },
      };
    }

    const payload = {
      vehicleNumber: vehiclenumber.toUpperCase(),
      vehicleType: vehicleType, // Adjust casing if needed
      ...vehicleData,
    };

    try {
      const response = await apiClient.put(`vehicles/${VehicleID}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      });

      if (response) {
        console.log(response.data)
        Alert.alert('Success', 'Your request has been submitted successfully!');
        // props.navigation.navigate('Leader Board');
      } else {
        //@ts-ignore
        Alert.alert('Error', response.data || 'Something went wrong!');
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.log(err);
      Alert.alert(
        'Error',
        err.response?.data?.message ||
          'Something went wrong. Please try again later.',
      );
    }
  };

  return (
    <ScrollView style={styles.body}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={true}
      />

      <InputLable name={'Vehicle Number'} />
      <NormalInput
        value={vehiclenumber}
        onChangeText={setVehicleNumber}
        placeholder={'Enter Vehicle Number'}
      />

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
      {isChecked1 && (
        <View>
          <InputLable name={'Truck Details'} />
          <NormalInput
            value={truckMake}
            onChangeText={setTruckMake}
            placeholder={'Enter Truck Make'}
          />
          <NormalInput
            value={truckModel}
            onChangeText={setTruckModel}
            placeholder={'Enter Truck Model'}
          />
          <NormalInput
            value={truckYear}
            onChangeText={setTruckYear}
            placeholder={'Enter Truck Year'}
          />
        </View>
      )}
      {isChecked2 && (
        <View>
          <InputLable name={'Trailer Details'} />
          <NormalInput
            value={trailerMake}
            onChangeText={setTrailerMake}
            placeholder={'Enter Trailer Make'}
          />
          <NormalInput
            value={trailerModel}
            onChangeText={setTrailerModel}
            placeholder={'Enter Trailer Model'}
          />
          <NormalInput
            value={trailerYear}
            onChangeText={setTrailerYear}
            placeholder={'Enter Trailer Year'}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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

  //picker input designs
  pickerinput: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 16,
    color: '#000',
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
