import React from "react";
import firebase from "firebase";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const FirebaseContext = React.createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDFY_QUKkBTa-M2c_bnZb75Nx7m8mz5Jss",
  authDomain: "mokef-b2e9f.firebaseapp.com",
  databaseURL: "https://mokef-b2e9f.firebaseio.com",
  projectId: "mokef-b2e9f",
  storageBucket: "mokef-b2e9f.appspot.com",
  messagingSenderId: "110857392846",
  appId: "1:110857392846:web:a7d46ec885ea26e48e369f",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // Auth
  onAuthStateChanged = (setUser) =>
    this.auth.onAuthStateChanged((user) => {
      if (!user) return setUser({});

      this.usersCollection()
        .doc(user.uid)
        .get()
        .then((res) => setUser({ uid: res.id, ...res.data() }));
    });

  initRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
  };

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithPhoneNumber = (phoneNumber) =>
    this.auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // Firestore
  usersCollection = () => {
    return this.db.collection("users");
  };

  // Storage
  storageRef = (ref) => {
    return this.storage.ref().child(ref);
  };
}

export default Firebase;

export { FirebaseContext };
