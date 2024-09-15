import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import ThreeDView from "../../components/ThreeDView";
import ProgressBar from "react-native-progress/Bar";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for the settings icon
import { useNavigation } from "@react-navigation/native"; // For navigation to settings page
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

const image = require("../../assets/backgroundstars.jpeg");

export default function HomePage() {
  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const navigation = useNavigation(); // Use navigation to navigate to Settings page

  if (!fontsLoaded) {
    return null;
  }

  const progress = 0.76;

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        {/* Settings Icon */}
        <View style={styles.settingsIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("MenuStack")}>
            <Icon name="bars" size={40} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.upperContainer}>
          <ProgressBar
            progress={progress}
            width={300}
            height={20}
            color="rgb(255, 255, 255)"
            borderRadius={10}
            unfilledColor="rgba(129, 138, 153, 1)"
            borderWidth={0}
          />
          <Text style={styles.upperText}>{`${(progress * 100).toFixed(
            0
          )}% completed`}</Text>
        </View>

        <View style={styles.modelContainer}>
          <ThreeDView />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  settingsIconContainer: {
    position: "absolute",
    top: 50, // Distance from the top to match the example
    left: 20, // Distance from the left edge to match the example
    zIndex: 10, // Ensure it's on top of the other components
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Adding background transparency for the button
    borderRadius: 50, // Rounded circular background
    padding: 10, // Padding inside the button for space around the icon
  },
  upperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "120%",
  },
  upperText: {
    marginTop: "7%",
    fontSize: 23,
    fontFamily: "Fredoka_500Medium",
    color: "#FFFFFF",
  },
  modelContainer: {
    ...StyleSheet.absoluteFillObject, // Makes this container fill the entire parent
    zIndex: 1, // Place background behind other components
  },
});
