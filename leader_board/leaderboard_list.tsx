import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Easing,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import FooterBar from '../Common/footer';
import CustomButton from '../Common/custombutton ';
import {
  Direction_icon,
  Filter_icon,
  Information_icon,
  Location_icon,
  MaterialSymbolsSearch,
  Message_icon,
  Phonecall_icon,
  Star_icon,
  Verify_Tick,
} from '../Common/icon';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons


export const Leaderboard_list = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [activeOptions, setActiveOptions] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [rating, setRating] = useState(0); // Rating value (1-5)
  const [comment, setComment] = useState(''); // Comment text

  const openModal1 = () => {
    setModalVisible1(true);
  };

  const closeModal = () => {
    setModalVisible1(false);
  };

  const submitRating = () => {
    // Submit the rating and comment to the backend here
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    closeModal(); // Close modal after submission
  };

  const openFilterModal = () => {
    setModalVisible(true);
  };

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const toggleOption = (option: string) => {
    setActiveOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const isActive = (option: string) => activeOptions.includes(option);

  function openModal(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.outerContainer}>
        <View style={styles.container}>
      <MaterialSymbolsSearch />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
        <Filter_icon />
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeFilterModal}
      >
        <TouchableWithoutFeedback onPress={closeFilterModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Filter by...</Text>
                <View style={styles.hrLine} />
                <View style={styles.filterOption}>
                  <Text style={styles.optionTitle}>Nearby Towns and Cities:</Text>
                  <View style={styles.optionContainer}>
                    {['Daly City, California', 'Brisbane, California', 'Sausalito, California'].map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.optionValue,
                          isActive(option) && styles.activeOption,
                        ]}
                        onPress={() => toggleOption(option)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            isActive(option) && styles.activeOptionText,
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.filterOption}>
                  <Text style={styles.optionTitle}>Rating:</Text>
                  <View style={styles.optionContainer}>
                    {['Low', 'Medium', 'High'].map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.optionValue,
                          isActive(option) && styles.activeOption,
                        ]}
                        onPress={() => toggleOption(option)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            isActive(option) && styles.activeOptionText,
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.icon}
            />
            <View style={styles.nameContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.listTitle}>User Name</Text>
                <Verify_Tick />
              </View>
              <View style={styles.listbody}>
            <Text>
              <Location_icon />
            </Text>
            <Text style={styles.listaddress}>
              {' '}
              Rani Nagar, Shivaji Chowk, Nashik, Maharashtra
            </Text>
          </View>
            </View>
            <TouchableOpacity style={styles.listScore} onPress={openModal1}>
        <Star_icon />
        <Text style={styles.listScoreText}>4.5</Text>
      </TouchableOpacity>

      {modalVisible1 && (
         <Modal
         transparent={true}
         visible={modalVisible1}
         animationType="slide"
         onRequestClose={closeModal}
       >
         <View style={styles.ratingModalOverlay}>
           <TouchableWithoutFeedback onPress={closeModal}>
             <View style={styles.ratingModalOverlayTouchable} />
           </TouchableWithoutFeedback>
           <View style={styles.ratingModalContent}>
             {/* Close Button */}
             <TouchableOpacity style={styles.ratingCloseButton} onPress={closeModal}>
             <Icon name="close" size={24} color="#000" />
             </TouchableOpacity>
             
             {/* Rating Heading */}
             <Text style={styles.ratingModalHeader}>Rating</Text>
             
             {/* 5 Stars Rating */}
             <View style={styles.ratingStarContainer}>
               {Array.from({ length: 5 }, (_, index) => {
                 const starNumber = index + 1;
                 return (
                   <TouchableOpacity
                     key={starNumber}
                     onPress={() => setRating(starNumber)}
                   >
                      <Icon
                      name={starNumber <= rating ? 'star' : 'star-outline'} // Filled star or outline based on rating
                      size={30}
                      color="#FFD700" // Yellow color for selected stars
                      style={styles.ratingStar}
                    />
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
             <TouchableOpacity style={styles.ratingSubmitButton} onPress={submitRating}>
               <Text style={styles.ratingSubmitButtonText}>Submit</Text>
             </TouchableOpacity>
           </View>
         </View>
       </Modal>
      )}
          </View>
          
          {/* <View style={styles.listbody}>
            <Text>
              <Message_icon />
            </Text>
            <Text style={styles.listaddress}>
              {' '}
              "I highly recommend Jonh Doe to anyone looking for a reliable and
              knowledgeable mechanic"
            </Text>
          </View> */}
          {/* <View>
            <Text style={styles.listdate}>15/07/2024 - 10:00 AM</Text>
          </View> */}
          {/* <View style={styles.listfooter}>
            <View style={styles.listfooter1}>
            <View > 
              <View style={styles.icons}>
                <View style={styles.iconWrapper}>
                  <Direction_icon />
                </View>
              </View>
                             
                <Text style={{fontSize:10, textAlign:'center'}}>Direction</Text>
              </View>
              <TouchableOpacity style={styles.icons} onPress={() => props.navigation.navigate('Leader Board Details')}>
                <View style={styles.iconWrapper}>
                  <Information_icon />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.icons}>
                <View style={styles.iconWrapper}>
                  <Phonecall_icon />
                </View>
              </View>
            </View>
          </View> */}
        </View>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Image
              source={require('../Assets/Images/profile.png')}
              style={styles.icon}
            />
            <View style={styles.nameContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.listTitle}>User Name</Text>
                <Verify_Tick />
              </View>
            </View>
            <View style={styles.listScore}>
              <Star_icon />
              <Text style={styles.listScoreText}>4.5</Text>
            </View>
          </View>
          <View style={styles.listbody}>
            <Text>
              <Location_icon />
            </Text>
            <Text style={styles.listaddress}>
              {' '}
              Rani Nagar, Shivaji Chowk, Nashik, Maharashtra
            </Text>
          </View>
          <View style={styles.listbody}>
            <Text>
              <Message_icon />
            </Text>
            <Text style={styles.listaddress}>
              {' '}
              "I highly recommend Jonh Doe to anyone looking for a reliable and
              knowledgeable mechanic"
            </Text>
          </View>
          <View>
            <Text style={styles.listdate}>15/07/2024 - 10:00 AM</Text>
          </View>
          <View style={styles.listfooter}>
            <View style={styles.listfooter1}>
              <View style={styles.icons}>
                <View style={styles.iconWrapper}>
                  <Direction_icon />
                </View>
              </View>
              <TouchableOpacity style={styles.icons}>
                <View style={styles.iconWrapper}>
                  <Information_icon />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.icons}>
                <View style={styles.iconWrapper}>
                  <Phonecall_icon />
                </View>
              </View>
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
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8', // Light grey background
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  scroll: {
    marginBottom: 85,
  },
  icon: {
    marginRight: 5,
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    color: '#000',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#FFF', // White background for filter button
    marginLeft: 5,
  },
  filterText: {
    marginLeft: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff', // White background for list container
    borderRadius: 10,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 1}, // Offset for the shadow
    shadowOpacity: 0.1, // Shadow opacity (thin shadow)
    shadowRadius: 2, // Blur radius for the shadow
    elevation: 2, // Android shadow
  },

  listItem: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  titleRow: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginRight: 5, // Optional: Add space between text and icon
  },
  listSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  listScore: {
    position: 'absolute',
    right: -4,
    top: 2,
    backgroundColor: '#fffcc2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fcd53f',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listScoreText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  rating_overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ratingModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  ratingModalOverlayTouchable: {
    flex: 1,
  },
  ratingModalContent: {
    backgroundColor: '#FFF',
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
    marginTop:40
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
  listbody: {
    marginTop: 5,
    flexDirection: 'row',
  },
  listaddress: {
    fontSize: 12,
    color: '#000',
    textAlign: 'left',
    marginLeft: 5,
  },
  listdate: {
    textAlign: 'right',
    marginTop: 10,
  },
  listfooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  listfooter1: {
    flexDirection: 'row',
  },
  icons: {
    width: 35,
    height: 35,
    borderRadius: 10,
    borderColor: '#858585', // Black border color
    borderWidth: 2, // Width of the border
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    margin: 5,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center', // Center icon horizontally
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly darker background to enhance blur effect
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '50%', // Only covers 50% of the screen height
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hrLine: {
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  filterOption: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wraps options to the next line if they exceed screen width
  },
  optionValue: {
    fontSize: 14,
    color: '#0F52BA',
    marginBottom: 5,
    backgroundColor: '#BCD4E6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#0F52BA',
    borderRadius: 25,
    marginRight: 5, // Adds spacing between options
  },
  optionText: {
    color: '#0F52BA',
  },
  activeOption: {
    backgroundColor: '#0F52BA', // Blue background for active option
  },
  activeOptionText: {
    color: '#FFF', // White text color for active option
  },
});
