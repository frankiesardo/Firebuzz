import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { useParams } from ".";

type Room = {
  id: string;
  hostId: string;
};

export default function useRoom() {
  const firestore = useFirestore();
  const { roomId } = useParams();
  const ref = doc(firestore, "rooms", roomId);
  const { data: room } = useFirestoreDocData(ref, { idField: "id" });
  return room as Room;
}
