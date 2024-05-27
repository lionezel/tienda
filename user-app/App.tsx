import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";

import { StripeProvider } from "@stripe/stripe-react-native";
import { Navigation } from "./src";

export default function App() {
  return (
    <NativeBaseProvider>
      <StripeProvider publishableKey="pk_test_51P7Kr52K91G4lYWEKtUWLhsIn1n0qaqvsHHX7WxQ9JUtzfMEZvPwgtKqqWbl8cSq34q3M1AAkCHRBumcjNVoUB4R00rDyRrt0l">
        <Navigation />
      </StripeProvider>
    </NativeBaseProvider>
  );
}
