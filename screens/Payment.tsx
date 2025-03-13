import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { RootStackParamList } from '@/utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "Payment">;

const Payment = ({ navigation }: Props) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  // Fetch PaymentIntent client secret
  const fetchPaymentIntentClientSecret = async () => {
    try {
      const backendUrl = 'https://api.stripe.com/v1/payment_intents';
      const response = await axios.post(
        backendUrl,
        {
          amount: 1099,
          currency: 'usd',
          'payment_method_types[]': 'card', 
        },
        {
          headers: {
            'Authorization': 'Bearer sk_test_51R23SERhxaaIrfINR906dQH8P0F8wxQTqVmR6MD1t1hORhU4ssjahZ878ez9UxKs0OEWaPcr37nicMTW1TLHLYvM00SJHVgYGJ',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data.client_secret;
    } catch (error: any) {
      console.error('Error fetching client secret:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to fetch payment intent');
      return null;
    }
  };

  // Handle payment button press
  const onCheckoutPress = async () => {
    setLoading(true);
    try {
      // Fetch a new PaymentIntent client secret each time
      const clientSecret = await fetchPaymentIntentClientSecret();
      if (!clientSecret) return; // Handle the case where clientSecret is null

      // Initialize the payment sheet with the new clientSecret
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Interview Demo Store',
        paymentIntentClientSecret: clientSecret,
        style: 'alwaysLight',
      });
      
      if (initError) {
        console.log('Error initializing payment sheet:', initError.message);
        Alert.alert('Error', 'Failed to initialize payment sheet');
        return;
      }

      // Present the payment sheet
      const { error } = await presentPaymentSheet();
      if (error) {
        console.log('Payment failed:', error.message);
        Alert.alert('Payment Failed', error.message);
      } else {
        console.log('Payment succeeded');
        Alert.alert('Success', 'Payment completed successfully!');
        navigation.navigate('Home');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51R23SERhxaaIrfINxGiob3buzjludIYMYTZygbnMsazfi5bSy13XdlVjRolv9N90myTXnbjmTKnsypLcwZn4FntQ00bhi8s37R">
      <View style={styles.container}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.subtitle}>Total: $10.99</Text>
        <Text style={styles.info}>
          Note: This is a demo using a mocked clientSecret. In production, a server would
          generate a PaymentIntent.
        </Text>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onCheckoutPress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : 'Pay with Card'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.testInfo}>
          Use test card: 4242 4242 4242 4242, any future date, any CVC
        </Text>
      </View>
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#635BFF', // Stripe's brand color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  testInfo: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
