import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext"; // Ensure this path is correct

const { width } = Dimensions.get("window");

const CalculateFootprint = () => {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { userResponses } = route.params || {}; // Extract user responses
  let { co2Emission } = route.params || {};
  const { userID } = useContext(UserContext); // Access userID from the context

  useEffect(() => {
    const sendFormData = async () => {
      try {
        if (!userID) {
          Alert.alert("User ID not found", "Please log in again.");
          return;
        }
        console.log("CO2 Emission in CalculateFootprint:", co2Emission);
        const formattedResponses = userResponses.map((response) => ({
          questionID: response.questionID,
          answer:
            typeof response.answer === "object"
              ? JSON.stringify(response.answer)
              : String(response.answer),
        }));

        const formattedData = {
          userID: userID,
          responses: formattedResponses,
        };

        console.log("Formatted form data:", formattedData);
        console.log("CO2 Emission inside sendFormData:", co2Emission);
        const response = await fetch(
          "https://fd37-78-97-173-76.ngrok-free.app/api/responses",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          }
        );

        const data = await response.json();
        if (response.ok) {
          Alert.alert("Data submitted successfully!");
          console.log("What: ", co2Emission);
          navigation.navigate("Calculator1", {
            co2Emission: co2Emission,
          });
        } else {
          console.log("Server responded with an error:", data);
          Alert.alert(
            "Submission Failed",
            data.message || "Something went wrong"
          );
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        Alert.alert(
          "Submission Error",
          "There was an error submitting your data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    sendFormData();
  }, [userResponses, navigation, userID, co2Emission]); // Add co2Emission here

  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/background.jpeg")}
          style={styles.backgroundImage}
        />
        <Animatable.Image
          animation="pulse"
          iterationCount="infinite"
          easing="ease-in-out"
          source={require("../../assets/image.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>
          Calculating your{"\n"}Carbon Footprint...
        </Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CDE6D0",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default CalculateFootprint;
