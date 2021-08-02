import { collection, Timestamp } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import useRoom from "./useRoom";

type Guest = {
  id: string;
  name: string;
  buzzed: Timestamp | null;
  score: number;
};

export default function useGuestList() {
  const { id: roomId } = useRoom();
  const firestore = useFirestore();
  const guestListRef = collection(firestore, "rooms", roomId, "guests");
  const { data: guestList } = useFirestoreCollectionData(guestListRef, {
    idField: "id",
  });

  return guestList as Guest[];
}
