import {Picker} from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ScrollView,
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

export const Post_Service = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {

  const [selectedValue, setSelectedValue] = useState('');
  const [radius, setRadius] = useState(25); // Added state for radius

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
      <InputLable name={'Service Type'} />
      <Picker style={styles.pickerinput}  
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Select the Prefered Language" value="" />
        <Picker.Item label="Oil Leakage" value="oil_leakage" />
        <Picker.Item label="Break Fail" value="break_fail" />
        <Picker.Item label="Replace Air Filter" value="replace_air_filter" />
        <Picker.Item label="Coolant" value="collant" />
        <Picker.Item label="Spark Plug" value="spark_plug" />
        <Picker.Item label="Other" value="other" />
      </Picker>

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

      <InputLable name={'Price'} />
      <NormalInput
        value={''}
        onChangeText={''}
        placeholder={'Enter Price'}
      />


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
