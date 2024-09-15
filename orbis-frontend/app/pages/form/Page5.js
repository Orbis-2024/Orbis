import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DonutChart from "../../objectsForm/DonutChart";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { useWindowDimensions } from "react-native"; // For screen dimensions
import Ionicons from "react-native-vector-icons/Ionicons";
export default function Page5() {
  const backgroundImage = require("../../assets/background.jpeg");
  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions(); // Use to adjust layout dynamically

  const { userResponses } = route.params || {};
  let { co2Emission } = route.params || {};

  const [selectedPercentage, setSelectedPercentage] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      fadeIn();
    }
  }, [fontsLoaded]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const calculateCO2Emission = (percentage) => {
    return co2Emission + (100 - percentage) * 3;
  };

  const handleContinue = () => {
    if (selectedPercentage > 0) {
      const updatedEmission = calculateCO2Emission(selectedPercentage);
      const updatedResponses = [
        ...userResponses,
        { questionID: 5, answer: selectedPercentage },
      ];
      console.log("Page 5 - CO2 Emission:", updatedEmission);
      navigation.navigate("Page 6", {
        userResponses: updatedResponses,
        co2Emission: updatedEmission,
      });
    } else {
      alert("Please select a percentage before continuing.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }
  const handleBack = (index) => {
    console.log("Question 5: revoked");
    index = 0;
    navigation.navigate("Page 4");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeview}>
        <TouchableOpacity
          style={styles.back_icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
          <View style={styles.page}>
            <View style={styles.title}>
              <Text style={[styles.question, { fontSize: 0.08 * width }]}>
                How much of the food that you eat is locally grown?
              </Text>
              <Text style={[styles.explanation, { fontSize: 0.062 * width }]}>
                (less than 320 kilometers/ 200 miles away)
              </Text>
            </View>
            <View style={[styles.chartContainer, { height: 0.4 * height }]}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <DonutChart
                  onSelect={(percentage) => setSelectedPercentage(percentage)}
                />
              </GestureHandlerRootView>
            </View>
            <View style={styles.lastButtonContainer}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  animatedView: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  page: {
    flex: 1,
    justifyContent: "space-between", // Distribute space evenly
    alignItems: "center",
    paddingVertical: "5%", // Padding to avoid overlapping
  },
  question: {
    fontFamily: "Fredoka_500Medium",
    textAlign: "center",
    color: "white",
  },
  explanation: {
    fontFamily: "Fredoka_500Medium",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginTop: "10%",
  },
  chartContainer: {
    width: "80%", // Ensure the chart fits within the screen width
    justifyContent: "center",
    alignItems: "center",
  },
  lastButtonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: "5%", // Adjust to provide space for the button
  },
  continueButton: {
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    width: "80%", // Ensure the button width fits screen size
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  continueButtonText: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 20,
    color: "black",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
});
