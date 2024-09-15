import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//imported useful stuff

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
//imported fonts

export default function Description() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {
      fadeIn();
    }
  }, [fontsLoaded]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleContinue = () => {
    navigation.navigate("LogIn");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeview}>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/image.png")}
            style={styles.logo}
          />
          <Text style={styles.textDescriptionIntroduction}>
            Our app helps you track your carbon footprint, discover eco-friendly
            tips, and join a community dedicated to sustainability. Together, we
            can make a positive impact on our planet.
          </Text>
          <Text style={styles.textDescriptionContinue}>
            Tap "Continue" to learn more and start your green journey with
            Orbis!
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.continueButton}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Set SafeAreaView background to white
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 50,
    marginTop: 40,
  },
  textDescriptionIntroduction: {
    fontSize: 16,
    fontFamily: "Fredoka_600SemiBold",
    textAlign: "center",
    marginBottom: "25%",
    flexShrink: 1,
    letterSpacing: -0.5,
  },
  textDescriptionContinue: {
    fontSize: 14,
    fontFamily: "Fredoka_600SemiBold",
    textAlign: "center",
    marginBottom: "17%",
    flexShrink: 1,
    letterSpacing: -0.5,
  },
  button: {
    backgroundColor: "#41980B",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignContent: "center",
    width: "90%",
    height: 60,
  },
  continueButton: {
    fontFamily: "Fredoka_700Bold",
    color: "white",
    fontSize: 15,
    paddingTop: "3%",
    textAlign: "center",
    letterSpacing: 0.4,
  },
});
