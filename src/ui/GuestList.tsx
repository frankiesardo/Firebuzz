import React, { useRef } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { List, ListItem } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useUpdateGuest, useGuestList, useIsHost } from "../hooks";

const spring = { type: "spring", stiffness: 500, damping: 30 };

export default function GuestList() {
  return (
    <AnimateSharedLayout>
      <SimpleGrid columns={2} spacing={2} px={4} overflowX="auto">
        <GuestWhoBuzzedList />
        <GuestWhoDidNotBuzzList />
      </SimpleGrid>
    </AnimateSharedLayout>
  );
}

function GuestWhoBuzzedList() {
  const guestList = useGuestList();
  const items = guestList
    .filter(({ buzzed }) => !!buzzed)
    .sort((a, b) => a.buzzed!.toMillis() - b.buzzed!.toMillis());

  return (
    <VStack alignItems="start" overflowX="auto">
      <Text color="teal.500" as="b">
        Buzzed
      </Text>
      <Divider />
      <List spacing={3} overflowX="auto" width="100%">
        {items.map(({ id, name, buzzed }, idx) => (
          <motion.div key={id} layoutId={id} transition={spring}>
            <ListItem>
              <Text>{name}</Text>
              <Box m={1} />
              <Text p={1} fontSize="sm" color="pink.500">
                {idx > 0
                  ? `+${buzzed?.toMillis()! - items[0]!.buzzed!.toMillis()}  ms`
                  : "🏆"}
              </Text>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </VStack>
  );
}

function GuestWhoDidNotBuzzList() {
  const guestList = useGuestList();
  const items = guestList
    .filter(({ buzzed }) => !buzzed)
    .sort((a, b) => b.score - a.score);

  const isHost = useIsHost();

  return (
    <VStack alignItems="start" overflowX="auto">
      <Text color="teal.500" as="b">
        Not buzzed yet
      </Text>
      <Divider />
      <List spacing={3} overflowX="auto" width="100%">
        {items.map(({ id, name, score }) => (
          <motion.div key={id} layoutId={id} transition={spring}>
            <ListItem>
              <Text>{name}</Text>
              <Box m={1} />
              {isHost ? (
                <EditScore id={id} score={score} />
              ) : (
                <Text p={1} fontSize="sm" color="pink.500">
                  {score === 1 ? "1 point" : `${score} points`}
                </Text>
              )}
            </ListItem>
          </motion.div>
        ))}
      </List>
    </VStack>
  );
}

function EditScore({ id, score }: { id: string; score: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { mutate: updateGuest } = useUpdateGuest(id);

  const confirmEdit = async (e: any) => {
    e.preventDefault();
    const score = +new FormData(e.target).get("score")!;
    updateGuest({ score });
    onClose();
  };

  return (
    <Button
      size="xs"
      rightIcon={<Icon as={AiOutlinePlusCircle} />}
      colorScheme="pink"
      onClick={onOpen}
    >
      {score === 1 ? "1 point" : `${score} points`}
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={confirmEdit}>
            <ModalHeader>Edit Score</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>New score</FormLabel>
                <NumberInput name="score" defaultValue={score} ref={initialRef}>
                  <NumberInputField />
                </NumberInput>
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
