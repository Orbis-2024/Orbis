import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MainPage from "./HomePage";
import RoutePlanner from "../Main/RoutePlanner"; // Replace with your actual component
import HealthTracker from "../Main/HealthTrack"; // Replace with your actual component
import Challenges from "../Main/Challenges"; // Replace with your actual component
import LeaderBoard from "../Main/Leaderboard"; // Replace with your actual component
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Tab.Navigator
      initialRouteName="Orbis"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "RoutePlanner") {
            return (
              <Ionicons
                name="bicycle-outline"
                size={focused ? 30 : 25}
                color={color}
              />
            );
          } else if (route.name === "HealthTracker") {
            return (
              <MaterialCommunityIcons
                name="heart-pulse"
                size={focused ? 30 : 25}
                color={color}
              />
            );
          } else if (route.name === "Orbis") {
            return (
              <Ionicons
                name="earth-outline"
                size={focused ? 40 : 35}
                color={color}
              />
            );
          } else if (route.name === "Challenges") {
            return (
              <MaterialCommunityIcons
                name="trophy-variant-outline"
                size={focused ? 30 : 25}
                color={color}
              />
            );
          } else if (route.name === "LeaderBoard") {
            return (
              <MaterialCommunityIcons
                name="medal"
                size={focused ? 30 : 25}
                color={color}
              />
            );
          }
        },
        tabBarLabel: ({ focused, color }) => {
          let label;
          if (route.name === "RoutePlanner") {
            label = "Route Planner";
          } else if (route.name === "HealthTracker") {
            label = "Health Tracker";
          } else if (route.name === "Orbis") {
            label = "Orbis";
          } else if (route.name === "Challenges") {
            label = "Challenges";
          } else if (route.name === "LeaderBoard") {
            label = "LeaderBoard";
          }
          return (
            <Text
              style={{
                color,
                fontSize: focused ? 12.5 : 12,
                fontFamily: "Fredoka_500Medium",
              }}
            >
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#C0C0C0",
        tabBarStyle: {
          backgroundColor: "#4b5b6c",
          height: "10%",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}
    >
      <Tab.Screen name="RoutePlanner" component={RoutePlanner} />
      <Tab.Screen name="HealthTracker" component={HealthTracker} />
      <Tab.Screen name="Orbis" component={MainPage} />
      <Tab.Screen name="Challenges" component={Challenges} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
    </Tab.Navigator>
  );
}
