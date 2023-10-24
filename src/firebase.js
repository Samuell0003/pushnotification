import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = process.env.REACT_APP_FIRE_BASE_CONFIG;

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {

    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {

      if (permission === "granted") {

        console.log("Notification User Permission Granted."); 
        return getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY })
          .then((currentToken) => {

            if (currentToken) {

              console.log('Client Token: ', currentToken);
            } else {
              
              console.log('Failed to generate the app registration token.');
            }
          })
          .catch((err) => {

            console.log('An error occurred when requesting to receive the token.', err);
          });
      } else {

        console.log("User Permission Denied.");
      }
    });
  }

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});