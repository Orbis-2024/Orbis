import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSlider from "../../objectsForm/slider2";
import { Link, useNavigation, useRoute } from "@react-navigation/native";

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
// Adjust the import path as needed

export default function Page13() {
  const [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const [slideValue, setSlideValue] = useState(1); // State to store slider value
  const navigation = useNavigation();
  const route = useRoute();

  let { co2Emission } = route.params || {};
  const { userResponses } = route.params || {}; // Retrieve user responses

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backgroundImage = require("../../assets/background.jpeg");

  const handleBack = (index) => {
    console.log("Question 9: revoked");
    index = 0;
    navigation.navigate("Page 12");
  };
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
      { questionID: 13, answer: slideValue }, // Add new response to userResponses
    ];
    if (slideValue === 1) {
      co2Emission += 50;
    } else if (slideValue === 3) {
      co2Emission += 100;
    } else if (slideValue === 5) {
      co2Emission += 150;
    } else if (slideValue === 7) {
      co2Emission += 200;
    } else if (slideValue === 9) {
      co2Emission += 300;
    }
    console.log("Page X - CO2 Emission:", co2Emission);
    navigation.navigate("Page 14", {
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
                    Compared to your neighbors, how much trash do you generate?
                  </Text>
                </View>
                <View style={styles.chartsize}>
                  <CustomSlider onSlideValueChange={setSlideValue} />
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
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
});
