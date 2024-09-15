import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import Slider from "@react-native-community/slider";

class Slider5Copy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideValue: 1,
      sliderWidth: 350,
      thumbSize: 40,
    };
  }

  componentDidUpdate(_, prevState) {
    if (prevState.slideValue !== this.state.slideValue) {
      this.props.onSlideValueChange(this.state.slideValue);
    }
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  onSliderLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    this.setState({ sliderWidth: width });
  };

  render() {
    const { sliderWidth, thumbSize, slideValue } = this.state;

    const effectiveSlideValue = slideValue >= 8 ? 8 : slideValue;

    const sliderDummyWidth = sliderWidth;
    const sliderRealWidth = ((effectiveSlideValue - 1) / 8) * sliderWidth;
    const thumbLeft =
      ((effectiveSlideValue - 1) / 8) * sliderWidth - thumbSize / 2 - 14;

    const sliderStyle = {
      sliderDummy: {
        backgroundColor: "white",
        width: sliderDummyWidth,
        height: 25,
        borderRadius: 50,
        position: "absolute",
      },
      sliderReal: {
        backgroundColor: "#351F17",
        width: sliderRealWidth,
        height: 30,
      },
      thumb: {
        position: "absolute",
        backgroundColor: "#351F17",
        width: thumbSize,
        height: thumbSize,
        borderRadius: thumbSize / 2,
        top: -7,
        left: thumbLeft + 38,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
      overlayThumb: {
        position: "absolute",
        backgroundColor: "#351F17",
        width: sliderRealWidth + thumbSize + 8,
        height: thumbSize,
        borderRadius: 70,
        borderColor: "#351F17",
        top: -7,
        left: -thumbSize / 12, //fill in slider pentru a completa bulina de sub (thumb)
      },
    };

    return (
      <View style={{ marginTop: 40, alignItems: "center", marginBottom: 20 }}>
        <View style={sliderStyle.thumb} pointerEvents="none"></View>
        <View
          style={{ borderRadius: 50, overflow: "hidden", width: sliderWidth }}
        >
          <View style={{ flexDirection: "row", position: "absolute" }}>
            <View style={sliderStyle.sliderDummy}></View>
            <View style={sliderStyle.sliderReal}></View>
            <View style={sliderStyle.overlayThumb}></View>
          </View>
          <Slider
            style={{ width: sliderWidth, height: 30 }}
            minimumValue={1}
            maximumValue={8}
            step={1}
            value={slideValue}
            onValueChange={(value) => this.setState({ slideValue: value })}
            maximumTrackTintColor="transparent"
            thumbTintColor="#351F17"
            minimumTrackTintColor="transparent"
            onLayout={this.onSliderLayout}
          />
        </View>
        <Text
          style={{
            color: "white",
            marginTop: 2,
            fontSize: 18,
            fontFamily: "Fredoka_600SemiBold",
          }}
        >
          Car
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 24,
            fontFamily: "Fredoka_600SemiBold",
          }}
        >
          {slideValue + 1} liters / 100 kms
        </Text>
      </View>
    );
  }
}

export default Slider5Copy;
