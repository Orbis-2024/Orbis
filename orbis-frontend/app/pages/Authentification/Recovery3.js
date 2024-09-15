import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
//imported fonts
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Recovery2() {
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const handleContinue = () => {
    if (!password1 || !password2) {
      Alert.alert("Passwords cannot be empty!");
      return;
    }

    if (/\s/.test(password1) || /\s/.test(password2)) {
      Alert.alert("Passwords cannot contain spaces!");
      return;
    }

    if (password1 === password2) {
      console.log("Password:", password2);
      navigation.navigate("Alldone2");
    } else {
      Alert.alert("Passwords don't match!");
    }
  };

  if (!fontsLoaded) {
    return null;
  }
  //<Animated.View style={{ opacity: fadeAnim }}></Animated.View>
  return (
    <SafeAreaView style={styles.safeview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.page}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          bounces={false}
        >
          <Animated.View style={[{ opacity: fadeAnim }, styles.animatedView]}>
            <View style={styles.page}>
              <View style={styles.LogoAndTitle}>
                <Image
                  source={require("../../assets/image.png")}
                  style={styles.logo}
                />
                <Text style={styles.title}>ORBIS</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Create a new</Text>
                <Text style={styles.subtitle}>password</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                  <MaterialCommunityIcons
                    name="key-outline"
                    size={20}
                    color="#bbb"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={!showPassword1}
                    style={styles.input1}
                    value={password1}
                    onChangeText={setPassword1}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword1(!showPassword1)}
                  >
                    <MaterialCommunityIcons
                      name={showPassword1 ? "eye-outline" : "eye-off-outline"}
                      size={25}
                      color="#bbb"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputBox2}>
                  <MaterialCommunityIcons
                    name="key-outline"
                    size={20}
                    color="#bbb"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Repeat password"
                    secureTextEntry={!showPassword2}
                    style={styles.input2}
                    value={password2}
                    onChangeText={setPassword2}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword2(!showPassword2)}
                  >
                    <MaterialCommunityIcons
                      name={showPassword2 ? "eye-outline" : "eye-off-outline"}
                      size={25}
                      color="#bbb"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.lastButton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleContinue}
                >
                  <Text style={styles.buttonText}>
                    Confirm your new password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  page: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
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
  subtitleContainer: {
    marginTop: "45%",
    flexShrink: 1,
  },
  inputIcon: {
    marginRight: 20,
  },
  subtitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 29,
    textAlign: "center",
    letterSpacing: -1,
  },
  input1: {
    flex: 1,
    fontSize: 16,
  },
  input2: {
    fontSize: 16,
    flex: 1,
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
    marginBottom: 15,
  },
  inputBox2: {
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
    marginTop: "20%",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "#41980B",
    paddingVertical: 15,
    width: "90%",
    borderRadius: 10,
    height: 60,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 15,
    color: "white",
    paddingTop: "1%",
  },
  lastButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
