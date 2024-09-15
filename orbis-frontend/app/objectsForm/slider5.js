import React, { PureComponent } from "react";
import {
  View,
  Text,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";

class CustomSlider5 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slideValue: 2,
      sliderWidth: 350,
      thumbSize: 40,
    };
  }

  componentDidMount() {
    // Enable LayoutAnimation on Android
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidUpdate(_, prevState) {
    // Trigger parent's callback only if slideValue changes
    if (prevState.slideValue !== this.state.slideValue) {
      this.props.onSlideValueChange(this.state.slideValue);
    }
  }

  // Handle slider layout to get its width
  onSliderLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    if (width !== this.state.sliderWidth) {
      this.setState({ sliderWidth: width });
    }
  };

  // Handle value change to update state and calculate thumb position
  handleValueChange = (value) => {
    this.setState({ slideValue: value });
  };

  render() {
    const { sliderWidth, thumbSize, slideValue } = this.state;
    const effectiveSlideValue = slideValue >= 25 ? 24 : slideValue;

    // Calculate positions for visual elements of the slider
    const sliderRealWidth = ((effectiveSlideValue - 1) / 24) * sliderWidth;
    const thumbLeft = sliderRealWidth - thumbSize / 2;

    // Define slider styles
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
        left: thumbLeft + 9, // Adjust thumb position to stay within bounds
        justifyContent: "center",
        alignItems: "center",
      },
      overlayThumb: {
        position: "absolute",
        backgroundColor: "#351F17",
        width: sliderRealWidth + thumbSize - 7,
        height: thumbSize,
        borderRadius: 90,
        top: -7,
        left: -thumbSize / 12,
      },
    };

    return (
      <View style={{ marginTop: 40, alignItems: "center", marginBottom: 20 }}>
        <View style={sliderStyle.thumb} pointerEvents="none" />
        <View
          style={{ borderRadius: 50, overflow: "hidden", width: sliderWidth }}
          onLayout={this.onSliderLayout}
        >
          <View style={{ flexDirection: "row", position: "absolute" }}>
            <View style={sliderStyle.sliderDummy} />
            <View style={sliderStyle.sliderReal} />
            <View style={sliderStyle.overlayThumb} />
          </View>
          <Slider
            style={{ width: sliderWidth, height: 30 }}
            minimumValue={2}
            maximumValue={25}
            step={1}
            value={slideValue}
            onValueChange={this.handleValueChange}
            maximumTrackTintColor="transparent"
            thumbTintColor="#351F17"
            minimumTrackTintColor="transparent"
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
          Motorcycle
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 24,
            fontFamily: "Fredoka_600SemiBold",
          }}
        >
          {slideValue === 25 ? 24 : slideValue} liters / 100 kms
        </Text>
      </View>
    );
  }
}

export default CustomSlider5;
