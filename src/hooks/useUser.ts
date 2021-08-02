import { useAuth } from "reactfire";
import { signInAnonymously } from "@firebase/auth";
import { useQuery } from "react-query";

export default function useUser() {
  const auth = useAuth();
  const { data: credentials } = useQuery("user", () => signInAnonymously(auth));
  return credentials!.user;
}
