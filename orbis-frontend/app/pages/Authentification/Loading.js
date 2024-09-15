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
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Loading() {
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const backgroundImage = require("../../assets/background.jpeg");

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
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");

        if (token) {
          if (fontsLoaded) {
            fadeIn();
            const timer = setTimeout(() => {
              fadeOut();
              setTimeout(() => {
                navigation.navigate("MainStack");
              }, 500);
            }, 1000);
          }
        } else {
          if (fontsLoaded) {
            fadeIn();
            const timer = setTimeout(() => {
              fadeOut();
              setTimeout(() => {
                navigation.navigate("Description");
              }, 500);
            }, 1000); // 3.5 seconds loading

            return () => clearTimeout(timer);
          }
        }
      } catch (error) {
        console.error("Error checking token :", error);
      }
    };
    checkToken();
  }, [fontsLoaded, navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <Animated.View style={{ opacity: fadeAnim, ...styles.container }}>
            <View style={styles.header1}>
              <Image
                source={require("../../assets/image.png")}
                style={styles.logo}
              />
              <Text style={styles.text1}>ORBIS</Text>
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
    fontSize: 30,
    paddingTop: "2%",
    letterSpacing: -1.38,
    color: "black",
  },
  header1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "5%",
  },
});
