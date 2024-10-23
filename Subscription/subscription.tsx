import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useStripe } from '@stripe/stripe-react-native';
import FooterBar from '../Common/footer';
import apiClient from '../apiClient';

const { width, height } = Dimensions.get('window');

export const Subscription = ({navigation}: {navigation: any}) => {
  const { initPaymentSheet, presentPaymentSheet, retrievePaymentIntent } = useStripe();
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSubscribe = async (priceId: string) => {
    try {
      const requestBody = {
        email: 'bafnasaish@gmail.com',
        name: 'Saish',
        priceId: priceId,
      };
      const response = await apiClient.post('payments/create-subscription', requestBody);
      console.log('API Response:', response.data);

      const { clientSecret } = response.data;

      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'Driverse',
        paymentIntentClientSecret: clientSecret,
      });

      if (initResponse.error) {
        console.error('Error initializing payment sheet:', initResponse.error);
        Alert.alert('Error', 'Failed to initialize payment. Please try again.');
        return;
      }

      const presentResult = await presentPaymentSheet();

      if (presentResult.error) {
        Alert.alert('Error', presentResult.error.message || 'Payment failed. Please try again.');
        return;
      } else {
        console.log('Payment successful');
        
        const { paymentIntent, error } = await retrievePaymentIntent(clientSecret);
        
        if (error) {
          console.error('Error retrieving PaymentIntent:', error);
          Alert.alert('Error', 'Payment was successful, but we couldn\'t retrieve the payment details.');
        } else {
          console.log('PaymentIntent:', paymentIntent);
          // Alert.alert('Success', `Your payment of ${paymentIntent.amount / 100} was successful!`);
          
          try {
            await apiClient.post(`payments/success?payment_id=${paymentIntent.id}&email=bafnasaish@gmail.com`);
          } catch (confirmError) {
            console.error('Error confirming subscription:', confirmError);
          }
          navigation.navigate('Success');

        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const plans = [
    {
      title: 'Basic Plan',
      price: '$9.99/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      priceId: 'price_1QB7p0RvFb9ZGon6FVi1ejDs',
      gradient: ['#000', '#434343'],
      textStyle: styles.lightText,
      buttonStyle: styles.lightButton,
      buttonTextStyle: styles.lightText,
    },
    {
      title: 'Premium Plan',
      price: '$19.99/month',
      features: ['All Basic Features', 'Premium Feature 1', 'Premium Feature 2'],
      priceId: 'price_premium_plan_id',
      gradient: ['#434343', '#000'],
      textStyle: styles.lightText,
      buttonStyle: styles.darkButton,
      buttonTextStyle: styles.darkText,
    },
    {
      title: 'Pro Plan',
      price: '$29.99/month',
      features: ['All Premium Features', 'Pro Feature 1', 'Pro Feature 2', 'Pro Feature 3'],
      priceId: 'price_pro_plan_id',
      gradient: ['#000', '#434343'],
      textStyle: styles.lightText,
      buttonStyle: styles.lightButton,
      buttonTextStyle: styles.lightText,
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {plans.map((plan, index) => (
            <View key={index} style={styles.planContainer}>
              <LinearGradient colors={plan.gradient} style={styles.planBox}>
                <Text style={[styles.planTitle, plan.textStyle]}>{plan.title}</Text>
                <Text style={[styles.planPrice, plan.textStyle]}>{plan.price}</Text>
                {plan.features.map((feature, i) => (
                  <Text key={i} style={[styles.planFeature, plan.textStyle]}>• {feature}</Text>
                ))}
                <TouchableOpacity
                  style={[styles.subscribeButton, plan.buttonStyle]}
                  onPress={() => handleSubscribe(plan.priceId)}
                >
                  <Text style={[styles.subscribeButtonText, plan.buttonTextStyle]}>Subscribe</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {plans.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentPage && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      </View>
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    // backgroundColor: '#121212',
  },
  container: {
    alignItems: 'center',
    marginTop:15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // marginBottom: 5,
    color: '#000',
  },
  planContainer: {
    width: width,
    height: height - 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planBox: {
    width: '80%',
    height: '80%',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  planFeature: {
    fontSize: 16,
    marginBottom: 10,
  },
  lightText: {
    color: '#fff',
  },
  darkText:{
    color:'#000'
  },
  subscribeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  darkButton: {
    backgroundColor: '#fff',
  },
  lightButton: {
    backgroundColor: '#000',
  },
  subscribeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
});

