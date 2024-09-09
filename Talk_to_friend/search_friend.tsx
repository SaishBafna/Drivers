import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import FooterBar from '../Common/footer';
import CustomButton from '../Common/custombutton ';

export const Search_friend = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  return (
    <View style={styles.outerContainer}>
      <ScrollView >
        <View style={styles.container}>
        <Text style={styles.heading}>Searching a friend for you</Text>
        <Text style={styles.subheading}>
          Be patient, good things are on their way.
        </Text>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('../Assets/Images/friend_search.png')}
            style={styles.friend_search}
            resizeMode="contain">
            <View style={styles.profileContainer}>
              <Image
                source={require('../Assets/Images/profile.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </ImageBackground>
        </View>
        <CustomButton icon={<></>} title={'All Agents'} onPress={() => props.navigation.navigate('Friends')}/>
        {/* <CustomButton icon={<></>} title={'Cancel'} onPress={() => props.navigation.navigate('Friends')}/> */}
        </View>
      </ScrollView>
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
    marginBottom:80
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginTop: 20,
    color: '#000',
  },
  subheading: {
    fontSize: 15,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -35,
    marginBottom:-35
  },
  friend_search: {
    width: '100%',
    height: 480,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  profileContainer: {
    position: 'absolute',
    top: '54.8%',
    left: '56.5%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
});

