import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Image,
  Animated,
  StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { Link, SplashScreen, font } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
//imported fonts

import Icon from "react-native-vector-icons/FontAwesome";

//page:
export default function Recovery1() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  }); //just fonts

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [email, setEmail] = useState("");

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

  const handleSubmit = () => {
    navigation.navigate("Recovery2", { email });
    console.log("Email:", email);
  };
  handleForm = () => {
    navigation.navigate("FormularStack");
  };
  const handleCancel = () => {
    navigation.navigate("LogIn");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView // pentru ca butoanele sa nu se mutileze cand deschizi tastatura
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
            <View style={styles.LogoAndTitle}>
              <Image
                source={require("../../assets/image.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>ORBIS</Text>
            </View>

            <View>
              <Text style={styles.subtitle}>Recover your password</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputBox}>
                <Icon
                  name="envelope-o"
                  size={20}
                  color="#bbb"
                  style={styles.icon1}
                />
                <TextInput
                  placeholder="Email"
                  style={styles.inputText}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={styles.lastButton1}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.textButton1}>Send code</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.cancelButton2} onPress={handleForm}>
            <Text style={styles.cancelButtonText}>FORMULAR</Text>
          </TouchableOpacity>
          <View style={styles.lastButton2}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  icon1: {
    marginRight: 20,
  },
  LogoAndTitle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: "5%",
  },
  logo: {
    width: 50,
    height: 50,
    paddingRight: 1,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 24,
    paddingTop: "4%",
    color: "#351F17",
    paddingRight: "5%",
    letterSpacing: -1.38,
  },
  subtitle: {
    flexShrink: 1,
    fontFamily: "Fredoka_700Bold",
    fontSize: 29,
    textAlign: "center",
    letterSpacing: -1.4,
    paddingLeft: 2,
    paddingTop: "20%",
    marginBottom: "5%",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "90%",
    height: 60,
  },
  inputContainer: {
    paddingBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputText: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  textButton1: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 16,
    paddingLeft: 2,
    alignText: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  lastButton1: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: "90%",
  },
  lastButton2: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  submitButton: {
    backgroundColor: "#41980B",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    height: 60,
    justifyContent: "center",
  },
  cancelButton2: {
    borderWidth: 2,
    borderColor: "#41980B",
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    marginBottom: "30%",
    marginLeft: 20,
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: "#41980B",
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  cancelButtonText: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 16,
    paddingLeft: 2,
    alignText: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    letterSpacing: -0.7,
  },
});
