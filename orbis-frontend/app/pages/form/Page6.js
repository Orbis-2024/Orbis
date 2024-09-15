import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Animated,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function Page6() {
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option

  const backgroundImage = require("../../assets/background.jpeg");
  const navigation = useNavigation();
  const route = useRoute();

  const { userResponses } = route.params || {}; // Retrieve responses
  let { co2Emission } = route.params || {};

  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  }); //fonts

  // const handleBack = () => {
  //   router.back();
  // };

  const options = [
    "Freestanding, no running water",
    "Freestanding, running water",
    "Multi-storey apartment",
    "Duplex, row house or building with 2-4 housing units",
    "Luxury condominium",
  ]; //option list

  useEffect(() => {
    if (fontsLoaded) {
      fadeIn();
    }
  }, [fontsLoaded]);

  const fadeAnim = useRef(new Animated.Value(0)).current; //for animation

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (index) => {
    const options = [
      "Freestanding, no running water",
      "Freestanding, running water",
      "Multi-storey apartment",
      "Duplex, row house or building with 2-4 housing units",
      "Luxury condominium",
    ];

    const updatedResponses = [
      ...userResponses,
      { questionID: 6, answer: options[index] },
    ];
    if (options[index] === "Freestanding, no running water") {
      co2Emission += 500;
    } else if (options[index] === "Freestanding, running water") {
      co2Emission += 1000;
    } else if (options[index] === "Multi-storey apartment") {
      co2Emission += 800;
    } else if (
      options[index] === "Duplex, row house or building with 2-4 housing units"
    ) {
      co2Emission += 1200;
    } else if (options[index] === "Luxury condominium") {
      co2Emission += 1500;
    }
    console.log("Page X - CO2 Emission:", co2Emission);
    navigation.navigate("Page 7", {
      co2Emission: co2Emission,
      userResponses: updatedResponses,
    }); // Pass updated responses
  };

  if (!fontsLoaded) {
    return null;
  }
  const handleBack = (index) => {
    console.log("Question 6: revoked");
    index = 0;
    navigation.navigate("Page 5");
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
              <View style={styles.page}>
                <Text style={styles.question}>
                  Which housing type best describes your home?
                </Text>
                {[
                  "Freestanding, no running water",
                  "Freestanding, running water",
                  "Multi-storey apartment",
                  "Duplex, row house or building with 2-4 housing units",
                  "Luxury condominium",
                ].map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => handlePress(index)}
                    activeOpacity={0.5}
                  >
                    <Text style={styles.buttonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
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
  button: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: -50,
    width: "80%",
    height: "11%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "5%",
  },
  buttonText: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 17,
    textAlign: "center",
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
    paddingLeft: 2,
    marginHorizontal: "2%",
    textAlign: "center",
    paddingTop: "10%",
    marginBottom: "10%",
    color: "white",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
});
