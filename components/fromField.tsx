import { View, Text, TextInput,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

const Formfeild = ({title, value, handleChangeText,otherStyles,placeholder,keyboardType,...props}: any) => {

  const [showPassword, setshowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
      </Text>

      <View className='border-2 h-16 bg-black-100 border-black-200 rounded-2xl w-full px-4 focus:border-secondary items-center flex-row' >

        <TextInput className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType}
        />

          { title === 'Password' && (
              <TouchableOpacity activeOpacity={0.8} onPress={
                () => setshowPassword(!showPassword)}>
                <Image source={ !showPassword ? icons.eye : icons.eyeHide } resizeMode='contain' className='w-7'/>

              </TouchableOpacity>
            )}
      </View>
    </View>
  )
}

export default Formfeild