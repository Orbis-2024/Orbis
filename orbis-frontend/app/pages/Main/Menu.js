import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Menu() {
  // Changed from Settings to Menu
  const navigation = useNavigation();
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
    <View style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.upperContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
        {/* Changed from Settings to Menu */}
      </View>

      <View style={styles.bottomContainer}>
        {/* Settings Option */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.left}>
            <MaterialCommunityIcons
              name="cog-outline"
              size={25}
              color="black"
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.upperText}>Settings</Text>
            <Text style={styles.bottomText}>Manage your app settings</Text>
          </View>
          <View style={styles.right}>
            <Ionicons name="chevron-forward-outline" size={20} color="gray" />
          </View>
        </TouchableOpacity>

        {/* Resources Option */}
        <TouchableOpacity style={styles.button}>
          <View style={styles.left}>
            <MaterialCommunityIcons
              name="book-outline"
              size={25}
              color="black"
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.upperText}>Resources</Text>
            <Text style={styles.bottomText}>
              Learn about ecological information
            </Text>
          </View>
          <View style={styles.right}>
            <Ionicons name="chevron-forward-outline" size={20} color="gray" />
          </View>
        </TouchableOpacity>

        {/* Progress Option */}
        <TouchableOpacity style={styles.button}>
          <View style={styles.left}>
            <Ionicons name="stats-chart" size={25} color="black" />
          </View>
          <View style={styles.center}>
            <Text style={styles.upperText}>Progress</Text>
            <Text style={styles.bottomText}>See your evolution</Text>
          </View>
          <View style={styles.right}>
            <Ionicons name="chevron-forward-outline" size={20} color="gray" />
          </View>
        </TouchableOpacity>

        {/* Privacy Policy Option */}
        <TouchableOpacity style={styles.button}>
          <View style={styles.left}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={25}
              color="black"
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.upperText}>Privacy Policy</Text>
            <Text style={styles.bottomText}>Read the Privacy Policy</Text>
          </View>
          <View style={styles.right}>
            <Ionicons name="chevron-forward-outline" size={20} color="gray" />
          </View>
        </TouchableOpacity>

        {/* Help Centre Option */}
        <TouchableOpacity style={styles.button}>
          <View style={styles.left}>
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={25}
              color="black"
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.upperText}>Help Centre</Text>
            <Text style={styles.bottomText}>Ask for help</Text>
          </View>
          <View style={styles.right}>
            <Ionicons name="chevron-forward-outline" size={20} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102741",
    justifyContent: "center",
    flexDirection: "column",
  },
  goBackButton: {
    position: "absolute",
    top: "7%", // Adjust for proper alignment (higher values for more padding from the top)
    left: "8%", // Adjust for left positioning
    zIndex: 10, // Ensures it stays on top of other components
  },
  upperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    alignItems: "center",
    gap: 20,
  },
  menuTitle: {
    // Changed title style
    color: "white",
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 36,
  },
  button: {
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    width: "85%",
    marginBottom: "3%",
  },
  left: {
    flex: 2,
    alignItems: "center",
  },
  right: {
    flex: 1,
  },
  center: {
    flex: 10,
  },
  upperText: {
    fontSize: 16,
    fontFamily: "Fredoka_700Bold",
    color: "#1C2129",
  },
  bottomText: {
    fontSize: 11,
    fontFamily: "Fredoka_500Medium",
    color: "#818A99",
  },
});
