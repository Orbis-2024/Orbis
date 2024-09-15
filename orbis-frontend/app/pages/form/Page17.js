import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Animated,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DonutChart from "../../objectsForm/DonutChart";

export default function Page_17() {
  const backgroundimg = require("../../assets/background.jpeg");
  const navigation = useNavigation();

  const [selectedPercentage, setSelectedPercentage] = useState(null);

  const route = useRoute();
  const { userResponses } = route.params || {}; // Retrieve user responses
  let { co2Emission } = route.params || {};

  const handleContinue = (index) => {
    //const updatedEmission = calculateCO2Emission(selectedPercentage); not yet
    const updatedResponses = [
      ...userResponses,
      { questionID: 17, answer: selectedPercentage },
    ];
    console.log("CO2 Emission in Page17:", co2Emission);
    navigation.navigate("Page 18", {
      userResponses: updatedResponses,
      co2Emission: co2Emission,
    });
  };
  const handleBack = () => {
    console.log("Question 17: revoked");
    index = 0;
    navigation.navigate("Page 16");
  };
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_500Medium,
    Fredoka_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <ImageBackground
        style={styles.background}
        source={backgroundimg}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeview}>
          <TouchableOpacity
            style={styles.back_icon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.page}>
            <View style={styles.title}>
              <Text style={styles.question}>
                When you travel by car, how often do you carpool?
              </Text>
            </View>

            <View style={styles.chartsize}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <DonutChart
                  onSelect={(percentage) => setSelectedPercentage(percentage)}
                />
              </GestureHandlerRootView>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleContinue()}
            >
              <Text style={styles.contButton}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  question: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 30,
    marginHorizontal: "3%",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginTop: "30%",
    marginBottom: "-40%",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
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
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "15%",
  },
  contButton: {
    fontFamily: "Fredoka_600SemiBold",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  chartsize: {
    alignContent: "center",
    alignSelf: "center",
    paddingTop: "75%",
    resizeMode: "contain",
  },
});
