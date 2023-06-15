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
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        if (res) {
          postUserGetMongoId(res);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const googleSignOut = () => {
    signOut(auth);
    deleteLocalStorage();
  };

  const normalSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res);
        if (res) {
          postUserGetMongoId(res);
        }
      })
      .catch((error) => {
        alert(error.code);
      });
  };
  const normalSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res);
        if (res) {
          postUserGetMongoId(res);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const saveMongoIdUidToStorage = (mongoId, uid, callback) => {
    if (mongoId !== undefined && uid !== undefined) {
      localStorage.setItem("mongoId", mongoId);
      localStorage.setItem("uid", uid);

      console.log(mongoId, uid);
    }
  };
  const getMongoIdFromStorage = () => {
    const mongoId = localStorage.getItem("mongoId");
    return mongoId;
  };
  const deleteLocalStorage = () => {
    localStorage.removeItem("mongoId");
    localStorage.removeItem("uid");
    // window.location.reload();
  };
  const postUserGetMongoId = async (curUser) => {
    const sendUser = {
      uid: curUser.uid,
      name: curUser.displayName,
      email: curUser.email,
    };
    const resp = await axios
      .post("http://localhost:80/api/user", sendUser)
      .then((res) => {
        console.log(res.data.result.uid);
        console.log(res.data.result._id);

        saveMongoIdUidToStorage(res.data.result._id, res.data.result.uid);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser);
      if (curUser) {
        postUserGetMongoId(curUser);
      }

      console.log(curUser);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  useEffect(() => {
    const updateLocalStorage = () => {
      if (getMongoIdFromStorage() === null) {
        if (user) {
          postUserGetMongoId(user);
        }
      }
    };
    updateLocalStorage();
  });
  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        googleSignOut,
        normalSignIn,
        normalSignUp,
        user,
        getMongoIdFromStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
