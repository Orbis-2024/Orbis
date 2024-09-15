import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Hold = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const [hasReachedMax, setHasReachedMax] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Listener callback to check if max scale value is reached
    const handleScaleChange = (value) => {
      if (value >= 15) {
        // Check if scale value is greater than or equal to max
        if (!hasReachedMax) {
          setHasReachedMax(true);
          navigation.navigate("LoadingPlanet");
          //console.log("s-a atins limita");
          // Perform any additional actions here if needed
        }
      } else {
        setHasReachedMax(false);
      }
    };

    // Adding listener
    const scaleListenerId = scaleValue.addListener(({ value }) =>
      handleScaleChange(value)
    );

    // Cleanup listener on unmount
    return () => {
      scaleValue.removeListener(scaleListenerId);
    };
  }, [hasReachedMax]);
  const blowUp = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 20,
        // friction: 20, // Adjust friction for a smoother animation
        useNativeDriver: true,
        tension: -22,
        duration: 20000, // Increase the duration for a longer scale-up
      }),
      Animated.timing(opacityValue, {
        toValue: 0, // Make the text invisible
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shrinkBack = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 6, // Adjust friction as needed
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1, // Make the text visible again
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback onPressIn={blowUp} onPressOut={shrinkBack}>
      <Animated.View
        style={[styles.button, { transform: [{ scale: scaleValue }] }]}
      >
        <Animated.Text style={[styles.text, { opacity: opacityValue }]}>
          Hold
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#102741",
    borderRadius: 100,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default Hold;
