import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons
import { Pencil_icon } from '../Common/icon';
import * as ImagePicker from 'react-native-image-picker';


const AccountSettings = () => {

    const [profileImage, setProfileImage] = useState(null);

    const selectImage = () => {
      const options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      };
  
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri);
        }
      });
    };

  return (
    <View style={styles.container}>
      {/* Account Settings Heading */}
      <Text style={styles.header}>Account Settings</Text>
      
      {/* Profile Picture with Edit Icon */}
      <View style={styles.profileContainer}>
        <Image 
          source={require('../Assets/Images/profile.png')} 
          style={styles.profileImage} 
        />
         <TouchableOpacity style={styles.editIcon} onPress={selectImage}>
          <Pencil_icon />
        </TouchableOpacity>
      </View>
      
      {/* Name Input Field */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Deo"
        // editable={true} // Non-editable field
      />
      
      {/* Email Input Field */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="john@gmail.com"
        // editable={true} // Non-editable field
      />
      
      {/* Phone Input Field */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="+91-9865321470"
        // editable={true} // Non-editable field
      />
      
      {/* Address Input Field */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Flat No. 05, Wada Society, Nagar, Nashik"
        // editable={true} // Non-editable field
      />
      
      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 115,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    padding: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountSettings;
