import React, { Suspense } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import {
  Box,
  Center,
  ChakraProvider,
  CircularProgress,
  Container,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home, Host, Join } from ".";
import { useParams, useIsHost, useRoom } from "../hooks";
import { useEffect } from "react";

export default function App() {
  const app = useFirebaseApp();
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const { roomId } = useParams();

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Box bg="gray.200">
              <Container maxW="xl" p={0} bg="white">
                <Suspense fallback={<Placeholder />}>
                  {roomId ? <Room /> : <Home />}
                </Suspense>
              </Container>
            </Box>
          </ChakraProvider>
        </QueryClientProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

const Room = () => {
  const isHost = useIsHost();
  const { id: roomId } = useRoom();
  useEffect(() => {
    document.title = `Firebuzz room: ${roomId}`;
  }, [roomId]);
  return isHost ? <Host /> : <Join />;
};

const Placeholder = () => {
  return (
    <Center h={window.innerHeight}>
      <CircularProgress isIndeterminate color="teal.500" />
    </Center>
  );
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});
