import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomText from "@/components/CustomText";

export default function MusicSelector() {
  return (
      <View className="p-5 flex-1 w-full h-1/2">
        <CustomText variant="title" dark={false}>🎶 Tipos de musica 🎶</CustomText>

        <View className="mt-5 bg-[#31D492] p-4 mb-4 rounded-lg">
          <Text className=" text-center text-lg font-bold text-white">
            🧢 Reggaeton 🕶️
          </Text>
        </View>

        <View className="bg-[#1F7A55] p-4 mb-4 rounded-lg">
          <Text className="text-center text-lg font-bold text-white">
          🎤 Salsa 💃🏻
          </Text>
        </View>
        <View className="bg-[#012C22] p-4 mb-4 rounded-lg">
          <Text className="text-center text-lg font-bold text-white">
          🍷 Cumbia 👏
          </Text>
        </View>
      </View>
  );
}