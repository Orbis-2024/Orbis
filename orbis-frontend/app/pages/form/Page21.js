import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import School from "../../objectsForm/Home-School";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Page21() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const route = useRoute();
  let { co2Emission } = route.params || {};
  const { userResponses } = route.params || {};

  const [slideValue, setSlideValue] = useState(0);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backgroundImage = require("../../assets/background.jpeg");
  useEffect(() => {
    if (fontsLoaded) {
      fadeIn();
    }
  }, [fontsLoaded]);

  const handleCancel = () => {
    const updatedResponses = [
      ...userResponses,
      { questionID: 21, answer: slideValue },
    ];
    navigation.navigate("Page 22", {
      userResponses: updatedResponses,
      co2Emission: co2Emission,
    });
    console.log(slideValue, "km");
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
              <View style={styles.page}>
                <View style={styles.title}>
                  <Text style={styles.question}>
                    How far from home is your school/job?
                  </Text>
                </View>

                <View style={styles.chartsize}>
                  <School onSlideValueChange={setSlideValue} />
                </View>
                <View style={styles.lastButton2}>
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleCancel}
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
    fontSize: 32,
    marginHorizontal: "2%",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginTop: "-40%",
    marginBottom: "-160%",
  },
  chartsize: {
    alignContent: "center",
    alignSelf: "center",
    paddingTop: "40%",
    resizeMode: "contain",
  },
});
