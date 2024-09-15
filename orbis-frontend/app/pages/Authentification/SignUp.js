import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Link,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

export default function Signup() {
  const [firstName, setFirstName] = useState(true);
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const navigation = useNavigation();

  const handleDateChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    let formattedDate = "";

    if (cleaned.length > 4) {
      formattedDate = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
    } else {
      formattedDate = cleaned;
    }

    if (cleaned.length > 6) {
      formattedDate = formattedDate.slice(0, 7) + "-" + formattedDate.slice(7);
    }

    setDateOfBirth(formattedDate);
  };

  const getDynamicPlaceholder = () => {
    const placeholder = "YYYY-MM-DD";
    const inputLength = dateOfBirth.length;
    return placeholder.slice(inputLength);
  };

  const calculatePlaceholderOffset = () => {
    const characterWidth = 12; // Approximate width of each character in the input
    const inputLength = dateOfBirth.replace(/[^0-9]/g, "").length;
    return characterWidth * inputLength;
  };

  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  const handleAlert = () => {
    Alert.alert(
      "Are you sure you want to leave this page?",
      "All unsaved progress will be lost...",
      [
        {
          text: "Cancel",

          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => navigation.navigate("LogIn"),
          style: "default",
        },
      ]
    );
  };

  const handleTD = () => {
    navigation.navigate("TermsConditions");
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://fd37-78-97-173-76.ngrok-free.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            dateOfBirth,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        //alert(data.message);
        Alert.alert("Success!");
        navigation.navigate("LogIn");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error registering: ", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <StatusBar barStyle={"dark-content"} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableOpacity onPress={handleAlert}>
            <Image
              source={require("../../assets/left-arrow.png")}
              style={styles.arrowicon}
            />
          </TouchableOpacity>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.inputName}>
            <View style={styles.lastFirstName}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor={"gray"}
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.lastFirstName}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor={"gray"}
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
          <View style={styles.inputRows}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={"gray"}
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputRows}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.input}
                value={dateOfBirth}
                onChangeText={handleDateChange}
                keyboardType="numeric"
                maxLength={10}
                placeholder=""
              />
              <Text
                style={[
                  styles.dynamicPlaceholder,
                  { left: 15 + calculatePlaceholderOffset() },
                ]}
              >
                {getDynamicPlaceholder()}
              </Text>
            </View>
          </View>
          <View style={styles.inputRows}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"gray"}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputRows}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor={"gray"}
              style={styles.input}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="#bbb"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputRows}>
            <TextInput
              placeholder="Repeat Password"
              secureTextEntry={!showRepeatPassword}
              placeholderTextColor={"gray"}
              style={styles.input}
              onChangeText={setRepeatPassword}
              value={repeatPassword}
            />
            <TouchableOpacity
              onPress={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              <MaterialCommunityIcons
                name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="#bbb"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.columnContainer}>
            <View style={styles.square} />
            <View>
              <Text style={styles.textTD}>Terms & Conditions</Text>
              <View style={styles.containerAlignText}>
                <Text style={styles.textConsent}>I have read & agree with</Text>
                <View marginLeft={3}>
                  <TouchableOpacity onPress={handleTD}>
                    <Text style={styles.textConsentTD}>
                      Orbis Terms & Conditions
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.containerNextButton}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleRegister}
            >
              <Text style={styles.textButton}>Next</Text>
            </TouchableOpacity>
          </View>
          {/*<View style={styles.bottomPart}>
          <View style={styles.termsAndConditions}>
            <View style={styles.square} />
            <Text style={styles.textTD}>Terms & Conditions</Text>
          </View>
          <View style={styles.containerConsent}>
            <Text style={styles.textConsent}>
              I have read & agree with Orbis Terms & Conditions
            </Text>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
            <Text style={styles.textButton}>Next</Text>
          </TouchableOpacity>
        </View>*/}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  arrowicon: {
    marginLeft: "7%",
    marginTop: 10,
    width: 20,
    height: 20,
  },
  viewTitle: {
    marginLeft: "7%",
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: "Fredoka_700Bold",
  },
  inputName: {
    flexDirection: "row",
  },
  lastFirstName: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: "3%",
    width: "39%",
    marginLeft: "7%",
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 18,
    paddingHorizontal: 15,
    fontFamily: "Fredoka_500Medium",
    textAlignVertical: "center",
  },
  inputRows: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: "3%",
    paddingHorizontal: 10,
    width: "85%",
    marginLeft: "7%",
    position: "relative",
  },
  textInputContainer: {
    position: "relative",
    width: "100%",
    height: 55, // Ensure this height matches other input fields
  },
  staticPlaceholder: {
    position: "absolute",
    top: 0,
    color: "#A9A9A9",
    fontSize: 18,
    fontFamily: "Fredoka_500Medium",
    zIndex: 1,
    height: 55, // Ensure this height matches the TextInput's height
    lineHeight: 55, // Ensure lineHeight matches the TextInput's height for vertical alignment
  },
  dynamicPlaceholder: {
    position: "absolute",
    top: 0,
    color: "#A9A9A9",
    fontSize: 18,
    fontFamily: "Fredoka_500Medium",
    zIndex: 2, // Ensure this is above the static placeholder
    height: 55, // Ensure this height matches the TextInput's height
    lineHeight: 55, // Ensure lineHeight matches the TextInput's height for vertical alignment
  },
  label: {
    marginBottom: 5,
    color: "#7B7B7B",
    fontFamily: "Fredoka_500Medium",
  },
  bottomPart: {
    justifyContent: "center",
    alignItems: "center",
  },
  termsAndConditions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: 20,
    height: 20,
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 2,
    marginRight: 8,
    marginBottom: 14,
  },
  columnContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textTD: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 20,
  },
  containerConsent: {
    marginBottom: 25,
  },
  textConsent: {
    fontFamily: "Fredoka_500Medium",
  },
  textConsentTD: {
    textDecorationLine: "underline",
  },
  containerAlignText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerNextButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4%",
  },
  nextButton: {
    backgroundColor: "#41980B",
    paddingVertical: 20,
    width: "80%",
    borderRadius: 5,
    alignItems: "center",
  },
  textButton: {
    fontFamily: "Fredoka_700Bold",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
