import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

export default function TermsAndConditions() {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.containerTitle}>
      <Text style={styles.textTitle}>Terms & Conditions</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    alignItems: "center",
  },
  textTitle: {
    fontSize: 30,
    fontFamily: "OpenSans_700Bold",
  },
});
