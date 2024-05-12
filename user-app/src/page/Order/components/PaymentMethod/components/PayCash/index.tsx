import { Button, Center, PresenceTransition, Text } from 'native-base'
import React, { useState } from 'react'

export const PayCash = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Center>
    <Button onPress={() => setIsOpen(!isOpen)}>
      {isOpen ? "Efectivo" : "Efectivo"}
    </Button>
    <PresenceTransition
      visible={isOpen}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 250,
        },
      }}
    >
      <Center
        mt="7"
        bg="teal.500"
        rounded="md"
        w="200"
        h="100"
        _text={{
          color: "white",
        }}
      >
        Fade
      </Center>
    </PresenceTransition>
  </Center>
  )
}
