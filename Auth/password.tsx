import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { IconoirEyeOff, IconoirEye } from '../Common/icon'; // Assuming these imports are correct

const PasswordInput = ({ passwordvalue, passwordpass }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="******"
        secureTextEntry={!isPasswordVisible}
        value={passwordvalue}
        onChangeText={passwordpass}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? <IconoirEye /> : <IconoirEyeOff />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default PasswordInput;
