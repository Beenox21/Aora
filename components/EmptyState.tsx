import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./customButton";

const EmptyState = ({title, subtitle} : any) => {
  return (
    <View className='flex justify-center items-center'>
      <Image
      source={images.empty}
      resizeMode="contain"
      className='w-[270px] h-[216px]'/>

      <Text className='text-sm text-center font-pmedium text-gray-100'>{title}</Text>
      <Text className='text-xl text-center font-psemibold text-white mt-2'>{subtitle}</Text>

      <CustomButton
        title="Back to Explore"
        containerStyles='w-[90vw] my-6 '
        handlePress={() => router.push('/home')}
      />

    </View>
  )
}

export default EmptyState