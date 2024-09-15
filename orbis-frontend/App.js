import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./app/context/UserContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "./app/pages/Authentification/Loading";
import LogIn from "./app/pages/Authentification/LogIn";
import Description from "./app/pages/Authentification/Description";
import Recovery1 from "./app/pages/Authentification/Recovery1";
import SignUp from "./app/pages/Authentification/SignUp";
import AllDone from "./app/pages/Authentification/AllDone";
import TermsConditions from "./app/pages/Authentification/TermsConditions";
import Page1 from "./app/pages/form/Page1";
import Page2 from "./app/pages/form/Page2";
import Page3 from "./app/pages/form/Page3";
import Page4 from "./app/pages/form/Page4";
import Recovery2 from "./app/pages/Authentification/Recovery2";
import Recovery3 from "./app/pages/Authentification/Recovery3";
import AllDone2 from "./app/pages/Authentification/Alldone2";
import Page5 from "./app/pages/form/Page5";
import Page6 from "./app/pages/form/Page6";
import Page7 from "./app/pages/form/Page7";
import Page8 from "./app/pages/form/Page8";
import Page13 from "./app/pages/form/Page13";
import Page14 from "./app/pages/form/Page14";
import Page15 from "./app/pages/form/Page15";
import Page16 from "./app/pages/form/Page16";
import Page9 from "./app/pages/form/Page9";
import Page10 from "./app/pages/form/Page10";
import Page11 from "./app/pages/form/Page11";
import Page12 from "./app/pages/form/Page12";
import Page17 from "./app/pages/form/Page17";
import Page18 from "./app/pages/form/Page18";
import Page19 from "./app/pages/form/Page19";
import Page20a from "./app/pages/form/Page20a";
import Page20b from "./app/pages/form/Page20b";
import Page20c from "./app/pages/form/Page20c";
import Page21 from "./app/pages/form/Page21";
import Page22 from "./app/pages/form/Page22";
import Page23 from "./app/pages/form/Page23";
import Wait from "./app/pages/form/Wait";
import Calculator1 from "./app/pages/form/Calculator1";
import LoadingPlanet from "./app/pages/form/LoadingPlanet";
import CalculateFootprint from "./app/pages/form/CalculateFootprint";
import Contract from "./app/pages/form/Contract";
import Menu from "./app/pages/Main/Menu";
import Profile from "./app/pages/Main/Profile";
import EditProfile from "./app/pages/Main/EditProfile";
import MainPage from "./app/pages/Main/HomePage";
import BottomTabNavigator from "./app/pages/Main/BottomTabNav";
import ProfilePicture from "./app/pages/Main/ProfilePicture";

const AuthStack = createNativeStackNavigator();
const FormularStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();

// AuthStack Navigator
function AuthStackNavigator({ navigation }) {
  return (
    <AuthStack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1 },
      }}
    >
      <AuthStack.Screen name="Loading" component={Loading} />
      <AuthStack.Screen name="Description" component={Description} />
      <AuthStack.Screen name="LogIn" component={LogIn} />
      <AuthStack.Screen name="Recovery1" component={Recovery1} />
      <AuthStack.Screen name="Recovery2" component={Recovery2} />
      <AuthStack.Screen name="Recovery3" component={Recovery3} />
      <AuthStack.Screen name="Alldone2" component={AllDone2} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen
        name="AllDone"
        component={AllDone}
        options={{
          contentStyle: { flex: 1 },
        }}
      />
      <AuthStack.Screen name="TermsConditions" component={TermsConditions} />
    </AuthStack.Navigator>
  );
}

// FormularStack Navigator
function FormularStackNavigator() {
  return (
    <FormularStack.Navigator
      initialRouteName="Page1"
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false, // Hides the back button title
        headerTintColor: "black", // Changes the back button color to black
        contentStyle: { flex: 1 },
      }}
    >
      <FormularStack.Screen name="Page 1" component={Page1} />
      <FormularStack.Screen name="Page 2" component={Page2} />
      <FormularStack.Screen name="Page 3" component={Page3} />
      <FormularStack.Screen name="Page 4" component={Page4} />
      <FormularStack.Screen name="Page 5" component={Page5} />
      <FormularStack.Screen name="Page 6" component={Page6} />
      <FormularStack.Screen name="Page 7" component={Page7} />
      <FormularStack.Screen name="Page 8" component={Page8} />
      <FormularStack.Screen name="Page 9" component={Page9} />
      <FormularStack.Screen name="Page 10" component={Page10} />
      <FormularStack.Screen name="Page 11" component={Page11} />
      <FormularStack.Screen name="Page 12" component={Page12} />
      <FormularStack.Screen name="Page 13" component={Page13} />
      <FormularStack.Screen name="Page 14" component={Page14} />
      <FormularStack.Screen name="Page 15" component={Page15} />
      <FormularStack.Screen name="Page 16" component={Page16} />
      <FormularStack.Screen name="Page 17" component={Page17} />
      <FormularStack.Screen name="Page 18" component={Page18} />
      <FormularStack.Screen name="Page 19" component={Page19} />
      <FormularStack.Screen name="Page 20a" component={Page20a} />
      <FormularStack.Screen name="Page 20b" component={Page20b} />
      <FormularStack.Screen name="Page 20c" component={Page20c} />
      <FormularStack.Screen name="Page 21" component={Page21} />
      <FormularStack.Screen name="Page 22" component={Page22} />
      <FormularStack.Screen name="Page 23" component={Page23} />
      <FormularStack.Screen
        name="Wait"
        component={Wait}
        options={{
          headerShown: false,
        }}
      />
      <FormularStack.Screen
        name="Calculator1"
        component={Calculator1}
        options={{
          headerShown: false,
        }}
      />
      <FormularStack.Screen
        name="LoadingPlanet"
        component={LoadingPlanet}
        options={{
          headerShown: false,
        }}
      />
      <FormularStack.Screen
        name="CalculateFootprint"
        component={CalculateFootprint}
      />
    </FormularStack.Navigator>
  );
}

function MenuStackNavigator() {
  return (
    <MenuStack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false, // Hides the back button title
        headerTintColor: "black", // Changes the back button color to black
        contentStyle: { flex: 1 },
      }}
    >
      <MenuStack.Screen name="Menu" component={Menu} />
      <MenuStack.Screen name="Profile" component={Profile} />
      <MenuStack.Screen name="EditProfile" component={EditProfile} />
      <MenuStack.Screen name="ProfilePicture" component={ProfilePicture} />
    </MenuStack.Navigator>
  );
}

// Root Stack Navigator
const RootStack = createNativeStackNavigator();

function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="AuthStack">
      <RootStack.Screen
        name="AuthStack"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="FormularStack"
        component={FormularStackNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MainStack"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MenuStack"
        component={MenuStackNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
