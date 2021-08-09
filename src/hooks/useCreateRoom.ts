import {
  doc,
  getDoc,
  setDoc,
  Firestore,
  serverTimestamp,
} from "firebase/firestore";
import { useMutation } from "react-query";
import { useFirestore } from "reactfire";
import { useUser } from ".";

export default function useCreateRoom() {
  const firestore = useFirestore();
  const user = useUser();
  const mutation = useMutation(() => createRoom(firestore, user.uid));
  return mutation;
}

const createRoom = async (
  firestore: Firestore,
  hostId: string
): Promise<string> => {
  const roomId = randomId();
  const roomRef = doc(firestore, "rooms", roomId);
  const room = await getDoc(roomRef);
  if (room.exists()) {
    return createRoom(firestore, hostId);
  }
  await setDoc(roomRef, { hostId, timestamp: serverTimestamp() });

  return roomId;
};

const randomId = () => Math.random().toString().substr(2, 6);
