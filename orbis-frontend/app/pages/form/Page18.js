import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSlider from "../../assets/sliderP18";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Page_18() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const [slideValue, setSlideValue] = useState(1); // Stocăm valoarea slideValue aici
  const navigation = useNavigation();
  const handleBack = (index) => {
    console.log("Question 18: revoked");
    index = 0;
    navigation.navigate("Page 17");
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backgroundImage = require("../../assets/background.jpeg");

  useEffect(() => {
    if (fontsLoaded) {
      fadeIn();
    }
  }, [fontsLoaded]);

  const route = useRoute();
  const { userResponses } = route.params || {}; // Retrieve user responses
  let { co2Emission } = route.params || {};
  const handleContinue = (index) => {
    const updatedResponses = [
      ...userResponses,
      { questionID: 18, answer: index },
    ];
    const updateEmission = co2Emission + slideValue * 0.5;
    console.log("CO2 Emission in Page18:", updateEmission);
    navigation.navigate("Page 19", {
      userResponses: updatedResponses,
      co2Emission: updateEmission,
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
            <View style={styles.page}>
              <View style={styles.title}>
                <Text style={styles.question}>
                  How far do you travel each week by bus?
                </Text>
              </View>

              <View style={styles.chartsize}>
                <CustomSlider onSlideValueChange={setSlideValue} />
              </View>
              <View style={styles.lastButton2}>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => handleContinue(slideValue)}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
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
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
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
    fontSize: 30,
    marginHorizontal: "3%",
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
