import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Box_tick, Pointer_icon, Rightarrow} from '../Common/icon';

const Account_Partnership = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.page_header}>Promos and Partnership</Text>
      </View>
      <TouchableOpacity style={styles.list_container} onPress={() => props.navigation.navigate('Promotion_extension')}>
        <View style={styles.icon_container}>
          <View style={styles.iconTextContainer}>
            <Box_tick />
            <Text style={styles.list_item}>Extending Expired Promotions</Text>
          </View>
        </View>
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
  page_header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  list_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  icon_container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    // alignItems: 'center', // Centers horizontally (if needed)
  },
  list_item: {
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Centers items vertically within the row
    fontSize: 20,
    marginLeft: 8,
    color: 'black',
  },

  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLine: {
    width: '100%', // Full width of the container or adjust as needed
    height: 0.5,
    backgroundColor: 'gray',
  },
});

export default Account_Partnership;
