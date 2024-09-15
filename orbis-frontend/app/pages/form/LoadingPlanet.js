import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function LoadingPlanet() {
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const backgroundImage = require("../../assets/background.jpeg"); //bg img

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      fadeIn();
      const timer = setTimeout(() => {
        fadeOut();
        setTimeout(() => {
          navigation.navigate("MainStack");
        }, 700);
      }, 1100); // 3.5 seconds loading

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ImageBackground style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <Animated.View style={{ opacity: fadeAnim, ...styles.container }}>
            <View style={styles.header1}>
              <Text style={styles.text1}>Your Orbis is loading...</Text>
            </View>
          </Animated.View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#102741",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    paddingBottom: "10%",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text1: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 28,
    paddingTop: "15%",
    letterSpacing: -0.4,
    paddingHorizontal: "1%",
    color: "white",
  },
  header1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "5%",
  },
});
