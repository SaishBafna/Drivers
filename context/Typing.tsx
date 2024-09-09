// Typing.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Typing: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.typing}>Typing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  typing: {
    color: '#888',
    fontStyle: 'italic',
  },
});

export default Typing;
