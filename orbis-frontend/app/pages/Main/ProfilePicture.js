import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import Modal from "react-native-modal"; // For cross-platform modal
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ProfilePicture() {
  const [profileImagePath, setProfileImagePath] = useState(null);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Avoid rendering if fonts aren't loaded
  }

  if (!profileImagePath) {
    return <Text>Loading...</Text>;
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChooseLibrary = () => {
    Alert.alert("Choose from library selected");
    // Handle logic to open image library
    setModalVisible(false); // Close modal after selection
  };

  const handleDeletePhoto = () => {
    Alert.alert("Delete photo selected");
    // Handle logic to delete photo
    setModalVisible(false); // Close modal after selection
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        const response = await fetch(
          "https://fd37-78-97-173-76.ngrok-free.app/api/users/un",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass user's auth token
            },
          }
        );
        const data = await response.json();
        setProfileImagePath(data.profileImagePath);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Profile photo</Text>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: `https://fd37-78-97-173-76.ngrok-free.app/${profileImagePath}`,
          }} // Use backend URL for the image
        />
      </View>

      {/* Modal for edit options */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Profile Photo</Text>
          <Text style={styles.modalSubtitle}>
            Please select the photo location
          </Text>

          <TouchableOpacity onPress={handleChooseLibrary}>
            <Text style={styles.chooseLibraryText}>Choose from library</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeletePhoto}>
            <Text style={styles.deletePhotoText}>Delete photo</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  editText: {
    fontSize: 19,
    fontFamily: "Fredoka_500Medium",
    color: "black", // Edit button text color
  },
  title: {
    fontSize: 24,
    fontFamily: "Fredoka_600SemiBold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    marginTop: "20%",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: "90%", // Adjust size according to your needs
    height: "45%",
    borderRadius: 10, // Border radius for a soft rectangle
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 15,
    fontFamily: "Fredoka_400Regular",
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  chooseLibraryText: {
    fontSize: 20,
    fontFamily: "Fredoka_500Medium",
    color: "blue",
    textAlign: "center",
    marginBottom: 15,
  },
  deletePhotoText: {
    fontSize: 20,
    fontFamily: "Fredoka_500Medium",
    color: "red",
    textAlign: "center",
  },
});
