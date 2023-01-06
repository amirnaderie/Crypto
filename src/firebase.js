// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBCn9H-84zfpNXZBBmh-k1AvKKTc97NLD4",
  authDomain: "amircryptowatch.firebaseapp.com",
  projectId: "amircryptowatch",
  storageBucket: "amircryptowatch.appspot.com",
  messagingSenderId: "496081696453",
  appId: "1:496081696453:web:8dbb3317fedb5808cae2ac",
  measurementId: "G-N5LTEVYKKS",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BJG-5CRxLlAQylfXEFqKsouaVgHJhmYTdt1VD5rPklBjTE_xztmd4sNeC8lctJx7P50my3DFg8S6RAN8oFoRwvA",
  })
    .then((currentToken) => {
      if (currentToken) {
       
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
