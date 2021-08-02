import useRoom from "./useRoom";
import useUser from "./useUser";

export default function useIsHost() {
  const { hostId } = useRoom();
  const user = useUser();
  return hostId === user.uid;
}
