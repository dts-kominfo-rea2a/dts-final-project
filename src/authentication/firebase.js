import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxkYBFDIusriZeVkESHkNq2zgodbBxOk0",
  authDomain: "dts-2022finale.firebaseapp.com",
  projectId: "dts-2022finale",
  storageBucket: "dts-2022finale.appspot.com",
  messagingSenderId: "590551791186",
  appId: "1:590551791186:web:16acb7808f86ffe30b918b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerWithEmailAndPassword = async (email, password) => {
  try{
  //user yang sign-in
  const userWeGet = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  console.log("User yang ter-regis dan berhasil login adalah si ", userWeGet.user);
  } catch(err) {
    console.log(err);
    console.log("Error code auth" , err.code);
    console.log("Error msg auth", err.message);
  };
};

const loginUsrWithEmailAndPassword = async (email, password) => {
  try {
  const usrLogin = await signInWithEmailAndPassword(auth, email, password);

  console.log("User yang berhasil login adalah ", usrLogin.user);
 } catch (err) {
    console.log("Error code auth" , err.code);
    console.log("Error msg auth", err.message);
 };
};

const resetForgotPassword = async (email) => {
  try {
  await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log(err);
  }
};

const logOutFromApp = async() => {
  try {
  await signOut(auth);
 } catch (err) {
  console.log(err);
 }    
};

export {
  auth,
  registerWithEmailAndPassword,
  loginUsrWithEmailAndPassword,
  resetForgotPassword,
  logOutFromApp
};
