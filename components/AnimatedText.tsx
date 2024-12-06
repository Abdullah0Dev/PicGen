import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface AnimatedTextProps {
  animateToNumber: number;
  fontStyle?: StyleProp<TextStyle>;
  animationDuration?: number;
  includeComma?: boolean;
  easing?: Animated.TimingAnimationConfig["easing"];
  containerStyle?: StyleProp<ViewStyle>;
  locale?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  animateToNumber,
  fontStyle,
  animationDuration = 1000,
  includeComma = false,
  easing = Easing.elastic(1.2),
  containerStyle,
  locale = "en-US",
}) => {
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [height, setHeight] = useState(0);

  const prevNumber = useRef<number>(animateToNumber);
  const animations = useRef<Animated.Value[]>([]);

  // Format number with commas if required
  const formatNumber = useCallback(
    (number: number) =>
      includeComma
        ? number.toLocaleString(locale)
        : Math.abs(number).toString(),
    [includeComma, locale]
  );

  const nextNumbers = formatNumber(animateToNumber).split("");
  const prevNumbers = formatNumber(prevNumber.current).split("");

  // Initialize animations for each digit
  useEffect(() => {
    if (!height) return;

    animations.current = nextNumbers.map((_, index) => {
      const initialValue =
        -1 * height * (parseInt(prevNumbers[index] || "0", 10) || 0);
      return new Animated.Value(initialValue);
    });
  }, [height, nextNumbers, prevNumbers]);

  // Trigger animation when the number changes
  useEffect(() => {
    if (!height || animations.current.length === 0) return;

    if (animationRef.current) {
      animationRef.current.stop();
    }

    const animationsArray = nextNumbers.map((digit, index) => {
      const targetValue = -1 * height * (parseInt(digit, 10) || 0);
      return Animated.timing(animations.current[index], {
        toValue: targetValue,
        duration: animationDuration,
        easing,
        useNativeDriver: true,
      });
    });

    animationRef.current = Animated.parallel(animationsArray);
    animationRef.current.start();

    prevNumber.current = animateToNumber;
  }, [animateToNumber, height, nextNumbers, animationDuration, easing]);

  // Capture the height of a single digit for animation calculations
  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row, { height }]}>
        {nextNumbers.map((digit, index) => {
          if (isNaN(parseInt(digit, 10))) {
            return (
              <Text key={index} style={fontStyle}>
                {digit}
              </Text>
            );
          }

          return (
            <View key={index} style={[styles.digitContainer, { height }]}>
              <Animated.View
                style={{
                  transform: [{ translateY: animations.current[index] }],
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <Text
                    key={i}
                    style={[fontStyle, { height, lineHeight: height }]}
                  >
                    {i}
                  </Text>
                ))}
              </Animated.View>
            </View>
          );
        })}
      </View>
      <Text
        style={[styles.hiddenText, fontStyle]}
        onLayout={handleLayout}
        numberOfLines={1}
      >
        0
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  digitContainer: {
    overflow: "hidden",
  },
  hiddenText: {
    opacity: 0,
    position: "absolute",
  },
});

export default AnimatedText;
