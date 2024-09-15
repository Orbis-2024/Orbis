import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomSlider5 from "../../objectsForm/slider5";
import Slider5Copy from "../../objectsForm/slider5-copy";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Page16() {
  const [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const [slideValue, setSlideValue] = useState(0); // State to store slider value
  const [slideValue2, setSlideValue2] = useState(0); // State to store second slider value
  const navigation = useNavigation();
  const route = useRoute();

  const { userResponses } = route.params || {}; // Retrieve user responses
  let { co2Emission } = route.params || {};

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backgroundImage = require("../../assets/background.jpeg");

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

  const handleContinue = () => {
    const updatedResponses = [
      ...userResponses,
      { questionID: 16, answer: slideValue },
      { questionID: 24, answer: slideValue2 }, // Assuming questionID for second slider
    ];
    console.log("CO2 Emission in Page16:", co2Emission);
    navigation.navigate("Page 17", {
      userResponses: updatedResponses,
      co2Emission: co2Emission,
    }); // Pass updated responses to the next page
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeview}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={styles.back_icon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
              <View style={styles.page}>
                <View style={styles.title}>
                  <Text style={styles.question}>
                    What is the average fuel economy of the vehicles you use
                    most often?
                  </Text>
                </View>

                <View style={styles.chartsize}>
                  <CustomSlider5 onSlideValueChange={setSlideValue} />
                  <Slider5Copy onSlideValueChange={setSlideValue2} />
                </View>
                <View style={styles.lastButton2}>
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleContinue}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  lastButton2: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  continueButton: {
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  continueButtonText: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 16,
    paddingLeft: 2,
    color: "black",
  },
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  question: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 32,
    marginHorizontal: "2%",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginTop: "-20%",
    marginBottom: "-120%",
  },
  chartsize: {
    alignContent: "center",
    alignSelf: "center",
    paddingTop: "50%",
    resizeMode: "contain",
  },
});
