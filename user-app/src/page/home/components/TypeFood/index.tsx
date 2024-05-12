import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";

export const TypeFood = () => {
  return (
    <Box flex="0">
      <ScrollView
        _contentContainerStyle={{
          h: "40",
          px: "0px",
          mb: "4",
          minW: "72",
        }}
      >
        <VStack space="2.5" mt="4" px="8">
          <Stack direction="row" mb="2.5" mt="1.5" space={3}>
            <Center
              size="16"
              width="100"
              bg="primary.400"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Hamburguesas
            </Center>
            <Center
              bg="primary.500"
              size="16"
              width="100"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Salchipapas
            </Center>
            <Center
              size="16"
              width="100"
              bg="primary.700"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Bebidas
            </Center>
          </Stack>
          <Divider />
        </VStack>
      </ScrollView>
    </Box>
  );
};
