// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_p7IJiuMqpGpqN81yVb_TNVA2U9Em8Cs",
  authDomain: "react-dts-finalproject.firebaseapp.com",
  projectId: "react-dts-finalproject",
  storageBucket: "react-dts-finalproject.appspot.com",
  messagingSenderId: "511514208581",
  appId: "1:511514208581:web:51598c823d0db4386b762c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const getUser = await createUserWithEmailAndPassword(auth, email, password);

    console.log("User yang teregis dan berhasil login adalah", getUser.user);
  } catch (error) {
    console.log(error);
    console.log("Error code auth", error.code);
    console.log("Error msg auth", error.message);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userLogin = await signInWithEmailAndPassword(auth, email, password);

    console.log("User yang berhasil login adalah", userLogin.user);
  } catch (error) {
    console.log(error);
    console.log("Error code auth", error.code);
    console.log("Error msg auth", error.message);
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User berhasil logout");
  } catch (error) {
    console.log(error);
  }
};

export {
  auth,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  resetPassword,
  logout,
};
