import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import FooterBar from '../Common/footer';
import {
  Location_icon1,
  Phonecall,
  Phonecall_light,
  Star_icon,
  Star_icon_big,
  Star_icon_stroke,
  Verify_Tick,
} from '../Common/icon';
import apiClient from '../apiClient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons
import CustomButton from '../Common/custombutton ';
import LoaderKit from 'react-native-loader-kit';

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
  const [Submitting, setSubmitting] = useState(false);
  const [review, setReview] = useState(false);
  const [avgrating, setAvgrating] = useState();
  const [modalVisible1, setModalVisible1] = useState(false); // Modal visibility state
  const [rating, setRating] = useState(0); // Rating state
  const [comment, setComment] = useState(''); // Comment state
  const [replycomment, setreplySubmitting] = useState(false); // Comment state
  const [reviewId, setReviewId] = useState(''); // Comment state

  const fetchData = async (page: number = 1, limit: number = 10) => {
    const { userId } = route.params;
    const { AverageRating } = route.params;
    setAvgrating(AverageRating);
    try {
        setLoading(true);

        const response = await apiClient.get(`user/${userId}`);
        // const comment_response = await apiClient.get(`reviews/${userId}`);

        setData(response.data.user);
        
        // Check if comment_response has data
            // setReview(comment_response.data.reviews);
        
    } catch (error: any) {
        console.error('Error fetching data:', error.message || error);
    } finally {
        setLoading(false);
    }
};


  const handleReply = async () => {
    setreplySubmitting(true); // Set the loading/submitting state
    const {userId} = route.params;
    console.log(reviewId);
    try {
      // Prepare JSON data
      const requestBody = {
        comment,
      };

      // Log the request body for debugging
      console.log('Request Body:', requestBody);

      // Make the API request with JSON body
      const response = await apiClient.post(
        `/reviews/${reviewId}/comment`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Add the token here
          },
        },
      );

      Alert.alert('Success', 'Your request has been submitted successfully!');
      // Handle success (you can display a success message, etc.)

      // Add the new comment to the existing reviews state
      fetchData();
      setModalVisible1(false);
      console.log('Review submitted successfully:', response.data);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error submitting review:', error.message || error);
      Alert.alert('Error', 'Failed to submit the review. Please try again.');
    } finally {
      setreplySubmitting(false); // Reset the loading/submitting state
    }
  };

  const handleRate = async () => {
    setSubmitting(true); // Set the loading/submitting state
    const {userId} = route.params;

    try {
      // Prepare JSON data
      const requestBody = {
        rating,
        comment,
      };

      // Log the request body for debugging
      console.log('Request Body:', requestBody);

      // Make the API request with JSON body
      const response = await apiClient.post(`/reviews/${userId}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Alert.alert('Success', 'Your request has been submitted successfully!');
      // Handle success (you can display a success message, etc.)
      console.log('Review submitted successfully:', response.data);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error submitting review:', error.message || error);
      Alert.alert('Error', 'Failed to submit the review. Please try again.');
    } finally {
      setSubmitting(false); // Reset the loading/submitting state
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  // Function to open the modal
  const openModal = (review_id: any) => {
    setModalVisible1(true);
    setReviewId(review_id);
  };

  // Function to close the modal
  const closeModal = () => setModalVisible1(false);

  const makePhoneCall = (phone: string) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Your device does not support this action');
        }
      })
      .catch(err => console.error('Error occurred', err));
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.scroll}>
        <View style={styles.image}>
          {data.avatar?.url ? (
            <Image source={{uri: data.avatar?.url}} style={styles.icon} />
          ) : (
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.icon}
            />
          )}

          {/* <Image
            source={{uri: data.avatar?.url}}
            style={styles.icon}
          /> */}
        </View>
        <View style={styles.listItem}>
          <View style={styles.nameContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.listTitle}>{data.username}</Text>
              <Verify_Tick />
            </View>
          </View>
          {/* Rating Section with Touchable */}
          <TouchableOpacity style={styles.listScore}>
            <Star_icon />
            <Text style={styles.listScoreText}>
              {avgrating && avgrating.toFixed(1)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.address_section}>
          <Location_icon1 />
          <Text style={styles.address}>{data.companyAddress}</Text>
        </View>
        <View>
          <View style={styles.phone_section}>
            <Text style={styles.phone}>{data.phone}</Text>
            <TouchableOpacity
              style={styles.call_button}
              onPress={() => makePhoneCall(data.phone)}>
              <View style={styles.iconTextContainer}>
                <Phonecall_light />
                <Text style={styles.call_text}> Call</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* This is rating form */}
          <View style={styles.ratingModalOverlay}>
            <View style={styles.ratingModalContent}>
              {/* Rating Heading */}
              <Text style={styles.ratingModalHeader}>Rate Us</Text>

              {/* 5 Stars Rating */}
              <View style={styles.ratingStarContainer}>
                {Array.from({length: 5}, (_, index) => {
                  const starNumber = index + 1;
                  return (
                    <TouchableOpacity
                      key={starNumber}
                      onPress={() => setRating(starNumber)}>
                      {starNumber <= rating ? (
                        <Star_icon_big /> // Filled star
                      ) : (
                        <Star_icon_stroke /> // Transparent star (non-selected)
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Comment Section */}
              <Text style={styles.ratingCommentLabel}>Comment:</Text>
              <TextInput
                style={styles.ratingTextArea}
                multiline={true}
                numberOfLines={4}
                placeholder="Write your comment here..."
                value={comment}
                onChangeText={setComment}
              />

              {/* Submit Button */}
              <View>
                <CustomButton
                  icon={<></>}
                  title={
                    Submitting ? (
                      <LoaderKit
                        style={{width: 30, height: 20}}
                        name={'BallPulse'} // Optional: see list of animations below
                        color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                      />
                    ) : (
                      'Submit'
                    )
                  }
                  onPress={handleRate}
                  disabled={Submitting} // Disable the button while loading
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.comment_section}>
          <Text style={styles.comment_title}>Comments</Text>
          {Array.isArray(review) &&
            review.map((review: any, index: number) => {
              // console.log(review); // Logging the text before returning JSX

              return (
                <View style={styles.comment_card} key={index}>
                  <View style={styles.name_section}>
                    <View style={styles.img_name}>
                      <Image
                        source={require('../Assets/Images/profile.png')}
                        // source={{ uri: review.reviewerInfo.avatar?.url || 'fallback_image_url' }}
                        style={styles.profile_icon}
                      />
                      <View>
                        <Text style={styles.comment_author}>
                          {review.reviewerInfo.username}
                        </Text>
                        <Text style={styles.email}>
                          {review.reviewerInfo.email}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.listScore_comment}>
                      <Star_icon />
                      <Text style={styles.listScoreText}>{review.rating}</Text>
                    </View>
                    
                  </View>
                  <View><Text style={styles.comment}>{review.review}</Text></View>
                  {Array.isArray(review.comments) &&
                    review.comments.map(
                      (comment: any, commentIndex: number) => {
                       
                        return (
                          <View
                            style={styles.comment1}
                            key={commentIndex}>
                            <View style={styles.name_section}>
                              <View style={styles.img_name}>
                                <Image
                                  source={{
                                    uri:
                                      comment.commenter.avatar ||
                                      require('../Assets/Images/profile.png'),
                                  }}
                                  style={styles.profile_icon}
                                />
                                <View>
                                  <Text style={styles.comment_author}>
                                    {comment.commenter.username}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <Text style={styles.comment_text}>
                              {comment.text}
                            </Text>
                            <TouchableOpacity
                              onPress={() => openModal(review._id)}>
                              <Text style={styles.reply}>Reply</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      },
                    )}

                  <View>
                    <Text style={styles.comment_date}>{review.date}</Text>
                  </View>
                </View>
              );
            })}
        </View>

        {/* Modal for Rating */}
        {modalVisible1 && (
          <Modal
            transparent={true}
            visible={modalVisible1}
            animationType="slide"
            onRequestClose={closeModal}>
            <View style={styles.ratingModalOverlay1}>
              <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.ratingModalOverlayTouchable1} />
              </TouchableWithoutFeedback>
              <View style={styles.ratingModalContent1}>
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.ratingCloseButton}
                  onPress={closeModal}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                {/* Rating Heading */}
                <Text style={styles.ratingModalHeader}>Reply Comment</Text>

                {/* 5 Stars Rating */}

                {/* Comment Section */}
                <Text style={styles.ratingCommentLabel1}>Comment:</Text>
                <TextInput
                  style={styles.ratingTextArea}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Write your comment here..."
                  value={comment}
                  onChangeText={setComment}
                />

                {/* Submit Button */}
                <CustomButton
                  icon={<></>}
                  title={
                    replycomment ? (
                      <LoaderKit
                        style={{width: 30, height: 20}}
                        name={'BallPulse'} // Optional: see list of animations below
                        color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                      />
                    ) : (
                      'Submit'
                    )
                  }
                  onPress={handleReply}
                  disabled={replycomment} // Disable the button while loading
                />
              </View>
            </View>
          </Modal>
        )}
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
    marginTop: 20,
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
    justifyContent: 'space-between',
  },
  profile_icon: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  comment_author: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 12,
  },
  img_name: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: 'justify',
    fontSize: 16,
    color: '#000',
  },
  comment1: {
    marginHorizontal: 10,
    // marginVertical: 10,
    marginLeft:20,
    textAlign: 'right',

  },
  reply: {
    // marginTop: 10,
    color: 'blue',
  },
  comment_card: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  comment_text: {
    fontSize: 16,
    color: '#000',
  },

  comment_date: {
    textAlign: 'right',
    marginVertical: 10,
  },
  rating_overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ratingModalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  ratingModalOverlayTouchable: {
    flex: 1,
  },
  ratingModalContent: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%', // Full height
    padding: 20,
    // justifyContent: 'center',
  },
  ratingCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  ratingModalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // marginTop: 40,
    // textAlign: 'center',
  },
  ratingStarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  ratingStar: {
    marginHorizontal: 5,
  },
  ratingCommentLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  ratingTextArea: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    height: 50,
    marginBottom: 20,
  },
  rating_overlay1: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ratingModalOverlay1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  ratingModalOverlayTouchable1: {
    flex: 1,
  },
  ratingModalContent1: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '50%', // Full height
    padding: 20,
    // justifyContent: 'center',
  },
  ratingCloseButton1: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  ratingModalHeader1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    // textAlign: 'center',
  },
  ratingStarContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  ratingStar1: {
    marginHorizontal: 5,
  },
  ratingCommentLabel1: {
    fontSize: 18,
    marginBottom: 10,
  },
  ratingTextArea1: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    height: 100,
    marginBottom: 20,
  },
  ratingSubmitButton: {
    backgroundColor: '#000', // Blue background
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  ratingSubmitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Leaderboard_detail;
