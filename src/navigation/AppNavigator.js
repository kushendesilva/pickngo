import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { AuthContext } from "../provider/AuthProvider";

//Screens
import Home from "../screens/Home";
import NewRequest from "../screens/NewRequest";
import NewRider from "../screens/NewRider";
import Confirmation from "../screens/Confirmation";
import Ongoing from "../screens/Ongoing";
import PaymentMethods from "../screens/PaymentMethods";
import NewPayment from "../screens/NewPayment";
import ProfileInformation from "../screens/ProfileInformation";
import Request from "../screens/Request";
import TrackLocation from "../screens/TrackLocation";
import ChangeLocation from "../screens/ChangeLocation";
import Requests from "../screens/Requests";
import OngoingRequests from "../screens/OngoingRequests";
import Profile from "../screens/Profile";
import Help from "../screens/Help";
import Loading from "../screens/utils/Loading";
// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgotPassword from "../screens/auth/ForgotPassword";

const firebaseConfig = {
  apiKey: "AIzaSyATuMyVrC06QAh8FoO2H4iu8AFgbGd5jys",
  authDomain: "pickandgo-app.firebaseapp.com",
  databaseURL: "https://pickandgo-app.firebaseio.com",
  projectId: "pickandgo-app",
  storageBucket: "pickandgo-app.appspot.com",
  messagingSenderId: "1048515395386",
  appId: "1:1048515395386:android:22622d3d2a32a4ef31da03",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />

      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="NewRequest" component={NewRequest} />
      <MainStack.Screen name="NewRider" component={NewRider} />
      <MainStack.Screen name="Confirmation" component={Confirmation} />
      <MainStack.Screen name="Ongoing" component={Ongoing} />
      <MainStack.Screen name="OngoingRequests" component={OngoingRequests} />
      <MainStack.Screen name="PaymentMethods" component={PaymentMethods} />
      <MainStack.Screen name="NewPayment" component={NewPayment} />
      <MainStack.Screen name="Help" component={Help} />
      <MainStack.Screen
        name="ProfileInformation"
        component={ProfileInformation}
      />
      <MainStack.Screen name="Request" component={Request} />
      <MainStack.Screen name="TrackLocation" component={TrackLocation} />
      <MainStack.Screen name="ChangeLocation" component={ChangeLocation} />
    </MainStack.Navigator>
  );
};

const BottomTabBar = ({ navigation, state }) => {
  const HomeIcon = (props) => <Icon {...props} name="home" />;
  const RequestIcon = (props) => <Icon {...props} name="clipboard" />;
  const ProfileIcon = (props) => <Icon {...props} name="person" />;
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} title="Home" />
      <BottomNavigationTab icon={RequestIcon} title="Requests" />
      <BottomNavigationTab icon={ProfileIcon} title="Profile" />
    </BottomNavigation>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => (
  <Tabs.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Requests" component={Requests} />
    <Tabs.Screen name="Profile" component={Profile} />
  </Tabs.Navigator>
);

export default () => {
  const context = useContext(AuthContext);
  const user = context.user;

  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
