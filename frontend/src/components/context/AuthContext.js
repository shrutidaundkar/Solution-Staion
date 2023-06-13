import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const googleSignOut = () => {
    signOut(auth);
  };

  const normalSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        alert(error.code);
      });
  };
  const normalSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser);
      console.log(curUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ googleSignIn, googleSignOut, normalSignIn, normalSignUp, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
