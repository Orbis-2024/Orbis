import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  View,
  Image,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
//imported fonts

export default function Alldone2() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const backgroundImage = require("../../assets/image.png");
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

  useEffect(() => {
    fadeIn();
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle={"dark-content"} />
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <Image source={backgroundImage} style={styles.logo} />

          <View style={styles.containerTitle}>
            <Text style={styles.title}>All done-e-e-e!</Text>
          </View>

          <View style={styles.containerText}>
            <Text style={styles.text1}>Your new password is ready to use.</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonGetStarted}
            onPress={handleContinue}
          >
            <Text style={styles.text2}>Log In</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: "20%",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  containerTitle: {
    marginTop: "20%",
  },
  title: {
    fontSize: 30,
    fontFamily: "Fredoka_700Bold",
    textAlign: "center",
  },
  containerText: {
    marginTop: "13%",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 17,
    fontFamily: "Fredoka_500Medium",
    paddingBottom: "14%",
    color: "black",
  },
  buttonGetStarted: {
    marginTop: "5%",
    width: "90%",
    height: 60,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#41980B",
    borderRadius: 10,
  },
  text2: {
    color: "white",
    textAlign: "center",
    alignText: "center",
    fontFamily: "Fredoka_700Bold",
    fontSize: 17,
  },
});
