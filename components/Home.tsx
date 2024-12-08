import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButton } from "../components";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import AnimatedNumbers from "react-native-animated-numbers";
import AnimatedText from "./AnimatedText";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
const HomeScreen = () => {
  const [text, setText] = useState("");
  const [textLength, setTextLength] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState(AspectRationData[0].ratio);

  const [model, setModel] = useState<ModelType[]>([
    {
      modelName: "Dynamic",
      modelImage:
        "https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F5925736%2Fcover_image%2Fretina_500x200%2FUntitled-0152678286b0a762e2fdd8a26da25180.png",
    },
    {
      modelName: "Classic",
      modelImage:
        "https://cdn.pixabay.com/photo/2023/04/13/17/49/dare-7923106_640.jpg",
    },
    {
      modelName: "Digital",
      modelImage:
        "https://emudhra.com/hubfs/Imported_Blog_Media/Z9zIzio7SX3Ys9vlfCnh.webp",
    },
  ]);
  const [selectedModel, setSelectedModel] = useState(model[0]);
  const [size, setSize] = useState({
    width: AspectRationData[0].width,
    height: AspectRationData[0].height,
  });

  const rotation = useSharedValue(0); // Initial rotation value
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const handleTextChange = (input: string) => {
    if (input.length <= 150) {
      setText(input);
      setTextLength(input.length);
    }
  };

  const handleResetChange = () => {
    setText("");
    setTextLength(0);
    rotation.value = withTiming(720, { duration: 1000 }, () => {
      // Reset the rotation to 0 after the animation
      rotation.value = 0;
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // handleSelectRatio
  const handleSelectRatio = (aspect: AspectRatioProps) => {
    setSelectedRatio(aspect.ratio);
    setSize({ width: aspect.width, height: aspect.height });
  };
  interface ModelType {
    modelName: string;
    modelImage: string;
  }
  const handleSelectModel = (model: ModelType) => {
    setSelectedModel(model);
  };
  // handleGenerate
  const handleGenerate = async () => {
    // create a request to the backend...
    router.navigate("/generated-img");
    // try {
    //   const response = await fetch("http://10.0.2.2:4000/api/generate/", {
    //     // replace it with 10.0.2.2
    //     method: "POST",
    //     headers: {
    //       // it doesn't giving good results because the headers..
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify({
    //       prompt: text,
    //       width: size.width,
    //       height: size.height,
    //     }),
    //   });
    //   if (!response.ok) {
    //     console.log("Error fetching DATA", response.status);
    //   }
    //   // if it's ok proceed, and set the data to response...
    //   const data = await response.json();
    //   console.log("Image generated: ", data);
    //   //   navigation.navigate("ImageDetails", { image: data[0], title: text }); // will handle it later....
    // } catch (error) {
    //   console.log("Error fetching data from the backend: ", error);
    // }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white p-4 flex-1 h-full"
    >
      <View>
        <View className="my-5 flex flex-row justify-between items-center">
          <FontAwesome6
            name="people-group"
            style={{ fontSize: 26, color: "#4F33FC" }}
          />
          <View className="flex flex-row gap-x-4  item-center">
            <Pressable className="bg-[#ff7e5f] flex flex-row gap-x-1 py-1 justify-center items-center px-2 rounded-full">
              <FontAwesome6
                name="crown"
                style={{ fontSize: 20, color: "#feb47b" }}
              />
              <Text className="text-white text-base font-bold"> PRO </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* prompt */}
      <View className="h-[30vh] rounded-3xl bg-white shadow-2xl drop-shadow-md p-4 ">
        <Text className="text-black text-xl mt-4 font-semibold">
          {" "}
          Enter Prompt{" "}
        </Text>
        <TextInput
          placeholder="Type anything...."
          placeholderTextColor={"#ADADAD"}
          multiline={true}
          value={text}
          onChangeText={handleTextChange} // will do it later..
          style={{
            textAlignVertical: "top", // Ensures text starts from the top
          }}
          className="text-lg font-regular rounded-lg flex-wrap text-black/90 w-full h-[70%]"
        />
        <View className="flex flex-row justify-between items-center">
          <AnimatedTouchableOpacity
            style={animatedStyle}
            onPress={handleResetChange}
          >
            <AntDesign name="reload1" size={26} color={"#ff7e5f"} />
          </AnimatedTouchableOpacity>
          <View className="flex flex-row items-center gap-x-6">
            <View
              className={`flex items-center flex-row justify-center   `}
              style={[
                textLength >= 100 && { gap: 16 },
                textLength >= 10 && textLength < 100 && { gap: 8 },
              ]}
            >
              <AnimatedNumbers
                fontStyle={{ fontSize: 16, fontWeight: "bold" }}
                containerStyle={{ width: 9 }}
                animateToNumber={textLength}
              />
              <Text className="text-lg font-semibold  text-black/70 ">
                {/* <AnimatedText animateToNumber={textLength} />  */}
                {""} /150{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* addons ... */}
      <View className="flex flex-row mt-5 justify-around">
        {addons.map((item, index) => (
          <View
            className="flex flex-row bg-white items-center gap-x-3 px-4 py-3 rounded-2xl shadow"
            key={index}
          >
            <View>{item.icon}</View>
            <Text className="text-black text-base font-semibold">
              {" "}
              {item.title}{" "}
            </Text>
          </View>
        ))}
      </View>
      {/* select MOdels */}
      <View className="my-5 rounded-xl bg-white drop-shadow-md shadow-xl pt-3 pb-5 px-4">
        <Text className="text-black text-xl my-3 capitalize font-semibold">
          Select Model
        </Text>
        <View className=" ">
          <FlatList
            data={model}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectModel(item)}
                className={`${
                  item.modelName === selectedModel.modelName
                    ? "border-[#ff7e5f] border-4 "
                    : "bg-black/5"
                } w-60 h-52  flex justify-center items-center justify-items-center rounded-md py-2 px-3 `}
              >
                <Image
                  source={{ uri: item.modelImage }}
                  className="w-full h-4/5"
                />
                <Text
                  className={`${
                    item.modelName === selectedModel.modelName
                      ? "text-[#ff7e5f]"
                      : "text-black"
                  } self-center font-bold text-xl `}
                >
                  {" "}
                  {item.modelName}{" "}
                </Text>
              </Pressable>
            )}
            horizontal
            removeClippedSubviews={false}
            // onViewableItemsChanged={(item) => setSelectedModel(item)}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => <View className="w-6" />}
            ListHeaderComponent={() => <View className="w-6" />}
            ItemSeparatorComponent={() => <View className="w-6" />}
            keyExtractor={(item) => item.modelName}
          />
        </View>
      </View>
      {/* <View className="h-32  ">
        <Image
          source={require("@/assets/images/ad.png")}
          className="object-contain w-32"
        />
      </View> */}
      {/* Aspect Ratio */}
      <View className="my-5 rounded-xl bg-white drop-shadow-md shadow-xl pt-3 pb-5 px-4">
        <Text className="text-black text-xl my-3 capitalize font-semibold">
          Aspect Ratio
        </Text>
        <View className="flex flex-row gap-x-5 gap-y-4   flex-wrap">
          {AspectRationData.map((item, index) => (
            <Pressable
              onPress={() => handleSelectRatio(item)}
              key={index}
              className={`${
                item.ratio === selectedRatio ? "bg-[#ff7e5f]" : "bg-black/5"
              } w-[27%] flex justify-center items-center justify-items-center rounded-md py-2 px-3 `}
            >
              <Text
                className={`${
                  item.ratio === selectedRatio ? "text-white" : "text-black"
                } self-center font-medium text-base `}
              >
                {" "}
                {item.ratio}{" "}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {/* generate btn */}
      <View className=" pb-24">
        <CustomButton onPress={handleGenerate} title="Generate" />
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  );
};

export default HomeScreen;

const addons = [
  {
    title: "Add Photo",
    icon: <Ionicons name="image-outline" size={24} color="#ADADAD" />,
  },
  {
    title: "Inspiration",
    icon: <FontAwesome6 name="lightbulb" size={24} color="#ADADAD" />,
  },
];

//aspect ratio props
type AspectRatioProps = {
  width: number;
  height: number;
  ratio: string;
};
const AspectRationData: AspectRatioProps[] = [
  {
    width: 1080,
    height: 1080,
    ratio: "1:1",
  },
  {
    width: 720,
    height: 1280,
    ratio: "9:16",
  },
  {
    width: 1920,
    height: 1080,
    ratio: "16:9",
  },
  {
    width: 720,
    height: 480,
    ratio: "3:2",
  },
  {
    width: 800,
    height: 400,
    ratio: "4:2",
  },
  {
    width: 1250,
    height: 1000,
    ratio: "5:4",
  },
];
