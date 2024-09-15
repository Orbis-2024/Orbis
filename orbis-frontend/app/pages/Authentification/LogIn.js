import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

//starting the page:
export default function LogIn() {
  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Move useContext to the top level of the component
  const { setUserID, setToken } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://fd37-78-97-173-76.ngrok-free.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        // When the response is not okay
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();

      if (data.token) {
        await AsyncStorage.setItem("jwtToken", data.token);
        await AsyncStorage.setItem("userID", String(data.userID));
        setToken(data.token);
      }

      if (data.userID) {
        setUserID(data.userID);
        Alert.alert("Login Successful!");
        navigation.navigate("AllDone");
      } else {
        console.error("UserID not found in response data:", data);
        Alert.alert("Login failed: user ID not found.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert(
        "An error occurred during login. Please check your credentials and try again."
      );
    }
  };

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

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
            <View style={styles.header1}>
              <Image
                source={require("../../assets/image.png")}
                style={styles.logo}
              />
              <Text style={styles.text1}>ORBIS</Text>
            </View>

            <View style={styles.header2}>
              <Text style={styles.text2}>Welcome back!</Text>
              <Text style={styles.text3}>Let’s sign you in.</Text>
            </View>

            <View style={styles.inputBox}>
              <Icon
                name="envelope-o"
                size={20}
                color="#bbb"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor={"gray"}
              />
            </View>

            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="key-outline"
                size={20}
                color="#bbb"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                placeholderTextColor={"gray"}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={25}
                  color="#bbb"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.forgotText}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Recovery1")}
              >
                <Text style={styles.forgotText2}>Forgot passsword?</Text>
              </TouchableOpacity>
              <View style={styles.underline} />
            </View>
            <View style={styles.lastButtons}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.text4}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignUp}
              >
                <Text style={styles.text5}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

//each style use can be deducted by the name:

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#fff", // Ensure background color is consistent
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  text4: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 17,
    paddingLeft: 2,
    paddingTop: "2%",
    alignText: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  text5: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 17,
    paddingLeft: 2,
    alignItems: "center",
    alignText: "center",
    justifyContent: "center",
    paddingTop: "2%",
    color: "black", // Updated color to match design
  },
  loginButton: {
    backgroundColor: "#41980B", // Updated color to match design
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: "#28a745", // Updated color to match design
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  lastButtons: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: "35%",
  },
  forgotText: {
    alignSelf: "flex-end",
    marginRight: 20,
    paddingBottom: "13%",
  },
  forgotText2: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 15,
    letterSpacing: 1,
    color: "#351F17",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#351F17",
  },
  header1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: "5%",
  },
  header2: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text1: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 24,
    paddingTop: "4%",
    paddingRight: "5%",
    letterSpacing: -1.38,
    color: "#351F17",
  },
  text2: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 23,
    paddingLeft: 2,
    paddingTop: "10%",
  },
  text3: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 36,
    paddingLeft: 2,
    paddingTop: "3%",
    paddingBottom: "20%",
    letterSpacing: -1,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "lightgray", // Updated color to match design
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "90%",
    marginLeft: "5%",
  },
});
