
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDqFHLtubBaGwfEuWJeLqKeYgnY3mPKtnY",
  authDomain: "project1-c496c.firebaseapp.com",
  projectId: "project1-c496c",
  storageBucket: "project1-c496c.appspot.com",
  messagingSenderId: "196399699562",
  appId: "1:196399699562:web:ae372f1e599ee1a9e15c13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth();

export {app, auth, firebaseConfig};