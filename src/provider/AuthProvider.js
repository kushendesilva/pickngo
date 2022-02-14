import React, { createContext, useState, useEffect } from "react";
// import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
const AuthProvider = (props) => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // const db = getFirestore();
  // const [profile, setProfile] = useState(null);

  // const getProfile = async () => {
  //   const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
  //   if (docSnap.exists()) {
  //     const userData = docSnap.data();
  //     setProfile(userData);
  //   } else {
  //     setProfile(null);
  //   }
  // };

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true);
        // getProfile();
      } else {
        setUser(false);
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
