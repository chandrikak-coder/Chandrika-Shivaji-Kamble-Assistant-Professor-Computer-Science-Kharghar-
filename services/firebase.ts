import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDandIMzMjEH_M_oPPMUr3lvNMOf-7SOW0",
  authDomain: "gen-lang-client-0347391875.firebaseapp.com",
  projectId: "gen-lang-client-0347391875",
  storageBucket: "gen-lang-client-0347391875.firebasestorage.app",
  messagingSenderId: "401191666968",
  appId: "1:401191666968:web:b75fd862f7f0cfd7078a6d",
  measurementId: "G-TZRV91W4LG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, app };