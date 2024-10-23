import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import FooterBar from '../Common/footer';
import CustomButton from '../Common/custombutton ';
import LoaderKit from 'react-native-loader-kit'; // Import the loader library

export const Search_friend = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  return (
    <View style={styles.outerContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Searching a friend for you</Text>
          <Text style={styles.subheading}>
            Be patient, good things are on their way.
          </Text>
          <View style={styles.imageContainer}>
            {/* Replace ImageBackground with the loader */}
            <LoaderKit
              style={{ width: 450, height: 450 }}
              name={'BallScaleMultiple'} // The animation you want
              color={'black'} // The color of the loader
              
            />
            {/* The profile image will still appear below the loader */}
            <View style={styles.profileContainer}>
              <Image
                source={require('../Assets/Images/profile.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </View>
          <CustomButton
            icon={<></>}
            title={'All Agents'}
            onPress={() => props.navigation.navigate('Friends')} disabled={undefined}          />
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
    marginBottom: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subheading: {
    fontSize: 15,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
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
