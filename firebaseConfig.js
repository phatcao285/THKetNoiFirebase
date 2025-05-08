import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBWAp56265AysUW5ixtn6hbc3Onf9DGdC0",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "bt4firebase",
  storageBucket: "bt4firebase.appspot.com",
  messagingSenderId: "391426381863",
  appId: "1:391426381863:android:599d581512ae0a5bd4d602"
};

const app = initializeApp(firebaseConfig);

export default app;
