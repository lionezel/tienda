import { Avatar, Button, ScrollView, Text, View } from "native-base";
import { ImageBackground } from "react-native";
import {
  GLOBAL_BACKGROUND,
  GLOBAL_COLOR,
} from "../../../../GLOBAL/COLOR_GLOBAL";
import { Form, SingOut } from "./components";
import { useFetchUser } from "../../../../hooks/useFetchUser";

export const UserInfo = () => {
  const userData = useFetchUser();

  return (
    <ScrollView w="100%">
      <ImageBackground source={{ uri: GLOBAL_BACKGROUND }}>
        <View
          padding={10}
          marginTop="30%"
          backgroundColor="white"
          width="100%"
          borderRadius="40px"
          height="full"
        >
          <View alignItems="center" bottom="100px">
            <Avatar
              alignItems="center"
              textAlign="center"
              mr="1"
              width="150px"
              height="150px"
              source={{}}
            >
              {userData?.displayName
                ? userData?.displayName.substring(0, 2).toUpperCase()
                : "RS"}
            </Avatar>
          </View>

          <View
            background={GLOBAL_COLOR}
            borderRadius="20px"
            width="20%"
            height="6%"
            alignItems="center"
            bottom="150px"
            padding="10px"
          >
            <SingOut />
          </View>

          {userData ? <Form userData={userData} /> : <Text>Not found</Text>}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
