import React from "react";
import { Box, Text, Pressable } from "native-base";

export const showToast  = ({ message, onClose, status }: any) => {
  const backgroundColor =
    status === "success"
      ? "green.500"
      : status === "error"
      ? "red.500"
      : "blue.500";

  return (
    <Pressable onPress={onClose}>
      <Box
        bg={backgroundColor}
        p={4}
        rounded="md"
        shadow={2}
        _dark={{ bg: "gray.700" }}
      >
        <Text fontSize="md" color="white">
          {message}
        </Text>
      </Box>
    </Pressable>
  );
};
