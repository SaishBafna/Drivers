import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import apiClient from '../apiClient';
import LoaderKit from 'react-native-loader-kit';

const Update_kyc = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    incorporation: null,
    wsib: null,
    insurance: null,
    authorities: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFilePick = async (key: string) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFiles(prevState => ({
        ...prevState,
        [key]: result[0],
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    // Append each file to the FormData object
    if (selectedFiles.incorporation) {
      formData.append('articleOfIncorporation', {
        uri: selectedFiles.incorporation.uri,
        type: selectedFiles.incorporation.type,
        name: selectedFiles.incorporation.name,
      });
    }

    if (selectedFiles.wsib) {
      formData.append('wsibCertificate', {
        uri: selectedFiles.wsib.uri,
        type: selectedFiles.wsib.type,
        name: selectedFiles.wsib.name,
      });
    }

    if (selectedFiles.insurance) {
      formData.append('insuranceCertificate', {
        uri: selectedFiles.insurance.uri,
        type: selectedFiles.insurance.type,
        name: selectedFiles.insurance.name,
      });
    }

    if (selectedFiles.authorities) {
      formData.append('operatingAuthorities', {
        uri: selectedFiles.authorities.uri,
        type: selectedFiles.authorities.type,
        name: selectedFiles.authorities.name,
      });
    }

    try {
      const response = await apiClient.post('/mech-update-kyc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'KYC updated successfully');
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log('Error uploading files: ', error);
      Alert.alert('Error', 'Failed to update KYC');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Articles of Incorporation</Text>
        <View style={styles.fileInput}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleFilePick('incorporation')}>
            <Text style={styles.buttonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileName}>
            {selectedFiles.incorporation
              ? selectedFiles.incorporation.name
              : 'No file chosen'}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>WSIB Certificate</Text>
        <View style={styles.fileInput}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleFilePick('wsib')}>
            <Text style={styles.buttonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileName}>
            {selectedFiles.wsib ? selectedFiles.wsib.name : 'No file chosen'}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Insurance Certificate</Text>
        <View style={styles.fileInput}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleFilePick('insurance')}>
            <Text style={styles.buttonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileName}>
            {selectedFiles.insurance
              ? selectedFiles.insurance.name
              : 'No file chosen'}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Operating Authorities</Text>
        <View style={styles.fileInput}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleFilePick('authorities')}>
            <Text style={styles.buttonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileName}>
            {selectedFiles.authorities
              ? selectedFiles.authorities.name
              : 'No file chosen'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleSubmit}
        disabled={loading}>
        {loading ? (
          <LoaderKit
            style={{width: 30, height: 20}}
            name={'BallPulse'} // Optional: see list of animations below
            color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        ) : (
          <Text style={styles.updateButtonText}>Update</Text>
        )}
        {/* <Text style={styles.updateButtonText}>Update</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  fileName: {
    marginLeft: 10,
    fontSize: 14,
    color: '#A9A9A9',
    flex: 1,
    flexWrap: 'wrap',
  },
  updateButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Update_kyc;
