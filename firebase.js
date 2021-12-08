import { initializeApp } from "firebase/app";
import{GoogleAuthProvider,getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBvPpapM1H2Ap5qDOxMYh-MultY4HXzj5c",
  authDomain: "uber-clone-68.firebaseapp.com",
  projectId: "uber-clone-68",
  storageBucket: "uber-clone-68.appspot.com",
  messagingSenderId: "58986178941",
  appId: "1:58986178941:web:db667046af93cbff94c414"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider =new GoogleAuthProvider();
const auth =getAuth();
export{app,provider,auth};