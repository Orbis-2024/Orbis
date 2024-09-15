import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function Page3() {
  const backgroundImage = require("../../assets/background.jpeg"); // Update this path according to your project structure
  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions();

  const { userResponses } = route.params || {};
  let { co2Emission } = route.params || {};

  const [selectedOption, setSelectedOption] = useState(null);

  const calculateCO2Emission = (option) => {
    switch (option) {
      case "Never":
        return co2Emission + 0;
      case "Infrequently":
        return co2Emission + 100;
      case "Occasionally":
        return co2Emission + 200;
      case "Often":
        return co2Emission + 300;
      case "Very often":
        return co2Emission + 500;
      default:
        return co2Emission;
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    const updatedEmission = calculateCO2Emission(option);

    const updatedResponses = [
      ...userResponses,
      { questionID: 3, answer: option },
    ];
    console.log("Page X - CO2 Emission:", updatedEmission);

    navigation.navigate("Page 4", {
      co2Emission: updatedEmission,
      userResponses: updatedResponses,
    });
  };
  const handleBack = (index) => {
    console.log("Question 3: revoked");
    index = 0;
    navigation.navigate("Page 2");
  };

  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    const buttonWidth = width * 0.85;

    return (
      <ImageBackground
        style={styles.background}
        source={backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.root}>
          <TouchableOpacity
            style={styles.back_icon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <StatusBar barStyle={"white-content"} backgroundColor="white" />

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View
              style={{ marginTop: height * 0.1, marginBottom: height * 0.05 }}
            >
              <Text style={styles.title}>
                How often do you eat animal-based products?
              </Text>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Never")}
              >
                <Text style={styles.text}>Never</Text>
                <Text style={styles.context}>Vegan</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Infrequently")}
              >
                <Text style={styles.text}>Infrequently</Text>
                <Text style={styles.context}>
                  Vegetarian - eggs/dairy, no meat
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Occasionally")}
              >
                <Text style={styles.text}>Occasionally</Text>
                <Text style={styles.context}>
                  Really like veggies - occasional meat, eggs/dairy
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Often")}
              >
                <Text style={styles.text}>Often</Text>
                <Text style={styles.context}>
                  Balanced meat/veggies - meat a few times a week, eggs/dairy
                  almost daily
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Very often")}
              >
                <Text style={styles.text}>Very often</Text>
                <Text style={styles.context}>Meat daily</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Center the content
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 32,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: "5%",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 20,
    marginBottom: 5,
  },
  context: {
    fontSize: 16,
    fontFamily: "Fredoka_400Regular",
    textAlign: "center",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
});
