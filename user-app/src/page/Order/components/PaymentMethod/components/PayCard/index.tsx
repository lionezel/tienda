import { CardField, StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { Button, Center, PresenceTransition, Text, View } from "native-base";
import React, { useState } from "react";
import stripe from "@stripe/stripe-react-native";
import { BillingDetails, CreditCardInfo } from "../../../../../../interfaces/CreditCardInfo";
import { Alert } from "react-native";


export const PayCard = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  const handlePayment = async () => {
    setLoading(true);

    
    }

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: 'Número de tarjeta',
          expiration: 'MM/AA',
          cvc: 'CVC',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button onPress={handlePayment} disabled={loading} />
    </View>
  );
};
