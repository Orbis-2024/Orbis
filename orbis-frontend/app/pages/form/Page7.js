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
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function Page7({ route }) {
  const navigation = useNavigation();

  const { userResponses } = route.params || {}; // Retrieve responses
  let { co2Emission } = route.params || {};

  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option

  // const fadeAnim = useRef(new Animated.Value(0)).current; // For animation

  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  }); //fonts
  //const navigation = useNavigation();
  // const handleBack = () => {
  //   router.back();
  // };
  const handlePress = (index) => {
    console.log("option index:", index + 1);
    navigation.navigate("Page 8");
  }; //on choosing option

  const options = [
    "Straw/bamboo",
    "Brick/concrete",
    "Steel/other",
    "Wood",
    "Adobe",
  ]; //option list

  const fadeAnim = useRef(new Animated.Value(0)).current; //for animation
  const backgroundImage = require("../../assets/background.jpeg"); //bg img

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

  const handlePress2 = (index) => {
    const options = [
      "Straw/bamboo",
      "Brick/concrete",
      "Steel/other",
      "Wood",
      "Adobe",
    ];

    const updatedResponses = [
      ...userResponses,
      { questionID: 7, answer: options[index] },
    ];
    if (options[index] === "Straw/bamboo") {
      co2Emission += 100;
    } else if (options[index] === "Brick/concrete") {
      co2Emission += 500;
    } else if (options[index] === "Steel/other") {
      co2Emission += 700;
    } else if (options[index] === "Wood") {
      co2Emission += 200;
    } else if (options[index] === "Adobe") {
      co2Emission += 300;
    }
    console.log("Page X - CO2 Emission:", co2Emission);
    navigation.navigate("Page 8", {
      co2Emission: co2Emission,
      userResponses: updatedResponses,
    }); // Pass updated responses
  };

  if (!fontsLoaded) {
    return null;
  }
  const handleBack = (index) => {
    console.log("Question 7: revoked");
    index = 0;
    navigation.navigate("Page 6");
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
                  What material is your house constructed with?
                </Text>
                {[
                  "Straw/bamboo",
                  "Brick/concrete",
                  "Steel/other",
                  "Wood",
                  "Adobe",
                ].map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => handlePress2(index)}
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
    color: "white",
    fontSize: 32,
    paddingLeft: 2,
    marginHorizontal: "2%",

    textAlign: "center",
    paddingTop: "10%",
    marginBottom: "10%",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
});
