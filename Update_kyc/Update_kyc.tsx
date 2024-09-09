import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const Update_kyc = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    incorporation: null,
    wsib: null,
    insurance: null,
    authorities: null,
  });

  const handleFilePick = async (key: string) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFiles((prevState) => ({
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

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Articles of Incorporation</Text>
        <View style={styles.fileInput}>
          <TouchableOpacity style={styles.button} onPress={() => handleFilePick('incorporation')}>
            <Text style={styles.buttonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileName}>
            {selectedFiles.incorporation ? selectedFiles.incorporation.name : 'No file chosen'}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>WSIB Certificate</Text>
        <View style={styles.fileInput}>
          <TouchableOpacity style={styles.button} onPress={() => handleFilePick('wsib')}>
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
          <TouchableOpacity style={styles.button} onPress={() => handleFilePick('insurance')}>
            <Text style={styles.buttonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileName}>
            {selectedFiles.insurance ? selectedFiles.insurance.name : 'No file chosen'}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Operating Authorities</Text>
        <View style={styles.fileInput}>
          <TouchableOpacity style={styles.button} onPress={() => handleFilePick('authorities')}>
            <Text style={styles.buttonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileName}>
            {selectedFiles.authorities ? selectedFiles.authorities.name : 'No file chosen'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
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
