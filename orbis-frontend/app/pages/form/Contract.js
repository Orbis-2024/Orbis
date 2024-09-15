import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
} from "@expo-google-fonts/fredoka";

export default function CarbonFootprintPage() {
  const backgroundImage = require("../../assets/background.jpeg"); // Update this path according to your project structure
  const route = useRoute(); // Use useRoute to get route params
  let { co2Emission } = route.params || {}; // Retrieve co2Emission from route params

  // Convert to kilograms if needed (assuming co2Emission is already in kg)
  const co2InKg = co2Emission;

  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ImageBackground
        style={styles.background}
        source={backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.root}>
          <StatusBar barStyle={"dark-content"} backgroundColor="white" />
          <View style={styles.container}>
            <Text style={styles.title}>Your Carbon Footprint is</Text>
            <Text style={styles.co2Text}>{co2InKg} Kg CO2</Text>
            <Text style={styles.pledgeText}>
              I, Alex, pledge to reduce my carbon footprint with Orbis to
              contribute to a sustainable future and protect our planet. I am
              ready to make meaningful steps towards environmental stewardship,
              making a positive impact and building a greener world for
              generations to come!
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Hold</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 32,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  co2Text: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 48,
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  pledgeText: {
    fontFamily: "Fredoka_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 20,
    color: "#fff",
  },
});
