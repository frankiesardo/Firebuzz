import { AiFillEdit } from "react-icons/ai";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useBuzz, useGuest, useRoom, useUpdateGuest } from "../hooks";
import { GuestList } from ".";

const sound = new Audio("/audio/buzz.mp3");

export default function Join() {
  const { id: roomId } = useRoom();
  const { id: guestId, name, buzzed } = useGuest();
  const { mutate: buzz } = useBuzz();

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
          Room name: {roomId}
        </Heading>
      </HStack>
      <HStack px={4} py={1} spacing="-5px">
        <EditName id={guestId} name={name} />
      </HStack>
      <Box m={4} />
      <Center>
        <Button
          colorScheme="pink"
          borderRadius="50%"
          h="150px"
          w="150px"
          isDisabled={!!buzzed}
          onClick={() => {
            buzz();
            sound.play();
          }}
        >
          Buzz!
        </Button>
      </Center>
      <Box m={6} />
      <GuestList />
    </Flex>
  );
}

function EditName({ id, name }: { id: string; name: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { mutate: updateGuest } = useUpdateGuest(id);

  const confirmEdit = async (e: any) => {
    e.preventDefault();
    const name = new FormData(e.target).get("name")!;
    updateGuest({ name });
    onClose();
  };

  return (
    <Button
      colorScheme="pink"
      variant="ghost"
      rightIcon={<Icon as={AiFillEdit} />}
      onClick={onOpen}
    >
      Name: {name}
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={confirmEdit}>
            <ModalHeader>Edit Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>New name</FormLabel>
                <Input name="name" defaultValue={name} ref={initialRef} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" type="submit">
                Confirm
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Button>
  );
}
