import { FlatList } from "react-native";
import React from "react";

const CustomKeyboard = ({ children }: any) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={[{ key: "1" }]}
      renderItem={() => <>{children}</>}
      keyExtractor={(item) => item.key}
      bounces={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CustomKeyboard;
