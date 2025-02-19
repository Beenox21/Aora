import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: any) => {
    return (

       
            <TouchableOpacity className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading && 'opacity-50'}`}
                disabled={isLoading}
                activeOpacity={0.7}
            onPress={handlePress}
            >
                <Text className={`text-primary font-psemibold text-lg  ${textStyles}`} >{title}</Text>
            </TouchableOpacity>
        
    )
}

export default CustomButton