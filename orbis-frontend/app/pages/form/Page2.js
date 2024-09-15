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
export default function Page2() {
  const backgroundImage = require("../../assets/background.jpeg");
  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions();

  const { userResponses } = route.params || {};

  const [selectedOption, setSelectedOption] = useState(null);

  const handleBack = (index) => {
    console.log("Question 2: revoked");
    index = 0;
    navigation.navigate("Page 1");
  };

  const calculateCO2Emission = (option) => {
    switch (option) {
      case "Rarely":
        return 50;
      case "Average":
        return 200;
      case "Shopper":
        return 500;
      case "Luxury Shopper":
        return 1000;
      default:
        return 0;
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    const co2Emission = calculateCO2Emission(option);

    const updatedResponses = [
      ...userResponses,
      { questionID: 2, answer: option },
    ];

    console.log("Page X - CO2 Emission:", co2Emission);

    navigation.navigate("Page 3", {
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
    const buttonWidth = width * 0.8;

    return (
      <ImageBackground
        style={styles.background}
        source={backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.root}>
          <StatusBar barStyle={"white-content"} backgroundColor="white" />
          <TouchableOpacity
            style={styles.back_icon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View
              style={{ marginTop: height * 0.1, marginBottom: height * 0.05 }}
            >
              <Text style={styles.title}>How often do you shop?</Text>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Rarely")}
              >
                <Text style={styles.text}>Rarely</Text>
                <Text style={styles.context}>
                  You only buy new items when it's necessary. You try to fix
                  broken devices and wear clothing for multiple years.
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Average")}
              >
                <Text style={styles.text}>Average</Text>
                <Text style={styles.context}>
                  You like things that last a while but don't say no to the
                  casual upgrade.
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Shopper")}
              >
                <Text style={styles.text}>Shopper</Text>
                <Text style={styles.context}>
                  You enjoy shopping for the latest and greatest. Whether it's
                  clothing or electronics, you've got to have it.
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={() => handleOptionSelect("Luxury Shopper")}
              >
                <Text style={styles.text}>Luxury Shopper</Text>
                <Text style={styles.context}>
                  Your budget allows for frequent upgrades and fast consumption.
                  The thrill of it all is a part of your life
                </Text>
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
    //flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 32,
    textAlign: "center",
    color: "white",
  },
  optionContainer: {
    marginBottom: 20,
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
    fontSize: 17,
    marginBottom: 5,
  },
  context: {
    fontSize: 15,
    fontFamily: "Fredoka_400Regular",
    textAlign: "center",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    zIndex: 1,
  },
});
