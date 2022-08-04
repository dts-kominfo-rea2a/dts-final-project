import { initializeApp } from "firebase/app";


import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUqcxFNxrh8L8C8bRUKPrW4Ysf5CKJ5P8",
    authDomain: "mini-project-dts-dbf82.firebaseapp.com",
    projectId: "mini-project-dts-dbf82",
    storageBucket: "mini-project-dts-dbf82.appspot.com",
    messagingSenderId: "479062877822",
    appId: "1:479062877822:web:c547d13553a5027cd75a2f"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const registerDenganEmailDanPassword = async (email, password) => {
  
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(
      "User yang teregistrasi dan berhasil login adalah",
      response.user
    );
  } catch (err) {
    console.log(err);

    console.log("error code auth", err.code);
    console.log("error message auth", err.message);
  }
};


const loginDenganEmailDanPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("User yang berhasil login adalah", userCredential.user);
  } catch (err) {
    console.log(err);
    console.log("error code auth", err.code);
    console.log("error message auth", err.message);
  }
};

const resetPassword = async (email) => {
  
  try {
    await sendPasswordResetEmail(auth, email);

    console.log("Password reset sudah dikirimkan");
  } catch (err) {
    console.log(err);
  }
};

// Fungsi untuk sign out
const keluarDariApps = async () => {
  
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

export {
  auth, 
  registerDenganEmailDanPassword,
  loginDenganEmailDanPassword,
  resetPassword,
  keluarDariApps,
};