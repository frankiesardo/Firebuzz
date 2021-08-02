import { collection, writeBatch } from "firebase/firestore";
import { useMutation } from "react-query";
import { useFirestore, useFirestoreCollection } from "reactfire";
import useRoom from "./useRoom";

export default function useClearBuzzers() {
  const { id: roomId } = useRoom();
  const firestore = useFirestore();
  const guestListRef = collection(firestore, "rooms", roomId, "guests");
  const { data: guests } = useFirestoreCollection(guestListRef);

  return useMutation(() => {
    const batch = writeBatch(firestore);
    guests.docs.map((guest) => batch.update(guest.ref, { buzzed: null }));
    return batch.commit();
  });
}
