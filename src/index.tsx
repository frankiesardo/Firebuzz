import React from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import { App } from "./ui";

const firebaseConfig = {
  apiKey: "AIzaSyDb6-66w-lHx0tF3z9POa4NR6PZfUb5ExQ",
  authDomain: "firebuzz-cf583.firebaseapp.com",
  projectId: "firebuzz-cf583",
  storageBucket: "firebuzz-cf583.appspot.com",
  messagingSenderId: "1028563536658",
  appId: "1:1028563536658:web:a133f1cef29d0206c341cb",
  measurementId: "G-1XQYL5HPMW",
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);
