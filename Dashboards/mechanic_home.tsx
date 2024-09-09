import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MaterialSymbolsSearch,
  MdiClockOutline,
  Rightarrow,
} from '../Common/icon';
import FooterBar from '../Common/footer';
import { Picker } from '@react-native-picker/picker';

export const Mechanic_Home = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [selectedValue, setSelectedValue] = useState('Now');
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <MaterialSymbolsSearch />
          <TextInput
            style={styles.input}
            placeholder="Where to?"
            placeholderTextColor="#888"
          />
          <View style={styles.nowContainer}>
            <MdiClockOutline />
            <Picker
              selectedValue={selectedValue}
              style={styles.nowText}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Now" value="Now" />
              <Picker.Item label="Yestraday" value="Yestraday" />
              <Picker.Item label="Tomorrow" value="Tomorrow" />
            </Picker>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../Assets/Images/discount.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.topLeftTextContainer}>
            <Text style={[styles.text, styles.boldText]}>Finalize Payment:</Text>
            <Text style={[styles.text, styles.boldText]}>Rs.170.71</Text>
          </View>
          <View style={styles.bottomLeftTextContainer}>
            <Text style={styles.text}>Pay</Text>
            <Rightarrow />
          </View>
        </View>
        <View style={styles.service_section}>
          <Text style={styles.service_text}>Services</Text>
          <TouchableOpacity>
            <Text style={styles.buttonText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.service_container}>
          <TouchableOpacity
            style={styles.service_item}
            onPress={() => props.navigation.navigate('Post Service')}
          >
            <Image
              source={require('../Assets/Images/bg.png')}
              style={styles.service_image}
              resizeMode="contain"
            />
            <Text style={styles.service_item_text}>Post Mechanic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.service_item}
            onPress={() => props.navigation.navigate('Mechanic_service')}
          >
            <Image
              source={require('../Assets/Images/tow.png')}
              style={styles.service_image}
              resizeMode="contain"
            />
            <Text style={styles.service_item_text}>Request Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.service_item}
            onPress={() => props.navigation.navigate('Search Friends')}
          >
            <Image
              source={require('../Assets/Images/talk.png')}
              style={styles.service_image}
              resizeMode="contain"
            />
            <Text style={styles.service_item_text}>Talk to Friend</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },

  //searchBar Designs
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  nowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginVertical: 5,
    marginLeft: 15,
    height: 40,
  },
  nowText: {
    height: 30,
    flex: 1,
  },

  //Image designs
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 139,
    borderRadius: 15,
  },
  topLeftTextContainer: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 15,
    left: 20,
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },

  //service_section designs
  service_section: {
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
  },
  service_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },

  //service_container designs
  service_container: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 5,
  },
  service_item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  service_item_text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  service_image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
});

export default Mechanic_Home;
