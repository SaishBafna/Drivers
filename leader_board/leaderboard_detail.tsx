import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import FooterBar from '../Common/footer';
import {
  Location_icon1,
  Phonecall,
  Phonecall_light,
  Star_icon,
  Verify_Tick,
} from '../Common/icon';
import apiClient from '../apiClient';

export const Leaderboard_detail = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {

  const phoneNumber = '+91-1234567890'; // Static number for now
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(false);
  
  const fetchData = async (page: number = 1, limit: number = 10) => {
    const {userId} = route.params;
    try {
   
        setLoading(true);
     

      const response = await apiClient.get(
        `user/${userId}`,
      );
      const comment_response = await apiClient.get(
        `reviews/${userId}`,
      );
      console.log(comment_response.data.reviews);
      setData(response.data.user);
      setReview(comment_response.data.reviews);
    } catch (error: any) {
      console.error('Error fetching data:', error.message || error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);
  
  const makePhoneCall = (phone:string) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Your device does not support this action');
        }
      })
      .catch((err) => console.error('Error occurred', err));
  };
  
  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.scroll}>
        <View style={styles.image}>
          <Image
            source={{uri: data.avatar?.url}}
            style={styles.icon}
          />
        </View>
        <View style={styles.listItem}>
          <View style={styles.nameContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.listTitle}>{data.username}</Text>
              <Verify_Tick />
            </View>
          </View>
          <View style={styles.listScore}>
            <Star_icon />
            <Text style={styles.listScoreText}>{data.averageRating}</Text>
          </View>
        </View>
        <View style={styles.address_section}>
          <Location_icon1 />
          <Text style={styles.address}>
          {data.companyAddress}
          </Text>
        </View>
        <View style={styles.details_section}>
          <Text style={styles.details}>
            Comprehensive brake inspection and repair services to ensure your
            vehicle's safety and performance.
          </Text>
        </View>
        <View style={styles.phone_section}>
          <Text style={styles.phone}>{data.phone}</Text>
          <TouchableOpacity style={styles.call_button} onPress={() => makePhoneCall(data.phone)}>
        <View style={styles.iconTextContainer}>
          <Phonecall_light />
          <Text style={styles.call_text}> Call</Text>
        </View>
      </TouchableOpacity>
        </View>
        <View style={styles.comment_section}>
          <Text style={styles.comment_title}>Comments</Text>
          {Array.isArray(review) && review.map((review: any, index: number) => {
  console.log(review.comments); // Logging the text before returning JSX
  
  return (
    <View style={styles.comment_card} key={index}>
      <View style={styles.name_section}>
        <View style={styles.img_name}>
          <Image
            source={{ uri: review.reviewerInfo.avatar?.url || 'fallback_image_url' }}
            style={styles.profile_icon}
          />
          <Text style={styles.comment_author}>{review.reviewerInfo.username}</Text>
        </View>
        <View style={styles.listScore_comment}>
          <Star_icon />
          <Text style={styles.listScoreText}>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.comment}>
        <Text style={styles.comment_text}>{review.comments.text}</Text>
      </View>
      <View>
        <Text style={styles.comment_date}>{review.date}</Text>
      </View>
    </View>
  );
})}


          <View style={styles.comment_card}>
          <View style={styles.name_section}>
            <View style={styles.img_name}>
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.profile_icon}
            />
            <Text style={styles.comment_author}>John Doe</Text>
            </View>
            <View style={styles.listScore_comment}>
              <Star_icon />
              <Text style={styles.listScoreText}>4.5</Text>
            </View>
          </View>
          <View style={styles.comment}>
            <Text style={styles.comment_text}>I highly recommend John deo to anyone looking for a reliable and knowledgeable mechanic.</Text>
          </View>
          <View>
            <Text style={styles.comment_date}>jan 18,2024</Text>
          </View>
          </View>
        </View>
      </ScrollView>
      <FooterBar />
      
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background color for overall app
    // paddingBottom: 20,
  },
  scroll: {
    marginBottom: 80,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20, // Adding bottom margin for spacing
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make image round
    borderColor: '#d1d1d1',
    borderWidth: 2, // Add a border to the profile picture
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 20,
    // backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    // elevation: 3, // Shadow for Android
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2}, // Shadow for iOS
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginRight: 8,
  },
  listScore: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffcc2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#fcd53f',
    borderWidth: 1,
  },
  listScore_comment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffcc2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#fcd53f',
    borderWidth: 1,
    marginLeft: 10, // Align with other elements
  },
  listScoreText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  address_section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f7ff',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  address: {
    fontSize: 18,
    color: '#007acc',
    marginLeft: 10,
  },
  details_section: {
    marginHorizontal: 25,
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  details: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, // Improve readability
  },
  phone_section: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  phone: {
    fontSize: 18,
    color: '#333',
  },
  call_button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  call_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  comment_section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  comment_title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  name_section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent:'space-between'
  },
  profile_icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  comment_author: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  img_name:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  comment:{
    marginHorizontal:10,
    marginVertical:10,
    textAlign:'justify'
  },
  comment_card:{
    backgroundColor:'#fff',
    paddingHorizontal:10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius:10,
    marginBottom:10
  },
  comment_text:{
    fontSize:16,
    color:'#000'
  },
  comment_date:{
    textAlign: 'right',
    marginVertical: 10,
  },
});

export default Leaderboard_detail;
