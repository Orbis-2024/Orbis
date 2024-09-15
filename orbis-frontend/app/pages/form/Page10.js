import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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

export default function Page_10() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const navigation = useNavigation();
  const handleBack = (index) => {
    console.log("Question 10: revoked");
    index = 0;
    navigation.navigate("Page 9");
  };
  const route = useRoute();
  let { co2Emission } = route.params || {};
  const { userResponses } = route.params || {};

  const handlePress = (index) => {
    const updatedResponses = [
      ...userResponses,
      { questionID: 10, answer: index == 1 ? "Yes" : "No" },
    ];
    if (index == 1) {
      co2Emission += 1000;
    }
    console.log("option index:", index);
    console.log(co2Emission);
    navigation.navigate("Page 11", {
      userResponses: updatedResponses,
      co2Emission: co2Emission,
    });
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backgroundImage = require("../../assets/background.jpeg");

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
        <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
          <View style={styles.page}>
            <Text style={styles.question}>
              Do you have electricity in your home?
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress(1)}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress(2)}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: -200,
    width: "80%",
    height: "12%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "10%",
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
