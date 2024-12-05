import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CustomButton } from "../components";
import { router } from "expo-router";
import Animated, {
  Easing,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useSharedValue, withDelay } from "react-native-reanimated";

const GetStarted = () => {
  const NavigateToHome = () => {
    // Navigate to the home screen
    router.navigate("/(tabs)");
  };

  // Animation references using shared values
  const imageAnim = useSharedValue(0);
  const gradientAnim = useSharedValue(0);
  const titleAnim = useSharedValue(0);
  const subtitleAnim = useSharedValue(0);
  const buttonAnim = useSharedValue(0);

  useEffect(() => {
    // Start the animations when the screen loads
    imageAnim.value = withTiming(1, { duration: 1500, easing: Easing.ease });
    gradientAnim.value = withTiming(1, { duration: 1500, easing: Easing.ease });
    titleAnim.value = withDelay(
      200,
      withTiming(1, { duration: 1500, easing: Easing.ease })
    );
    subtitleAnim.value = withDelay(
      400,
      withTiming(1, { duration: 1500, easing: Easing.ease })
    );
    buttonAnim.value = withDelay(
      600,
      withTiming(1, { duration: 1500, easing: Easing.ease })
    );
  }, []);

  return (
    <ImageBackground
      className="flex w-full h-full"
      source={require("@/assets/images/getstarted_img.png")}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: gradientAnim, // Animated opacity for the gradient
        }}
      >
        <LinearGradient
          colors={["transparent", "#ffffff"]}
          className="w-full h-full"
          style={{ flex: 1 }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.7 }}
        >
          {/* view to push the items to the bottom */}
          <View className="h-[65%]" />
          <View className="text-  items-center">
            <Animated.Text
              style={{
                opacity: titleAnim,
                transform: [
                  {
                    translateY: withTiming(titleAnim.value * 50, {
                      duration: 1500,
                      easing: Easing.ease,
                    }),
                  },
                ],
              }}
              className="text-4xl font-JakartaExtraBold text-start  text-[#f0a76f] "
            >
              Ignite your Ideas with Captivating Visuals{" "}
            </Animated.Text>
            <Animated.Text
              style={{
                opacity: subtitleAnim,
                transform: [
                  {
                    translateY: withTiming(subtitleAnim.value * 50, {
                      duration: 1500,
                      easing: Easing.ease,
                    }),
                  },
                ],
              }}
              className="text-lg font-bold mt-3 text-center  px-3 text-secondary-700"
            >
              {" "}
              Unlock your imagination and bring your creative visions to life
              like never before—get ready to turn dreams into reality! 🚀✨
            </Animated.Text>
            {/* btn */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: withTiming(buttonAnim.value * 50, {
                      duration: 1500,
                      easing: Easing.ease,
                    }),
                  },
                ],
              }}
              className={"w-full flex items-center"}
            >
              <CustomButton title="Get Started" onPress={NavigateToHome} />
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>
    </ImageBackground>
  );
};

export default GetStarted;
