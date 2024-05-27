import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { functions } from "../../firebase/config";

interface PaymentIntentResponse {
  clientSecret: string;
}

export const Checkout: React.FC = () => {
  const { confirmPayment } = useStripe();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    function isPaymentIntentResponse(data: any): data is PaymentIntentResponse {
      return typeof data === "object" && "clientSecret" in data;
    }

    try {
      const createPaymentIntent = functions().httpsCallable(
        "ext-firestore-stripe-payments-createPaymentIntent"
      );
      const response = await createPaymentIntent({
        amount: 1000,
        currency: "usd",
      });

      if ("data" in response && isPaymentIntentResponse(response.data)) {
        const clientSecret = response.data.clientSecret;

        const { error, paymentIntent } = await confirmPayment(clientSecret);

        if (error) {
          setError(error.message);
        } else if (paymentIntent) {
          if (paymentIntent.status === "Succeeded") {
            setSuccess(true);
          }
        }
      } else {
        throw new Error("La respuesta de la función de Firebase es inválida");
      }
    } catch (error: any) {
      setError(error.toString());
    }
    setLoading(false);
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
      <Button
        onPress={handlePayment}
        title={loading ? "Processing..." : "Pay"}
        disabled={loading}
      />
      {error && <Text>{error}</Text>}
      {success && <Text>Payment succeeded!</Text>}
    </View>
  );
};
