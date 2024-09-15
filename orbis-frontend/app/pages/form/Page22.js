import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  Animated,
  Pressable,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; //navigation with router!
import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

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

export default function Page22() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const navigation = useNavigation();

  const route = useRoute();
  let { co2Emission } = route.params || {};
  const { userResponses } = route.params || {};

  const handlePress = (index) => {
    const updatedResponses = [
      ...userResponses,
      { questionID: 22, answer: options[index] },
    ];
    console.log("option index:", index + 1);
    navigation.navigate("Page 23", {
      userResponses: updatedResponses,
      co2Emission: co2Emission,
    });
  }; //on choosing option

  const options = ["Walk", "Car", "Bicycle", "Bus / Subway", "Other"]; //option list

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
  }; //--until here

  if (!fontsLoaded) {
    return null;
  } //!!for fonts error mandatory

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
                <Text style={styles.question}>How do you arrive there? </Text>
                {options.map((option, index) => (
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
    marginVertical: -50,
    width: "80%",
    height: "11%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "5%",
  },
  buttonText: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 17,
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
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
    textAlign: "center",
    paddingTop: "10%",
    marginHorizontal: "2%",
    marginBottom: "10%",
    color: "white",
  },
});
