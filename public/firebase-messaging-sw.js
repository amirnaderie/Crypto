// Scripts for firebase and firebase messaging
importScripts(
  "firebase-app-compat.js"
);
importScripts(
  "firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBCn9H-84zfpNXZBBmh-k1AvKKTc97NLD4",
  authDomain: "amircryptowatch.firebaseapp.com",
  projectId: "amircryptowatch",
  storageBucket: "amircryptowatch.appspot.com",
  messagingSenderId: "496081696453",
  appId: "1:496081696453:web:8dbb3317fedb5808cae2ac",
  measurementId: "G-N5LTEVYKKS",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
