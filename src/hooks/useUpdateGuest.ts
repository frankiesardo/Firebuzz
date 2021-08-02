import { doc, UpdateData, updateDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { useFirestore } from "reactfire";
import useRoom from "./useRoom";

export default function useUpdateGuest(guestId: string) {
  const { id: roomId } = useRoom();
  const firestore = useFirestore();
  const guestRef = doc(firestore, "rooms", roomId, "guests", guestId);
  return useMutation((updated: UpdateData) => updateDoc(guestRef, updated));
}
