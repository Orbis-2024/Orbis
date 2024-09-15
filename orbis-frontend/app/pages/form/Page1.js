import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { useNavigation } from "@react-navigation/native";

export default function Page1() {
  const backgroundImage = require("../../assets/background.jpeg");
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const [selectedOccupation, setSelectedOccupation] = useState(null);

  const handleOptionSelect = (occupation) => {
    setSelectedOccupation(occupation);

    // Prepare the response for submission
    const userResponses = [{ questionID: 1, answer: occupation }];

    // Navigate to the next page and pass the selected occupation
    navigation.navigate("Page 23", { userResponses });
  };

  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    const buttonWidth = width * 0.8;
    const buttonHeight = height * 0.1;

    return (
      <ImageBackground
        style={styles.background}
        source={backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.root}>
          <StatusBar barStyle={"white-content"} backgroundColor="white" />

          <View style={{ marginTop: "10%" }}>
            <Text style={styles.title}>What's your occupation?</Text>
          </View>

          <View style={{ marginBottom: "7%", marginTop: "15%" }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                },
              ]}
              onPress={() => handleOptionSelect("Student")}
            >
              <Text style={styles.text}>Student</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: "7%" }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                },
              ]}
              onPress={() => handleOptionSelect("Employed")}
            >
              <Text style={styles.text}>Employed</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: "7%" }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                },
              ]}
              onPress={() => handleOptionSelect("Freelancer")}
            >
              <Text style={styles.text}>Freelancer</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: "7%" }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                },
              ]}
              onPress={() => handleOptionSelect("Unemployed")}
            >
              <Text style={styles.text}>Unemployed</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: "7%" }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                },
              ]}
              onPress={() => handleOptionSelect("Retired")}
            >
              <Text style={styles.text}>Retired</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Fredoka_500Medium",
    color: "white",
    fontSize: 32,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 17,
  },
});
