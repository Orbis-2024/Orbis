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
} from "react-native";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function Page1() {
  const backgroundImage = require("../../assets/background.jpeg");
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const [selectedOccupation, setSelectedOccupation] = useState(null);

  const route = useRoute();
  let { co2Emission } = route.params || {};
  const { userResponses } = route.params || {};

  const handleOptionSelect = (occupation) => {
    setSelectedOccupation(occupation);
    const updatedResponses = [
      ...userResponses,
      { questionID: 11, answer: occupation },
    ];
    if (occupation == "Very inefficient") {
      co2Emission += 1500;
    } else if (occupation == "Below average") {
      co2Emission += 1200;
    } else if (occupation == "Average") {
      co2Emission += 1000;
    } else if (occupation == "Above average") {
      co2Emission += 700;
    } else if (occupation == "Efficiency-centered design") {
      co2Emission += 500;
    }
    console.log(co2Emission);
    // Navigate to the next page and pass the selected occupation
    navigation.navigate("Page 12", {
      userResponses: updatedResponses,
      co2Emission: co2Emission,
    });
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

          <View style={styles.titleContainer}>
            <Text style={styles.title}>How energy efficient is your home?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth }]}
              onPress={() => handleOptionSelect("Very inefficient")}
            >
              <Text style={styles.text}>Very inefficient</Text>
              <Text style={styles.subText}>
                Poor insulation, few LED lamps, heating/cooling systems used
                often
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { width: buttonWidth }]}
              onPress={() => handleOptionSelect("Below average")}
            >
              <Text style={styles.text}>Below average</Text>
              <Text style={styles.subText}>
                Inefficient lighting, standard appliances
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { width: buttonWidth }]}
              onPress={() => handleOptionSelect("Average")}
            >
              <Text style={styles.text}>Average</Text>
              <Text style={styles.subText}>
                Modern appliances, climate controls
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { width: buttonWidth }]}
              onPress={() => handleOptionSelect("Above average")}
            >
              <Text style={styles.text}>Above average</Text>
              <Text style={styles.subText}>
                Well insulated, efficient lighting and appliances, careful use
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { width: buttonWidth }]}
              onPress={() => handleOptionSelect("Efficiency-centered design")}
            >
              <Text style={styles.text}>Efficiency-centered design</Text>
              <Text style={styles.subText}>
                Passive heating/cooling, advanced temperature control and
                ventilation, low electricity use
              </Text>
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
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: "10%",
  },
  title: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 32,
    textAlign: "center",
    color: "white",
  },
  buttonContainer: {
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
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
    fontSize: 18,
    textAlign: "center",
  },
  subText: {
    fontFamily: "Fredoka_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
});
