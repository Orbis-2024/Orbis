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

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideValue: 0,
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

    const effectiveSlideValue = slideValue >= 90 ? 90 : slideValue;

    const sliderRealWidth = (effectiveSlideValue / 100) * sliderWidth;

    const thumbLeft = (effectiveSlideValue / 100) * sliderWidth - thumbSize / 2;

    const sliderStyle = {
      sliderDummy: {
        backgroundColor: "white",
        width: sliderWidth,
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
        left: thumbLeft + 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
      overlayThumb: {
        position: "absolute",
        backgroundColor: "#351F17",
        width: sliderRealWidth + thumbSize + 4,
        height: thumbSize,
        borderRadius: 90,
        borderColor: "#351F17",
        top: -7,
        left: -thumbSize / 12,
      },
    };

    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
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
            minimumValue={0}
            maximumValue={100}
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
            marginTop: 40,
            fontSize: 24,
            fontFamily: "Fredoka_600SemiBold",
          }}
        >
          {slideValue} Km
        </Text>
      </View>
    );
  }
}

export default School;
