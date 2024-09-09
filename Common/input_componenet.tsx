import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Text, Button, Alert, ScrollView, Image } from 'react-native';
import { IconoirEyeOff, IconoirEye, MdiClockOutline } from './icon'; // Assuming these imports are correct
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const NormalInput = ({ value, onChangeText, placeholder }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType="email-address"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const LongInput = ({ longvalue, longonChangeText, placeholder }) => {
  return (
    <View>
      <TextInput
        style={styles.long_input}
        placeholder={placeholder}
        keyboardType="email-address"
        value={longvalue}
        onChangeText={longonChangeText}
      />
    </View>
  );
};

export const InputLable = ({ name }) => {
  return (
    <View>
      <Text style={styles.lable}>{name}</Text>
    </View>
  );
};


export const TimeInput = () => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formattedTime, setFormattedTime] = useState('--:--');

  const onChange = (event: any, selectedTime: Date) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    setFormattedTime(`${hours}:${minutes}`);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={showTimepicker}>
        <TextInput
          style={styles.time_input}
          value={formattedTime}
          editable={false}
        />
        <MdiClockOutline />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};


export const RadiusSlider = ({radius, setRadius}) => {
  const handleValueChange = (value: number) => {
    setRadius(Math.round(value));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderMain}>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={500}
            minimumTrackTintColor="#000000"
            thumbTintColor="#000000"
            value={radius}
            onValueChange={handleValueChange}
          />
        </View>
        <Text style={styles.value}>{radius} km</Text>
      </View>
    </View>
  );
};

export const FileInputBox = ({ images, setImages }) => {
  const handleImageSelection = () => {
    Alert.alert(
      "Select Option",
      "Choose an option to add images",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Select from Gallery",
          onPress: selectImages
        },
        {
          text: "Capture with Camera",
          onPress: captureImage
        }
      ],
      { cancelable: true }
    );
  };

  const selectImages = () => {
    launchImageLibrary({ selectionLimit: 0, mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setImages([...images, ...response.assets]);
      }
    });
  };

  const captureImage = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setImages([...images, ...response.assets]);
      }
    });
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };
  return (
    <View style={styles.container}>
      <View style={styles.fileInputContainer}>
      <TouchableOpacity style={styles.chooseFileButton} onPress={handleImageSelection}>
          <Text style={styles.chooseFileButtonText}>Choose File or Image</Text>
        </TouchableOpacity>
        <Text style={styles.fileName}>
          {'Choose Files'}
        </Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {images && images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: image.uri }}
              style={styles.image}
            />
           <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
    marginBottom: 15,
  },

  long_input: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 5,
    height: 100,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
  },

  lable: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },

  container: {
    alignItems: 'center',
    marginBottom: 10,
  },

  // time inputs designs
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 170,
    justifyContent: 'space-between',
  },
  time_input: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },


  //radius selecteor designs
  sliderMain:{
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  sliderContainer: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  slider: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',  // Ensure the slider itself is transparent
  },
  value: {
    fontSize: 16,
    // marginTop: 10,
  },

  //file picker designs
  fileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  chooseFileButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginRight: 10,
  },
  chooseFileButtonText: {
    color: '#000',
  },
  fileName: {
    color: '#999',
    flex: 1,
  },
  fileInfo: {
    marginTop: 10,
  },
  fileSize: {
    fontSize: 14,
    color: 'gray',
  },

  //images designs
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
});

