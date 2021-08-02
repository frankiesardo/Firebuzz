import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useQuery } from "react-query";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { useRoom, useUser } from ".";

type Guest = {
  id: string;
  name: string;
  buzzed: Timestamp | null;
  score: number;
};

export default function useGuest() {
  const user = useUser();
  const { id: roomId } = useRoom();
  const firestore = useFirestore();
  const guestRef = doc(firestore, "rooms", roomId, "guests", user.uid);
  const { data: guest } = useFirestoreDocData(guestRef, { idField: "id" });
  const exists = !!guest?.name;
  useQuery(
    "guest",
    () => setDoc(guestRef, { name: randomMoniker(), buzzed: null, score: 0 }),
    { enabled: !exists }
  );
  return guest as Guest;
}

function randomMoniker() {
  const anim = animals[(animals.length * Math.random()) | 0];
  return `Guest ${anim}`;
}

const animals = [
  "Alligator",
  "Anteater",
  "Armadillo",
  "Auroch",
  "Axolotl",
  "Badger",
  "Bat",
  "Bear",
  "Beaver",
  "Blobfish",
  "Buffalo",
  "Camel",
  "Chameleon",
  "Cheetah",
  "Chinchilla",
  "Chipmunk",
  "Chupacabra",
  "Cormorant",
  "Coyote",
  "Crow",
  "Dingo",
  "Dinosaur",
  "Dog",
  "Dolphin",
  "Dragon",
  "Duck",
  "Elephant",
  "Ferret",
  "Fox",
  "Frog",
  "Giraffe",
  "Goose",
  "Gopher",
  "Grizzly",
  "Hamster",
  "Hedgehog",
  "Hippo",
  "Hyena",
  "Ibex",
  "Ifrit",
  "Iguana",
  "Jackal",
  "Jackalope",
  "Kangaroo",
  "Kiwi",
  "Koala",
  "Kraken",
  "Lemur",
  "Leopard",
  "Liger",
  "Lion",
  "Llama",
  "Manatee",
  "Mink",
  "Monkey",
  "Moose",
  "Narwhal",
  "Octopus",
  "Orangutan",
  "Otter",
  "Panda",
  "Penguin",
  "Platypus",
  "Python",
  "Quagga",
  "Quokka",
  "Rabbit",
  "Raccoon",
  "Rhino",
  "Sheep",
  "Shrew",
  "Skunk",
  "Squirrel",
  "Tiger",
  "Turtle",
  "Unicorn",
  "Walrus",
  "Wolf",
  "Wolverine",
  "Wombat",
];
