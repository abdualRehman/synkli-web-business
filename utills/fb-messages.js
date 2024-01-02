/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STOREAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

console.log(process.env);
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const removeToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: " process.env.REACT_APP_FB_VAPID_KEY",
    });
    if (token) {
      await messaging.deleteToken(token);
    }
  } catch (e) {
    console.log("An error occurred while removing token. ", e);
  }
};

export const getFcmToken = async () => {
  console.log({ t: "=====================" });
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FB_VAPID_KEY,
    });
    console.log({ token }, "token");
    return token;
  } catch (e) {
    console.log("An error occurred while retrieving token. ", e);
  }
};

export const onMessageReceive = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
  });
};
