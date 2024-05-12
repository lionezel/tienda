import { AspectRatio, Box, Button, Center, Image, Text, View, useToast } from "native-base";
import React from "react";
import { GLOBAL_COLOR } from "./COLOR_GLOBAL";
import { ImageBackground } from "react-native";

interface ButtonBaseProps  {
  children: React.ReactNode;
  onPress?: () => void
}

export const ButtonBase = ({ children, onPress }: ButtonBaseProps) => {
  return (
    <View >
      <Button
        marginTop={4}
        width="100%"
        backgroundColor={GLOBAL_COLOR}
        height="50px"
        position="relative"
        onPress={onPress}
        borderRadius={120}
      >
       <Text bold>{children}</Text> 
      </Button>
    </View>
  );
};

export const ButtonBaseWarning = ({ children, onPress }: ButtonBaseProps) => {
  return (
    <View >
      <Button
        marginTop={4}
        width="100%"
        backgroundColor="#dd181f"
        height="50px"
        position="relative"
        onPress={onPress}
        borderRadius={120}
      >
       <Text bold>{children}</Text> 
      </Button>
    </View>
  );
};

export const ImageBase = ({ uri }: { uri: string }) => {
  return (
    <AspectRatio w="50%" position="relative" bottom={100}>
      <Image
        source={{
          uri,
        }}
        alt="image"
        borderRadius="100px"
      />
    </AspectRatio>
  );
};

export const Sucsses = () => {
  const toast = useToast();
  return <Center>
      <Button onPress={() => {
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  Hello! Have a nice day
                </Box>;
        }
      });
    }}>
        Custom Toast
      </Button>
    </Center>;
};
