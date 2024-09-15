import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link, useLocalSearchParams } from "expo-router";

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

export default function Recovery2() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const route = useRoute();
  const [Visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { email } = route.params || {};
  const [value, setValue] = useState("");

  const [message, setMessage] = useState("Re-send email");

  const navigation = useNavigation();
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

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    console.log("code:", value);
    navigation.navigate("Recovery3");
  };

  const handleResend = () => {
    setMessage("Sending...");
    console.log("Resending...");
    setTimeout(() => {
      setVisible(true);
      setMessage("Re-send email");
    }, 5000);
  };

  const handleChange = (text) => {
    if (/^\d{0,4}$/.test(text)) {
      setValue(text);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableOpacity style={styles.back_icon} onPress={handleBack}>
          <Ionicons name="chevron-back" size={26} color="black" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.container}>
              <Image
                source={require("../../assets/image.png")}
                style={styles.logo}
              />
              <View style={styles.pos1}>
                <Text style={styles.subtitle}>Enter code received</Text>
                <Text style={styles.subtitle2}>
                  Enter the 4-digit code sent to {email}
                </Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputBox}>
                    <MaterialCommunityIcons
                      name="pencil-outline"
                      size={24}
                      color="#888"
                      style={styles.icon1}
                    />
                    <TextInput
                      style={styles.inputText}
                      value={value}
                      onChangeText={handleChange}
                      keyboardType="numeric"
                      maxLength={4}
                      placeholder="Enter the code received"
                    />
                  </View>
                </View>
                <View style={styles.pos2}>
                  <Text style={styles.resendTexttext}>
                    Didn’t get the code?
                  </Text>
                  {Visible && (
                    <Pressable onPress={handleResend}>
                      <Text
                        style={
                          message === "Sending..."
                            ? styles.resendTexttextSending
                            : styles.resendTexttext2
                        }
                      >
                        {message}
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        <View style={styles.lastButton}>
          <TouchableOpacity style={styles.lastButton1} onPress={handleSubmit}>
            <Text style={styles.textButton1}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",

    marginBottom: 10,
  },
  back_icon: {
    position: "absolute",
    top: "6%",
    left: 20,
    zIndex: 1,
  },
  pos1: {
    alignItems: "center",
    paddingTop: 10,
  },
  subtitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 27,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle2: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: "10%",
    marginTop: "5%",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    width: "80%",
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  icon1: {
    marginRight: 10,
  },
  pos2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: "10%",
  },
  resendTexttext: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 15,
  },
  resendTexttextSending: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 15,
  },
  resendTexttext2: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 15,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  lastButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  lastButton1: {
    backgroundColor: "#41980B",
    paddingVertical: 15,
    width: "90%",
    borderRadius: 10,
    height: 60,
    alignItems: "center",
  },
  textButton1: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 16,
    paddingTop: "1%",
    color: "white",
  },
});
