import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
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
import {LongInput, InputLable, NormalInput, FileInputBox, RadiusSlider} from '../Common/input_componenet';
import CheckBox from 'react-native-check-box';
import  apiClient  from '../apiClient';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Add_vehicle = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [truckMake, setTruckMake] = useState('');
  const [truckModel, setTruckModel] = useState('');
  const [truckYear, setTruckYear] = useState('');
  const [trailerMake, setTrailerMake] = useState('');
  const [trailerModel, setTrailerModel] = useState('');
  const [trailerYear, setTrailerYear] = useState('');
  const [vehiclenumber, setVehicleNumber] = useState('');

  
interface ApiErrorResponse {
  message: string;
}



  
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
      {isChecked1 && 
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
      }
      {isChecked2 && 
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
      </View>}

      

      

      <TouchableOpacity style={styles.button} >
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
    paddingBottom:30
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
    marginTop:10,
    marginBottom:30
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
});
