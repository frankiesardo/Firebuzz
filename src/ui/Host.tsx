import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRoom, useClearBuzzers, useGuestList } from "../hooks";
import { GuestList } from ".";
import { useEffect } from "react";

const sound = new Audio("/audio/buzz.mp3");

export default function Host() {
  const { id: roomId, hostId } = useRoom();

  return (
    <Flex direction="column" h={window.innerHeight}>
      <HStack px={5} h="58px" bg="teal.500" shadow="base">
        <CloseButton
          color="white"
          size="lg"
          onClick={() => {
            window.location.href =
              window.location.origin + window.location.pathname;
          }}
        />
        <Heading color="white" size="md">
          Room number: {roomId}
        </Heading>
      </HStack>
      {!hostId ? (
        <>
          <Alert
            status="error"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <AlertIcon boxSize="40px" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              This room number is no longer vailable
            </AlertTitle>
            <AlertDescription>
              Try navigating back and create a new one
            </AlertDescription>
          </Alert>
        </>
      ) : (
        <>
          <Actions />
          <Box m={6} />
          <GuestList />
        </>
      )}
    </Flex>
  );
}

function Actions() {
  const guestList = useGuestList();
  const { mutate: clearBuzzers } = useClearBuzzers();
  const shouldPlaySound =
    guestList.filter(({ buzzed }) => !!buzzed).length === 1;

  useEffect(() => {
    if (shouldPlaySound) {
      sound.play();
    }
  }, [shouldPlaySound]);

  return (
    <>
      <HStack px={4} py={1} spacing="-5px">
        <Text color="pink.500" p={2}>
          You are the host
        </Text>
      </HStack>
      <Box m={4} />
      <Center>
        <Button
          colorScheme="pink"
          disabled={guestList.every(({ buzzed }) => !buzzed)}
          onClick={() => clearBuzzers()}
        >
          Clear Buzzers
        </Button>
      </Center>
    </>
  );
}
