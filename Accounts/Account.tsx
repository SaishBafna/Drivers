import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons
import {Pencil_icon} from '../Common/icon';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../apiClient';
import LoaderKit from 'react-native-loader-kit';

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const fetchData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    setLoading(true);
    try {
      const response = await apiClient.get(`user/${user_id}`);
      setData(response.data.user);
      console.log(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append('username', name || data.username);
    formData.append('email', email || data.email);
    formData.append('phone', phone || data.phone);
    formData.append('companyAddress', address || data.companyAddress);

    // Only append the image if it was selected
    if (profileImage) {
      formData.append('avatar', {
        uri: profileImage,
        type: 'image/jpeg', // You can adjust this based on the image type
        name: 'profile.jpg',
      });
    }

    try {
      // Prepare JSON data

      // Make the API request with JSON body
      const response = await apiClient.patch('profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Profile Updated successfully!');
      // Handle success (you can display a success message, etc.)
      // console.log('Review submitted successfully:', response.data);
      setSubmitting(false);
    } catch (error) {
      // Handle error (e.g., display error message)
      setSubmitting(false);
      console.error('Error submitting review:', error.message || error);
      Alert.alert('Error', 'Failed to submit the review. Please try again.');
    } finally {
      setSubmitting(false); // Reset the loading/submitting state
    }
  };
  return (
    <>
    {loading ?  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoaderKit
              style={{ width: 50, height: 50 }}
              name={'BallPulseSync'}
              color={'black'}
            />
          </View> : 
    <View style={styles.container}>
      {/* Account Settings Heading */}
      <Text style={styles.header}>Account Settings</Text>

      {/* Profile Picture with Edit Icon */}
      <View style={styles.profileContainer}>
        <Image
          source={
            data.avatar?.url
              ? {uri: data.avatar?.url} // If the URL exists, use it
              : require('../Assets/Images/profile.png') // Otherwise, use the local image
          }
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
        defaultValue={data.username}
        onChangeText={setName}
        // editable={true} // Non-editable field
      />

      {/* Email Input Field */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="john@gmail.com"
        // editable={true} // Non-editable field
        defaultValue={data.email}
        onChangeText={setEmail}
      />

      {/* Phone Input Field */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="+91-9865321470"
        // editable={true} // Non-editable field
        defaultValue={data.phone}
        onChangeText={setPhone}
      />

      {/* Address Input Field */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Flat No. 05, Wada Society, Nagar, Nashik"
        // editable={true} // Non-editable field
        defaultValue={data.companyAddress}
        onChangeText={setAddress}
      />

      {/* Update Button */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleSubmit}
        disabled={submitting}>
        {submitting ? (
          <LoaderKit
            style={{width: 30, height: 20}}
            name={'BallPulse'} // Optional: see list of animations below
            color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        ) : (
          <Text style={styles.updateButtonText}>Update</Text>
        )}
      </TouchableOpacity>
    </View>
    }
    </>
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
