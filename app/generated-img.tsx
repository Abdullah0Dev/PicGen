import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton } from "@/components";
import Animated from "react-native-reanimated";
import { FontAwesome6, Fontisto, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import * as Sharing from "expo-sharing"; // Import the library
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
const GeneratedImage = () => {
  const [downloadedImageSuccessfully, setDownloadedImageSuccessfully] =
    useState(false);
  const [imageUri, setImageUri] = useState<string | null>("");
  const handlePress = async () => {
    console.log("brh");
  };

  // load image
  useEffect(() => {
    const loadAsset = async () => {
      const asset = Asset.fromModule(
        require("@/assets/images/getstarted_img.png")
      );
      await asset.downloadAsync();
      setImageUri(asset.localUri);
    };
    loadAsset();
  }, []);

  const saveImage = async (uri: string) => {
    try {
      const hasPermission = await MediaLibrary.requestPermissionsAsync();
      if (!hasPermission) {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "You need to grant storage permissions to save the image.",
        });
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}downloadedImage.jpg`;
      const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);

      await MediaLibrary.saveToLibraryAsync(localUri);
      console.log("Image successfully saved");
      // Show success toast
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Image downloaded successfully 🎉",
      });
      setDownloadedImageSuccessfully(true);
    } catch (error) {
      console.log("Error saving image:", error);
      Toast.show({
        type: "error",
        text1: "Download Failed",
        text2: "There was an error saving the image.",
      });
    }
  };
  const shareImage = async () => {
    try {
      if (imageUri) {
        await Sharing.shareAsync(imageUri);
      }
    } catch (error) {
      console.log("not working");
    }
  };
  const deleteImage = async () => {
    router.back();
  };

  const handleTools = [
    {
      icon: "trash",
      handlePress: deleteImage,
    },
    {
      icon: "share",
      handlePress: shareImage,
    },
  ];
  return (
    <>
      <Image
        source={require("@/assets/images/getstarted_img.png")}
        className="w-full h-[55vh]"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-9 left-6 bg-black/20 p-3 rounded-full blur"
      >
        <MaterialIcons name={"arrow-back-ios-new"} size={18} color="white" />
      </TouchableOpacity>
      <Animated.View className={"w-full flex items-center"}>
        <CustomButton
          title="Download"
          onPress={() =>
            saveImage(
              "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            )
          }
        />
      </Animated.View>
      <View className="h-fit mx-5 py-4 mt-5 shadow bg-white rounded-xl">
        {/* will change it later to the prompt that you've entered */}
        <Text className="text-black px-3 text-lg font-semibold">
          It's time to work and generate your own image yeah you're right
        </Text>
      </View>
      {/* controllers */}
      <View className="flex flex-row justify-center gap-x-5 mt-5 items-center">
        {handleTools.map((item, index) => (
          <TouchableOpacity
            onPress={item.handlePress}
            key={index}
            className={`py-4 w-[40%] flex items-center justify-center rounded-xl ${
              index === 1 ? "bg-[#ff7e5f]" : "bg-[#feb47b]"
            } shadow`}
          >
            <Fontisto name={item.icon} size={24} color="white" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Toast Notification */}
      <Toast />
      {/* status bar */}
      <StatusBar style="inverted" />
    </>
  );
};

export default GeneratedImage;
