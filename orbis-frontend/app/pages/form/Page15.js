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
import CustomSlider4 from "../../objectsForm/slider4";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Page15() {
  const [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const [slideValue, setSlideValue] = useState(0); // State to store slider value
  const navigation = useNavigation();
  const route = useRoute();

  let { co2Emission } = route.params || {};
  const { userResponses } = route.params || {}; // Retrieve user responses

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
      { questionID: 15, answer: slideValue }, // Add new response to userResponses
    ];
    console.log("Page X - CO2 Emission:", co2Emission);
    co2Emission += slideValue * 2.31;
    navigation.navigate("Page 16", {
      co2Emission: co2Emission,
      userResponses: updatedResponses,
    }); // Pass updated responses
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeview}>
        <TouchableOpacity
          style={styles.back_icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
              <View style={styles.page}>
                <View style={styles.title}>
                  <Text style={styles.question}>
                    How far do you travel by motorcycle each week?
                  </Text>
                </View>

                <View style={styles.chartsize}>
                  <CustomSlider4 onSlideValueChange={setSlideValue} />
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
    marginTop: "-50%",
    marginBottom: "-160%",
  },
  chartsize: {
    alignContent: "center",
    alignSelf: "center",
    paddingTop: "40%",
    resizeMode: "contain",
  },
});
