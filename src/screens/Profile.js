import React, { useContext, useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { ThemeContext } from "../configs/Theme";
import Screen from "../components/Screen";
import { ProfileCard } from "../components/ProfileCard";
import { NavButton } from "../components/NavButton";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();
  const themeContext = useContext(ThemeContext);

  const [user, setUser] = useState([]);

  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setUser(userData);
    } else {
      const userData = null;
      setUser(userData);
    }
  };

  return (
    <Screen headerTitle="Profile">
      {user.name == null || user.phone == null ? (
        <ProfileCard
          email={
            auth.currentUser.email.charAt(0).toUpperCase() +
            auth.currentUser.email.slice(1)
          }
          onPress={() => {
            signOut(auth);
          }}
          onEditPress={() =>
            navigation.navigate("ProfileInformation", {
              user: {
                email: auth.currentUser.email,
                id: auth.currentUser.uid,
                name: user.name,
                phone: user.phone,
              },
            })
          }
          addName
        />
      ) : (
        <ProfileCard
          email={
            auth.currentUser.email.charAt(0).toUpperCase() +
            auth.currentUser.email.slice(1)
          }
          onPress={() => {
            signOut(auth);
          }}
          onEditPress={() =>
            navigation.navigate("ProfileInformation", {
              user: {
                name: user.name,
                phone: user.phone,
                email: auth.currentUser.email,
                id: auth.currentUser.uid,
              },
            })
          }
          name={user.name}
        />
      )}

      <NavButton
        icon="credit-card"
        title="Payment Methods"
        onPress={() => {
          navigation.navigate("PaymentMethods");
        }}
      />
      <NavButton
        themeChanger
        icon={themeContext.theme == "dark" ? "sun" : "moon"}
        title={themeContext.theme == "dark" ? "Light Mode" : "Dark Mode"}
        onPress={themeContext.toggleTheme}
      />
      <NavButton
        icon="question-mark-circle"
        title="Help"
        onPress={() => {
          navigation.navigate("Help");
        }}
      />
    </Screen>
  );
}
