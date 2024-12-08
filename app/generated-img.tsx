import { View, Text } from "react-native";
import React from "react";
import { Image, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import * as ContextMenu from "zeego/context-menu";
import Colors from "@/constants/Colors";
import {
  copyImageToClipboard,
  downloadAndSaveImage,
  shareImage,
} from "@/utils/Image";
import { Message, Role } from "@/utils/Interfaces";
import { Link } from "expo-router";
const GeneratedImage = ({
  content,
  role,
  imageUrl,
  prompt,
  loading,
}: Message & { loading?: boolean }) => {
  const contextItems = [
    {
      title: "Copy",
      systemIcon: "doc.on.doc",
      action: () => copyImageToClipboard(imageUrl!),
    },
    {
      title: "Save to Photos",
      systemIcon: "arrow.down.to.line",
      action: () => downloadAndSaveImage(imageUrl!),
    },
    {
      title: "Share",
      systemIcon: "square.and.arrow.up",
      action: () => shareImage(imageUrl!),
    },
  ];
  return (
    <>
      {/* <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Pressable>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2023/04/13/17/49/dare-7923106_640.jpg",
              }}
              className="w-full h-[55vh] rounded-b -xl"
            />
          </Pressable>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          // loop, alignOffset, avoidCollisions, collisionPadding
          loop={false}
          alignOffset={"0"}
          avoidCollisions={false}
          collisionPadding={""}
        >
          {contextItems.map((item, index) => (
            <ContextMenu.Item key={item.title} onSelect={item.action}>
              <ContextMenu.ItemTitle>{item.title}</ContextMenu.ItemTitle>
            </ContextMenu.Item>
          ))}
        </ContextMenu.Content>
      </ContextMenu.Root>  */}
      <Text>GeneratedImage</Text>
    </>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#000",
  },
  text: {
    padding: 4,
    fontSize: 16,
    flexWrap: "wrap",
    flex: 1,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
  loading: {
    justifyContent: "center",
    height: 26,
    marginLeft: 14,
  },
});

export default GeneratedImage;
