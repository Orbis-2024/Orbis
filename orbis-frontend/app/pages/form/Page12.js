import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DonutChart from "../../objectsForm/DonutChart";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Page_12() {
  const backgroundimg = require("../../assets/background.jpeg");
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const [selectedPercentage, setSelectedPercentage] = useState(null);

  const route = useRoute();
  let { co2Emission } = route.params || {};
  const { userResponses } = route.params || {};

  const calculateCO2Emission = (percentage) => {
    return co2Emission + (100 - percentage) * 1;
  };

  const handleContinue = () => {
    const updatedEmission = calculateCO2Emission(selectedPercentage);
    const updatedResponses = [
      ...userResponses,
      { questionID: 12, answer: selectedPercentage },
    ];
    console.log(updatedEmission);
    navigation.navigate("Page 13", {
      userResponses: updatedResponses,
      co2Emission: updatedEmission,
    });
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_500Medium,
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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.page}>
              <View style={styles.title}>
                <Text style={styles.question}>
                  What percentage of your home's electricity comes from
                  renewable sources?
                </Text>
              </View>
              <View
                style={[
                  styles.chartContainer,
                  { height: height * 0.4, marginVertical: height * 0.05 },
                ]}
              >
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <DonutChart
                    onSelect={(percentage) => setSelectedPercentage(percentage)}
                  />
                </GestureHandlerRootView>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.contButton}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  question: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 26, // Reduced for smaller screens
    marginHorizontal: "5%",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginTop: 20, // Reduced top margin for smaller screens
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
  chartContainer: {
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    resizeMode: "contain",
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
    width: "80%",
    height: 50, // Fixed height
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20, // Adjusted for smaller screens
  },
  contButton: {
    fontFamily: "Fredoka_600SemiBold",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  page: {
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: 20,
  },
});
