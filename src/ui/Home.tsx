import {
  Flex,
  Box,
  Heading,
  Button,
  Text,
  VStack,
  Input,
  Spacer,
  FormControl,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { AiFillFire } from "react-icons/ai";
import React, { useEffect } from "react";
import { useCreateRoom } from "../hooks";

export default function Home() {
  const { mutate: createRoom, data: newRoom } = useCreateRoom();

  useEffect(() => {
    if (newRoom) {
      document.location.search = `?roomId=${newRoom}`;
    }
  }, [newRoom]);

  return (
    <Flex direction="column" h={window.innerHeight}>
      <HStack px={5} h="58px" bg="teal.500" shadow="base">
        <Icon as={AiFillFire} w="30px" h="30px" color="white" />
        <Heading color="white" size="md">
          Firebuzz
        </Heading>
      </HStack>
      <Box m={8} />
      <VStack spacing="48px">
        <Box
          rounded="md"
          w={[300, 400]}
          p={2}
          shadow="md"
          border="1px"
          borderColor="gainsboro"
        >
          <form>
            <VStack p={4} align="start" spacing={8}>
              <Heading size="sm">Join a game</Heading>
              <Flex w="258px" align="center">
                <FormControl isRequired>
                  <Input
                    name="roomId"
                    variant="flushed"
                    placeholder="Room number"
                    maxW="40"
                  />
                </FormControl>
                <Spacer />
                <Button variant="outline" colorScheme="teal" type="submit">
                  Join
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
        <Box
          rounded="md"
          w={[300, 400]}
          p={2}
          shadow="md"
          border="1px"
          borderColor="gainsboro"
        >
          <VStack p={4} align="start" spacing={8}>
            <Heading size="sm">Host a game</Heading>
            <Flex w="258px" align="center">
              <Text>Create a new room</Text>
              <Input name="roomId" type="hidden" value="" />
              <Spacer />
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => createRoom()}
              >
                Host
              </Button>
            </Flex>
          </VStack>
        </Box>

        <Box
          rounded="md"
          w={[300, 400]}
          p={4}
          shadow="md"
          border="1px"
          borderColor="gainsboro"
        >
          <Text fontSize="sm" colorScheme="gray">
            💡 Tip: you can re-join the same room again without losing your
            progress
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
}
