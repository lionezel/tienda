import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigation />
    </NativeBaseProvider>
  );
}
