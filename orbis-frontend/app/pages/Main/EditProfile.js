import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
// Function to get user details from the backend
const GetUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const userID = Number(await AsyncStorage.getItem("userID")); // Get userID from AsyncStorage
    const response = await fetch(
      `https://fd37-78-97-173-76.ngrok-free.app/api/users/${userID}`, // Use the userID in the route
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
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

    if (data.username && data.firstName && data.lastName) {
      return {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
      };
    } else {
      console.error("User details not found in response data:", data);
      Alert.alert("Failed to fetch user details.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    Alert.alert("An error occurred while fetching user details.");
  }
};

// Format date for display as YYYY/MM/DD
const formatDateForDisplay = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JS
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

// Format date for backend (convert back to ISO)
const formatDateForBackend = (dateString) => {
  const [year, month, day] = dateString.split("/");
  return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
};

export default function EditProfile() {
  const navigation = useNavigation();

  // Initialize state with default values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await GetUserDetails();

      if (userDetails) {
        // Update state with the fetched user details
        setFirstName(userDetails.firstName);
        setLastName(userDetails.lastName);
        setUsername(userDetails.username);
        setDateOfBirth(formatDateForDisplay(userDetails.dateOfBirth)); // Format date here
        setEmail(userDetails.email);
      }
    };

    fetchUserDetails();
  }, []);

  // Save user details
  const saveUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      const userID = await AsyncStorage.getItem("userID"); // Get userID from AsyncStorage

      const formattedDateOfBirth = formatDateForBackend(dateOfBirth); // Convert the date back to ISO format

      const response = await fetch(
        `https://fd37-78-97-173-76.ngrok-free.app/api/users/${userID}`, // Use the userID in the route for updating user details
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            dateOfBirth: formattedDateOfBirth, // Send date in ISO format
            email,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      Alert.alert("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      Alert.alert("An error occurred while updating user details.");
    }
  };
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
        <Ionicons name="chevron-back-outline" size={32} color="black" />
      </TouchableOpacity>

      {/* Profile Picture and Edit Title */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/profile.jpg")} // Replace with the image URL you want to use
        />
        <TouchableOpacity onPress={() => navigation.navigate("ProfilePicture")}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder="First Name"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
          placeholder="Date of Birth (YYYY/MM/DD)"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveUserDetails}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
  },
  editText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Fredoka_500Medium",
  },
  formContainer: {
    marginTop: 30,
  },
  input: {
    height: "10%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    paddingHorizontal: 15,
    marginVertical: 10,
    fontFamily: "Fredoka_400Regular",
  },
  saveButton: {
    backgroundColor: "#41980B",
    height: "9%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: "7%",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Fredoka_500Medium",
  },
});
