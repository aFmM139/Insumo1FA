import React from 'react';
import CustomText from "@/components/CustomText";
import { View, Image } from 'react-native';

export default function ProgrammerInfo() {
  return (
    <View className="h-1/3 items-center">
        <Image 
          source={require('@/assets/images/Foto.png')} 
          className="mt-3 max-h-20 max-w-20 rounded-full mb-4"
        />
        <CustomText variant='name' dark={false}>Andrés Fajardo</CustomText>
        <CustomText variant='nivel' dark={false}>Estudiante</CustomText>
    </View>
  );
}