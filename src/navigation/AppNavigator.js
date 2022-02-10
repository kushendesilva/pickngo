import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

//Screens
import Home from "../screens/Home";
import DateTimePicker from "../screens/DateTimePicker";
import Confirmation from "../screens/Confirmation";
import DropLocation from "../screens/DropLocation";
import Ongoing from "../screens/Ongoing";
import PaymentMethods from "../screens/PaymentMethods";
import NewPayment from "../screens/NewPayment";
import ProfileInformation from "../screens/ProfileInformation";
import Request from "../screens/Request";
import TrackLocation from "../screens/TrackLocation";
import Requests from "../screens/Requests";
import Profile from "../screens/Profile";
import Loading from "../screens/utils/Loading";
// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgotPassword from "../screens/auth/ForgotPassword";

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
      <MainStack.Screen name="Auth" component={Auth} />
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="DateTimePicker" component={DateTimePicker} />
      <MainStack.Screen name="Confirmation" component={Confirmation} />
      <MainStack.Screen name="DropLocation" component={DropLocation} />
      <MainStack.Screen name="Ongoing" component={Ongoing} />
      <MainStack.Screen name="PaymentMethods" component={PaymentMethods} />
      <MainStack.Screen name="NewPayment" component={NewPayment} />
      <MainStack.Screen
        name="ProfileInformation"
        component={ProfileInformation}
      />
      <MainStack.Screen name="Request" component={Request} />
      <MainStack.Screen name="TrackLocation" component={TrackLocation} />
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
  return (
    <NavigationContainer>
      {/* <Loading /> */}
      {/* <Auth /> */}
      <Main />
    </NavigationContainer>
  );
};
