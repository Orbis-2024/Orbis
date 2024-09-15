import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { UserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GetUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const response = await fetch(
      "https://fd37-78-97-173-76.ngrok-free.app/api/users/un", // Adjust the URL as needed
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return {
      username: data.username,
      profileImagePath: data.profileImagePath,
    };
  } catch (error) {
    console.error("Error fetching user details:", error);
    Alert.alert("An error occurred while fetching user details.");
  }
};

export default function Profile() {
  const [profileImagePath, setProfileImagePath] = useState(null);
  const [username, setUsername] = useState(""); // Add state to store username
  // Replace this with the actual token
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      navigation.navigate("LogIn");
      /* Alert.alert("Are you sure you Logout?", [
        {
          text: "Cancel",

          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => navigation.navigate("LogIn"),
          style: "default",
        },
      ]);*/
    } catch (error) {
      console.log("Error loggin out:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        const userDetails = await GetUserDetails();
        console.log(userDetails.profileImagePath);
        if (userDetails) {
          setUsername(userDetails.username);
          const correctedPath = userDetails.profileImagePath.replace(
            /\\/g,
            "/"
          );
          setProfileImagePath(correctedPath);
        }
      };

      fetchUserDetails();
    }, [])
  );

  const imageUrl = profileImagePath
    ? `https://fd37-78-97-173-76.ngrok-free.app/${profileImagePath}`
    : null;

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
        <Ionicons name="chevron-back-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Profile Picture and Username */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          //source={{ uri: imageUrl }} in case I come back to this I will change it but for now more important things
          source={require("../../assets/profile.jpg")}
          onError={(error) => {
            console.log("Error loading image: ", error.nativeEvent.error);
            Alert.alert("Error", "Failed to load profile image");
          }}
        />
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>
        {/* Edit Profile Option */}
        <TouchableOpacity
          style={[styles.option, styles.shadow]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={25}
            color="black"
          />
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Edit Profile</Text>
            <Text style={styles.optionDescription}>
              Change your personal details
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>

        {/* Change Password Option */}
        <TouchableOpacity style={[styles.option, styles.shadow]}>
          <MaterialCommunityIcons name="key-outline" size={25} color="black" />
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Change Password</Text>
            <Text style={styles.optionDescription}>Change your password</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>

        {/* Delete Account Option */}
        <TouchableOpacity style={[styles.option, styles.shadow]}>
          <MaterialCommunityIcons
            name="account-remove-outline"
            size={25}
            color="black"
          />
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Delete Account</Text>
            <Text style={styles.optionDescription}>Delete your account</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Logout Option */}
      <TouchableOpacity
        style={[styles.logoutButton, styles.shadow, styles.distance]}
        onPress={handleLogout}
      >
        <MaterialCommunityIcons name="logout" size={25} color="black" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  goBackButton: {
    position: "absolute",
    top: 40,
    left: 15,
    zIndex: 10,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 10,
  },
  username: {
    fontSize: 28,
    fontFamily: "Fredoka_600SemiBold",
    fontWeight: "bold",
  },
  menuOptions: {
    marginTop: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: "bold",
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: "Fredoka_600SemiBold",
    fontWeight: "bold",
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: "Fredoka_400Regular",
    color: "#555",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  distance: {
    marginTop: "60%",
  },
});
