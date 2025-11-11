import "@/global.css";
import Info from "@/components/Info";
import MusicType from "@/components/MusicType";
import { View, Alert,Text } from "react-native";

export default function HomeScreen() {
  return (
   <View className="flex-1 bg-black ">
    <Info></Info>
    <MusicType></MusicType>
   </View>
  );
}
