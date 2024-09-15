import React, { useState, useRef, useEffect, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import Hold from "../../objectsForm/Hold";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Calculator1() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [firstName, setFirstName] = useState("");
  const backgroundImage = require("../../assets/background.jpeg");
  const route = useRoute();
  let { co2Emission } = route.params || {};
  const co2InTons = (co2Emission / 1000).toFixed(2);

  const { userID } = useContext(UserContext);

  useEffect(() => {
    if (fontsLoaded) {
      fadeIn();
    }

    const fetchUserName = async () => {
      if (userID) {
        try {
          const response = await fetch(
            `https://fd37-78-97-173-76.ngrok-free.app/api/users/${userID}`
          );
          const data = await response.json();
          if (data && data.firstName) {
            setFirstName(data.firstName);
          } else {
            setFirstName("User");
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
          setFirstName("User");
        }
      }
    };

    fetchUserName();
  }, [fontsLoaded, userID]);

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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
              <View style={styles.page}>
                <View style={styles.title}>
                  <Text style={styles.textTitle}>Your Carbon Footprint is</Text>
                  <Text style={styles.text1}>{co2InTons}</Text>
                  <Text style={styles.text2}>Tons CO2</Text>
                </View>
                <View style={styles.pledge}>
                  <Text style={styles.pledgeText}>
                    I, {firstName}, pledge to reduce my carbon footprint with
                    Orbis to contribute to a sustainable future and protect our
                    planet. I am ready to make meaningful steps towards
                    environmental stewardship, making a positive impact and
                    building a greener world for generations to come!
                  </Text>
                </View>
                <View style={styles.balloon}>
                  <Hold />
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
  page: {
    flex: 1,
    justifyContent: "space-around",
  },
  safeview: { flex: 1 },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  animatedView: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  title: {
    marginTop: "15%",
    alignItems: "center",
    marginBottom: -30,
  },
  textTitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 32,
    paddingTop: "2%",
    textAlign: "center",
    letterSpacing: -0.4,
    color: "white",
  },
  text1: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 50,
    paddingTop: "5%",
    textAlign: "center",
    letterSpacing: -0.4,
    color: "white",
  },
  text2: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 22,
    letterSpacing: -0.4,
    color: "white",
  },
  pledge: {
    marginTop: "15%",
    marginHorizontal: "4%",
    marginBottom: -60,
  },
  pledgeText: {
    textAlign: "center",
    marginBottom: "25%",
    flexShrink: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Fredoka_500Medium",
    letterSpacing: -0.1,
    lineHeight: 26,
  },
  balloon: {
    justifyContent: "center",
    paddingBottom: "15%",
    alignSelf: "center",
  },
});
