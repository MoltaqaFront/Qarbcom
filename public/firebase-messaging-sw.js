// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA1Qhu0dnmDepSs_-nUKSpGBIX42H00DKI",
  authDomain: "akry-2653b.firebaseapp.com",
  projectId: "akry-2653b",
  storageBucket: "akry-2653b.appspot.com",
  messagingSenderId: "35605685091",
  appId: "1:35605685091:web:ca117d8fa3feff6fef2956",
  measurementId: "G-YM05RMWG2B",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });
});
// =================================== new ==========================

messaging.onMessage(function (payload) {
  console.log("Received foreground message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // Display the notification in the foreground
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Debugging: Log payload to console
  console.log("Payload:", payload);

  // Send the payload to the clients
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked:", event);
  // Handle the notification click event if needed
});

self.addEventListener("notificationclose", function (event) {
  console.log("Notification closed:", event);
  // Handle the notification close event if needed
});

self.addEventListener("push", function (event) {
  console.log("Push event received:", event);
  // Handle the push event if needed
});

navigator.serviceWorker.addEventListener("message", (event) => {
  const receivedMessage = event.data.data;
  console.log("Received message from service worker:", receivedMessage);

  // Update component state or display the received message in the UI
});
