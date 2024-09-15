import React, { useState } from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { TapGestureHandler, State } from "react-native-gesture-handler";

// Convert polar coordinates to Cartesian coordinates
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// Generate the path data for an SVG arc
const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const DonutChart = () => {
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const totalSegments = 10;
  const segmentPercentage = 100 / totalSegments;
  const radius = 130;
  const strokeWidth = 30;
  const spaceBetween = 2;

  // Array of animated values for each segment
  const animationValues = Array.from(
    { length: totalSegments },
    () => new Animated.Value(0)
  );

  // Function to animate segments based on selected percentage
  const animateSegments = (percentage) => {
    animationValues.forEach((value, index) => {
      Animated.timing(value, {
        toValue: percentage >= (index + 1) * segmentPercentage ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // Handle single and double tap gestures
  const handleTap = (index, state) => {
    if (state === State.ACTIVE) {
      const newPercentage =
        selectedPercentage === (index + 1) * segmentPercentage
          ? 0
          : (index + 1) * segmentPercentage;

      setSelectedPercentage(newPercentage);
      animateSegments(newPercentage);
    }
  };

  // Interpolating scale animation for the segments
  const scaleInterpolation = (index) =>
    animationValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.1],
    });

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <G rotation="0" origin={`${radius}, ${radius}`}>
          {Array.from({ length: totalSegments }).map((_, index) => {
            const startAngle = index * (360 / totalSegments) + spaceBetween / 2;
            const endAngle =
              (index + 1) * (360 / totalSegments) - spaceBetween / 2;

            return (
              <TapGestureHandler
                key={index}
                onHandlerStateChange={({ nativeEvent }) => {
                  handleTap(index, nativeEvent.state);
                }}
                numberOfTaps={1} // Single tap
              >
                <AnimatedPath
                  d={describeArc(
                    radius,
                    radius,
                    radius - strokeWidth / 2,
                    startAngle,
                    endAngle
                  )}
                  fill="none"
                  stroke={
                    selectedPercentage >= (index + 1) * segmentPercentage
                      ? "teal"
                      : "white"
                  }
                  strokeWidth={strokeWidth}
                  style={{
                    transform: [{ scale: scaleInterpolation(index) }],
                  }}
                />
              </TapGestureHandler>
            );
          })}
        </G>
        <SvgText
          fontFamily="Sans-serif"
          fontWeight="bold"
          fill="black"
          fontSize="40"
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {`${Math.round(selectedPercentage)}%`}
        </SvgText>
      </Svg>
    </View>
  );
};

// Create AnimatedPath component
const AnimatedPath = Animated.createAnimatedComponent(Path);

// Styles for centering the Donut Chart
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DonutChart;

//implemented Matei's chart, i only changed the color from gray to white and rendered it like in his own project
