import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type CustomButtonType = {
  title: string;
  onPress?: () => void;
  containerClassName?: string;
  startColor?: string;
  endColor?: string;
  textClassName?: string;
};

const CustomButton: React.FC<CustomButtonType> = ({
  title,
  onPress,
  containerClassName = "",
  textClassName = "text-2xl text-white font-semibold",
  startColor = "#ff7e5f",
  endColor = "#feb47b",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-[95%]  mt-5 ${containerClassName}`}
    >
      <LinearGradient
        colors={[startColor, endColor]}
        className=" py-4 px-4 items-center justify-center"
        style={{ borderRadius: 60 }}
      >
        <Text className={textClassName}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
