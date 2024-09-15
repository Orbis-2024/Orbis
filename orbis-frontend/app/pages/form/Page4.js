import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useRoute
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import DonutChart from "../../objectsForm/DonutChart";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function Page4() {
  const backgroundImage = require("../../assets/background.jpeg");
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to get route params
  const { width, height } = useWindowDimensions();

  const { userResponses } = route.params || {}; // Retrieve userResponses from route params
  let { co2Emission } = route.params || {};

  const [selectedPercentage, setSelectedPercentage] = useState(null);

  const calculateCO2Emission = (percentage) => {
    return co2Emission + (100 - percentage) * 2;
  };

  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const handleBack = (index) => {
    console.log("Question 4: revoked");
    index = 0;
    navigation.navigate("Page 3");
  };

  const handleChartSelection = (percentage) => {
    setSelectedPercentage(percentage);
  };

  const handleContinue = () => {
    if (selectedPercentage !== null) {
      const updatedEmission = calculateCO2Emission(selectedPercentage);

      const updatedResponses = [
        ...userResponses,
        { questionID: 4, answer: { selectedPercentage } },
      ];
      console.log("Page 4 - CO2 Emission:", updatedEmission);
      navigation.navigate("Page 5", {
        userResponses: updatedResponses,
        co2Emission: updatedEmission,
      });
    } else {
      alert("Please select a percentage before continuing.");
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    const isSmallScreen = width < 350 || height < 650;
    const titleFontSize = isSmallScreen ? 24 : 32;
    const titleMarginTop = isSmallScreen ? "5%" : "10%";
    const buttonWidth = isSmallScreen ? width * 0.65 : width * 0.75;
    const buttonPaddingVertical = height * 0.015;

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
          <StatusBar barStyle={"white-content"} />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View
              style={{
                marginTop: titleMarginTop,
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={[styles.title, { fontSize: titleFontSize }]}>
                How much of the food that you eat is unprocessed, unpackaged?
              </Text>
            </View>

            {/* Pass the selection handler to the DonutChart */}
            <View style={[styles.chartContainer, { height: 0.4 * height }]}>
              <DonutChart
                isSmallScreen={isSmallScreen}
                onSelect={handleChartSelection} // Handle user selection
                selectedPercentage={selectedPercentage} // Pass selectedPercentage to DonutChart for feedback (optional)
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: buttonWidth,
                    paddingVertical: buttonPaddingVertical,
                  },
                ]}
                onPress={handleContinue}
              >
                <Text
                  style={[
                    styles.continueButton,
                    { fontSize: titleFontSize * 0.75 },
                  ]}
                >
                  Continue
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "5%",
  },
  title: {
    fontFamily: "Fredoka_500Medium",
    textAlign: "center",
    color: "white",
    marginHorizontal: "5%",
  },
  chartContainer: {
    width: "80%", // Ensure the chart fits within the screen width
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "5%", // Adjust to provide space for the button
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    fontFamily: "Fredoka_600SemiBold",
    color: "black",
    fontWeight: "bold",
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
});
