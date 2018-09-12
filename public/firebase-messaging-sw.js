importScripts("https://www.gstatic.com/firebasejs/4.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.3.1/firebase-messaging.js");
var config = {
  apiKey: "AIzaSyCWSE5dZ863e8mTL7dcN6YJfvnxD3NyQ4k",
  authDomain: "sketch-academy-share.firebaseapp.com",
  databaseURL: "https://sketch-academy-share.firebaseio.com",
  projectId: "sketch-academy-share",
  storageBucket: "sketch-academy-share.appspot.com",
  messagingSenderId: "632462584527"
};
var app = firebase.initializeApp(config);
const messaging = firebase.messaging();
console.log("worker start");
messaging.setBackgroundMessageHandler(payload => {
  console.log(payload);
  // Parses data received and sets accordingly
  const data = JSON.parse(payload.data.notification);
  console.log("Messege Received", data);
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    // icon: '/static/images/5/icons/android-icon-96x96.png',
    actions: [
      { action: "confirmAttendance", title: "👍 Confirm attendance" },
      { action: "cancel", title: "👎 Not coming" }
    ],
    // For additional data to be sent to event listeners, needs to be set in this data {}
    data: { confirm: data.confirm, decline: data.decline }
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
