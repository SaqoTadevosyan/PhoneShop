import firebase from "firebase"
  const config = {
    apiKey: "AIzaSyAr2UOtCcMyyAHlcmMCi5uoZ7ZX_mCjSMw",
  authDomain: "myshop-f8419.firebaseapp.com",
  databaseURL: "https://myshop-f8419.firebaseio.com",
  projectId: "myshop-f8419",
  storageBucket: "myshop-f8419.appspot.com",
  messagingSenderId: "405479552394",
  appId: "1:405479552394:web:3960068126ce8187f44473"
  };
  // Initialize Firebase
 const fire= firebase.initializeApp(config);
export default fire