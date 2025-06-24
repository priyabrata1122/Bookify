import {createContext, useContext, useEffect, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth';
export const FirebaseContext=createContext();

const firebaseConfig = {
  apiKey: "AIzaSyBC8JT9eDMPp-7CAtKo_x_HC1c8AqWTCFg",
  authDomain: "bookify-a564b.firebaseapp.com",
  projectId: "bookify-a564b",
  storageBucket: "bookify-a564b.firebasestorage.app",
  messagingSenderId: "110165079819",
  appId: "1:110165079819:web:fc52a830f356dd2475d40e"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();

export const useFirebase=()=>useContext(FirebaseContext);

export const FirebaseProvider=(props)=>{

    const [user,setUser]=useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user) setUser(user);
            else setUser(null);
        })
    },[]);

    const RegisterWithEmailPass=(email, pass)=>{
        return createUserWithEmailAndPassword(auth,email,pass);
    }

    const LoginWithEmailPass=(email,pass)=>{
        return signInWithEmailAndPassword(auth,email,pass);
    }

    const LoginWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider);
    }

    const isLoggedin =() =>{
        return user?true:false;
    }

    const signoutUser=()=>signOut(auth);

    return(
        <FirebaseContext.Provider value={{
            RegisterWithEmailPass,
            LoginWithEmailPass,
            LoginWithGoogle,
            isLoggedin,
            signoutUser
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}