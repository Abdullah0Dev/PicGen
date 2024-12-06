import React from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

const TabBarBackground = () => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BlurView
        intensity={50} // Adjust the blur intensity as needed
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default TabBarBackground;
